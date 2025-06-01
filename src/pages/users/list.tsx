import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany } from "@refinedev/core";
import { Select, Space, Table, Tag } from "antd";

export const UserList: React.FC = () => {
  const { tableProps, filters, setFilters } = useTable({
    syncWithLocation: true,
    pagination: { pageSize: 25 },
    // Removed filters.initial to show all users by default
  });

  // Fetch subscriptions
  const { data: subscriptions } = useMany({
    resource: "subscriptions",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.subscription)
        .filter(Boolean) ?? [],
  });

  // Fetch restaurants
  const { data: restaurants } = useMany({
    resource: "restaurants",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.restaurant)
        .filter(Boolean) ?? [],
  });

  // Fetch meals (assuming 'meals' is an array of meal IDs per user)
  const mealIds =
    tableProps?.dataSource
      ?.flatMap((item) => item?.meals || [])
      .filter(Boolean) ?? [];
  const { data: meals } = useMany({
    resource: "meals",
    ids: mealIds,
  });

  return (
    <List>
      <div style={{ marginBottom: "1rem" }}>
        <Select
          value={filters[0]?.value}
          onChange={(value) =>
            setFilters([{ field: "status", operator: "eq", value: value }])
          }
          options={[
            { label: "All", value: "" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
      </div>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column
          dataIndex="status"
          title={"Status"}
          render={(value: any) =>
            value === "active" ? (
              <i className="bx bx-check-circle " style={{ color: "green" }} />
            ) : (
              <i className="bx bx-x-circle " style={{ color: "red" }} />
            )
          }
        />
        <Table.Column
          dataIndex={["subscription"]}
          title={"Subscription"}
          render={(value: any) => {
            const subscriptionId = value?.id || value;
            const subscription = subscriptions?.data?.find(
              (item: any) => item.id === subscriptionId
            );
            return subscription?.name || "-";
          }}
        />
        <Table.Column
          dataIndex={["restaurant"]}
          title={"Restaurant"}
          render={(value: any) => {
            const restaurantId = value?.id || value;
            const restaurant = restaurants?.data?.find(
              (item: any) => item.id === restaurantId
            );
            return restaurant?.name || "-";
          }}
        />
       
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
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