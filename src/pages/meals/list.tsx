import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Table, Tag, Space, Select } from "antd";
import { useMany } from "@refinedev/core";
import { useState } from "react";
 import type { CrudFilters } from "@refinedev/core";


export const MealList = () => {
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    pagination: { pageSize: 25 },
  });
  const [typeFilter, setTypeFilter] = useState("");

  // Find all restaurants for each meal
  const restaurantIds = tableProps?.dataSource
    ?.flatMap((meal) => meal.restaurants || [])
    .filter(Boolean);

  const { data: restaurantsData } = useMany({
    resource: "restaurants",
    ids: restaurantIds ?? [],
    queryOptions: { enabled: !!restaurantIds?.length },
  });

 

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    const filters: CrudFilters = value
      ? [{ field: "type", operator: "eq", value }]
      : [];
    setFilters(filters, "replace");
  };
const getSpiceLevelTag = (level?: string) => {
  if (!level) return "-";
  const normalized = level.toLowerCase();
  if (normalized.includes("mild")) return <Tag color="green">🟢 Mild</Tag>;
  if (normalized.includes("medium")) return <Tag color="orange">🟠 Medium</Tag>;
  if (normalized.includes("hot")) return <Tag color="red">🔴 Hot</Tag>;
  return <Tag>{level}</Tag>;
};
  return (
    <List>
      <div style={{ marginBottom: 16 }}>
        <Select
          value={typeFilter}
          onChange={handleTypeFilter}
          options={[
            { label: "All", value: "" },
            { label: "Veg", value: "veg" },
            { label: "Non-Veg", value: "non-veg" },
          ]}
          style={{ width: 160 }}
          placeholder="Filter by Type"
        />
      </div>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          dataIndex="restaurants"
          title="Assigned Restaurants"
          render={(restaurantIds: string[]) =>
            restaurantIds?.length
              ? restaurantIds.map((id) => {
                  const restaurant = restaurantsData?.data?.find((r) => r.id === id);
                  return (
                    <Tag key={id}>{restaurant?.name || id}</Tag>
                  );
                })
              : "-"
          }
        />
      <Table.Column
  dataIndex="type"
  title="Type"
  render={(value: string) => {
    console.log("Meal type:", value); // Add this line
    return value === "veg" ? <Tag color="green">Veg</Tag> : <Tag color="red">Non-Veg</Tag>;
  }}
/>
       <Table.Column
  dataIndex="spiceLevel"
  title="Spice Level"
  render={getSpiceLevelTag}
/>
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};