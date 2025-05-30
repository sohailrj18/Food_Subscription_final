import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Table as AntTable } from "antd";

const { Title } = Typography;

const subscriptionOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const mealsOptions = [
  { label: "1 time", value: 1 },
  { label: "2 times", value: 2 },
  { label: "3 times", value: 3 },
];

// Fixed costs per meal
const subscriptionCosts: Record<string, number> = {
  daily: 50,
  weekly: 300,
  monthly: 1200,
  yearly: 15000,
};

export const RestaurantShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;
  const record = data?.data;

  // Prepare table data for costing
  const selectedSubscriptions: string[] = record?.subscriptionsOffered || [];
  const selectedMeals: number[] = record?.mealsPerDayOffered || [];

  // Table columns: meal options
  const columns = [
    {
      title: "Subscription Type",
      dataIndex: "subscription",
      key: "subscription",
      render: (sub: string) =>
        subscriptionOptions.find((s) => s.value === sub)?.label || sub,
    },
    ...selectedMeals.map((meal) => ({
      title: mealsOptions.find((m) => m.value === meal)?.label || `${meal} times`,
      dataIndex: `meal_${meal}`,
      key: `meal_${meal}`,
      align: "center" as const,
    })),
  ];

  // Table data: each row is a subscription, each cell is cost
  const dataSource = selectedSubscriptions.map((sub) => {
    const row: any = {
      key: sub,
      subscription: sub,
    };
    selectedMeals.forEach((meal) => {
      row[`meal_${meal}`] = `₹${subscriptionCosts[sub] * meal}`;
    });
    return row;
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Restaurant ID</Title>
      <TextField value={record?.id} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Email</Title>
      <TextField value={record?.email || "-"} />
      <Title level={5}>Subscriptions Offered</Title>
      <div>
        {selectedSubscriptions.length
          ? selectedSubscriptions.map((sub: string) => (
              <Tag key={sub}>
                {subscriptionOptions.find((s) => s.value === sub)?.label || sub}
              </Tag>
            ))
          : "-"}
      </div>
      <Title level={5}>Meals Per Day Offered</Title>
      <div>
        {selectedMeals.length
          ? selectedMeals.map((meal: number) => (
              <Tag key={meal}>
                {mealsOptions.find((m) => m.value === meal)?.label || `${meal} times`}
              </Tag>
            ))
          : "-"}
      </div>
      <Title level={5}>Status</Title>
      <Tag color={record?.status === "active" ? "green" : "red"}>
        {record?.status === "active" ? "Active" : "Inactive"}
      </Tag>
      <Title level={5} style={{ marginTop: 24 }}>Costing Table</Title>
      {selectedSubscriptions.length && selectedMeals.length ? (
        <AntTable
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          size="middle"
          style={{ marginTop: 16, maxWidth: 600 }}
        />
      ) : (
        <div>-</div>
      )}
    </Show>
  );
};