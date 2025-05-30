import { Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

// Helper to get cost based on subscription name and meals per day
const getCost = (subscriptionName?: string, mealsPerDay?: number) => {
  if (!mealsPerDay) return "-";
  switch (subscriptionName?.toLowerCase()) {
    case "daily":
      return 50 * mealsPerDay;
    case "weekly":
      return 300 * mealsPerDay;
    case "monthly":
      return 1200 * mealsPerDay;
    case "yearly":
      return 15000 * mealsPerDay;
    default:
      return "-";
  }
};

export const UserShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  // Get subscription id from nested object if needed
  const subscriptionId = record?.subscription?.id || record?.subscription || "";

  // Get restaurant id from nested object if needed
  const restaurantId = record?.restaurant?.id || record?.restaurant || "";

  const { data: subscriptionData } = useOne({
    resource: "subscriptions",
    id: subscriptionId,
    queryOptions: {
      enabled: !!subscriptionId,
    },
  });

  const { data: restaurantData } = useOne({
    resource: "restaurants",
    id: restaurantId,
    queryOptions: {
      enabled: !!restaurantId,
    },
  });

  const subscriptionName = subscriptionData?.data?.name;

  // Meals per day label
  const mealsPerDayLabel =
    record?.mealsPerDay === 1
      ? "1 time"
      : record?.mealsPerDay === 2
      ? "2 times"
      : record?.mealsPerDay === 3
      ? "3 times"
      : "-";

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Email"}</Title>
      <TextField value={record?.email} />
      <Title level={5}>{"Restaurant"}</Title>
      <TextField value={restaurantData?.data?.name || "-"} />
      <Title level={5}>{"Subscription"}</Title>
      <TextField value={subscriptionName || "-"} />
      <Title level={5}>{"Meals Per Day"}</Title>
      <TextField value={mealsPerDayLabel} />
      <Title level={5}>{"Cost"}</Title>
      <TextField value={subscriptionName && record?.mealsPerDay ? `₹${getCost(subscriptionName, record.mealsPerDay)}` : "-"} />
      <Title level={5}>{"Status"}</Title>
      <TextField value={record?.status} />
    </Show>
  );
};