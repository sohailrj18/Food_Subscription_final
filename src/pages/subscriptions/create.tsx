import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
import React from "react";

const timeOptions = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
];

export const SubscriptionCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const [selectedUser, setSelectedUser] = React.useState<string | undefined>();
  const [selectedRestaurant, setSelectedRestaurant] = React.useState<string | undefined>();

  // User select
  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "name",
    optionValue: "id",
  });

  // Restaurant select, filtered by user
  const { selectProps: restaurantSelectProps } = useSelect({
    resource: "restaurants",
    optionLabel: "name",
    optionValue: "id",
    filters: selectedUser
      ? [{ field: "userId", operator: "eq", value: selectedUser }]
      : [],
    queryOptions: { enabled: !!selectedUser },
  });

  // Meal select, filtered by restaurant
  const { selectProps: mealSelectProps } = useSelect({
    resource: "meals",
    optionLabel: "name",
    optionValue: "id",
    filters: selectedRestaurant
      ? [{ field: "restaurants", operator: "contains", value: selectedRestaurant }]
      : [],
    queryOptions: { enabled: !!selectedRestaurant },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="User" name={["userId"]} rules={[{ required: true }]}>
          <Select
            {...userSelectProps}
            onChange={(value) => {
              // Fix: handle both string and BaseOption cases
              setSelectedUser(typeof value === "object" && value !== null ? value.value : value);
              setSelectedRestaurant(undefined);
              formProps.form?.setFieldsValue({ restaurants: [], meals: [] });
            }}
            placeholder="Select user"
          />
        </Form.Item>
        <Form.Item label="Assign Restaurants" name={["restaurants"]} rules={[{ required: true }]}>
          <Select
            mode="multiple"
            {...restaurantSelectProps}
            placeholder="Select restaurants"
            disabled={!selectedUser}
            onChange={(value) => {
              // For simplicity, only allow one restaurant for meal filtering
              setSelectedRestaurant(Array.isArray(value) ? value[0] : value);
              formProps.form?.setFieldsValue({ meals: [] });
            }}
          />
        </Form.Item>
        <Form.Item label="Assign Meals" name={["meals"]} rules={[{ required: true }]}>
          <Select
            mode="multiple"
            {...mealSelectProps}
            placeholder="Select meals"
            disabled={!selectedRestaurant}
          />
        </Form.Item>
        <Form.Item label="Name" name={["name"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name={["price"]} rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Time" name={["time"]} rules={[{ required: true }]}>
          <Select
            mode="multiple"
            options={timeOptions}
            placeholder="Select time(s)"
            style={{ minWidth: 220 }}
            tagRender={({ label, value, closable, onClose }) => (
              <span>
                <span
                  style={{
                    display: "inline-block",
                    background:
                      value === "breakfast"
                        ? "#FFD700"
                        : value === "lunch"
                        ? "#1890ff"
                        : value === "dinner"
                        ? "#722ed1"
                        : "#d9d9d9",
                    color: "#fff",
                    borderRadius: 4,
                    padding: "2px 8px",
                    marginRight: 4,
                  }}
                >
                  {label}
                </span>
                {closable && (
                  <span
                    onClick={onClose}
                    style={{
                      cursor: "pointer",
                      marginLeft: 4,
                      color: "#fff",
                    }}
                  >
                    ×
                  </span>
                )}
              </span>
            )}
          />
        </Form.Item>
        <Form.Item label="Days" name={["days"]}>
          <Select
            mode="multiple"
            options={[
              { label: "Monday", value: "Monday" },
              { label: "Tuesday", value: "Tuesday" },
              { label: "Wednesday", value: "Wednesday" },
              { label: "Thursday", value: "Thursday" },
              { label: "Friday", value: "Friday" },
              { label: "Saturday", value: "Saturday" },
              { label: "Sunday", value: "Sunday" },
            ]}
            placeholder="Select days"
          />
        </Form.Item>
      </Form>
    </Create>
  );
};