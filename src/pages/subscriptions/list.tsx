import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  useTable,
} from "@refinedev/antd";
import { Table, Tag, Space } from "antd";
import { useMany } from "@refinedev/core";

const timeLabels: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export const SubscriptionList = () => {
  const { tableProps } = useTable({
      pagination: { pageSize: 25 },
    });

  // Gather all meal IDs from the current page's subscriptions
  const mealIds =
    tableProps?.dataSource
      ?.flatMap((sub) => sub.meals || [])
      .filter(Boolean) || [];

  // Fetch meal details for those IDs
  const { data: mealsData } = useMany({
    resource: "meals",
    ids: mealIds,
    queryOptions: { enabled: !!mealIds.length },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="price" title="Price" />
       <Table.Column
  dataIndex="time"
  title="Time"
  render={(value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.length
        ? value.map((v) => (
            <Tag
              key={v}
              color={
                v === "breakfast"
                  ? "gold"
                  : v === "lunch"
                  ? "blue"
                  : v === "dinner"
                  ? "purple"
                  : "default"
              }
              style={{ marginRight: 4, marginBottom: 2 }}
            >
              {timeLabels[v?.toLowerCase?.()] || v}
            </Tag>
          ))
        : "-";
    }
    return value
      ? (
        <Tag
          color={
            value === "breakfast"
              ? "gold"
              : value === "lunch"
              ? "blue"
              : value === "dinner"
              ? "purple"
              : "default"
          }
        >
          {timeLabels[value?.toLowerCase?.()] || value}
        </Tag>
      )
      : "-";
  }}
/>
        <Table.Column
          dataIndex="meals"
          title="Meals"
          render={(mealIds: string[]) =>
            mealIds?.length && mealsData?.data
              ? mealIds
                  .map((id) => {
                    const meal = mealsData.data.find((m) => m.id === id);
                    return meal ? <Tag key={id}>{meal.name}</Tag> : null;
                  })
                  .filter(Boolean)
              : "-"
          }
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