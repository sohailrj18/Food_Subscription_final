import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useUpdate } from "@refinedev/core";
import { Space, Table, Button, Tag } from "antd";

export const RestaurantList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    pagination: { pageSize: 25 },
  });

  const { mutate: updateRestaurant, isLoading: isUpdating } = useUpdate();

  const handleToggleStatus = (record: any) => {
    const newStatus = record.status === "active" ? "inactive" : "active";
    updateRestaurant(
      {
        resource: "restaurants",
        id: record.id,
        values: { ...record, status: newStatus },
      },
      {
        onSuccess: () => {
          // Optionally, you can trigger a refresh by reloading the page or updating state
          // For now, tableProps automatically updates after mutation if dataProvider is set up correctly
        },
      }
    );
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column
          dataIndex="status"
          title={"Status"}
          render={(value: any) =>
            value === "active" ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">Inactive</Tag>
            )
          }
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
              <Button
                size="small"
                loading={isUpdating}
                onClick={() => handleToggleStatus(record)}
              >
                Toggle Status
              </Button>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};