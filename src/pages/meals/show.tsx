import { Show, TextField } from "@refinedev/antd";
import { Typography, Tag } from "antd";
import { useShow, useMany } from "@refinedev/core";

const { Title } = Typography;

const typeOptions = [
  { label: "Veg", value: "veg" },
  { label: "Non-Veg", value: "non-veg" },
];
const getSpiceLevelTag = (level?: string) => {
  if (!level) return "-";
  const normalized = level.toLowerCase();
  if (normalized.includes("mild")) return <Tag color="green">🟢 Mild</Tag>;
  if (normalized.includes("medium")) return <Tag color="orange">🟠 Medium</Tag>;
  if (normalized.includes("hot")) return <Tag color="red">🔴 Hot</Tag>;
  return <Tag>{level}</Tag>;
};
export const MealShow = () => {
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  // Fetch assigned restaurants' names
  const restaurantIds = record?.restaurants ?? [];
  const { data: restaurantsData } = useMany({
    resource: "restaurants",
    ids: restaurantIds,
    queryOptions: { enabled: !!restaurantIds?.length },
  });

  return (
    <Show isLoading={isLoading}>
      
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Description</Title>
      <TextField value={record?.description} />
      <Title level={5}>Price</Title>
      <TextField value={record?.price} />
      <Title level={5}>Assigned Restaurants</Title>
      <div>
  {restaurantsData?.data?.length
  ? restaurantsData.data
      .filter((rest) => restaurantIds.includes(rest.id))
      .map((rest) => (
        <Tag key={rest.id}>{rest.name}</Tag>
      ))
  : "-"}
      </div>
      <Title level={5}>Type</Title>
      <Tag color={record?.type === "veg" ? "green" : "red"}>
        {typeOptions.find((t) => t.value === record?.type)?.label || record?.type}
      </Tag>
    <Title level={5}>Spice Level</Title>
{getSpiceLevelTag(record?.spiceLevel)}
    </Show>
  );
};