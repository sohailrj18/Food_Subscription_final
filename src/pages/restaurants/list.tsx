import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useUpdate } from "@refinedev/core";
import { Space, Table, Button, Tag, Select, Switch } from "antd";
import { useAppStore } from "../../zustand/appStore";
export const RestaurantList = () => {
  const { filters: appFilters, setFilters: setAppFilters } = useAppStore();

  const { tableProps, filters, setFilters } = useTable({
    syncWithLocation: true,
    pagination: { pageSize: 25 },
    filters: {
      initial: [
        {
          field: "status",
          operator: "eq",
          value: appFilters.restaurantStatus,
        },
      ],
    },
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
      <div style={{ marginBottom: "1rem" }}>
        <Select
          value={appFilters.restaurantStatus}
          onChange={(value) => {
            setAppFilters({ restaurantStatus: value });
            setFilters([{ field: "status", operator: "eq", value: value }]);
          }}
          defaultValue={appFilters.restaurantStatus}
          options={[
            { label: "All", value: "" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          style={{ width: 120 }}
        />
      </div>
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
              {/* <Button
                size="small"
                loading={isUpdating}
                onClick={() => handleToggleStatus(record)}
              >
                Toggle Status
              </Button> */}
              {/* update with a actual switch button */}
              <Switch
                checked={record.status === "active"}
                onChange={() => handleToggleStatus(record)}
                loading={isUpdating}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
