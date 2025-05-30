import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

const timeOptions = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
];

export const SubscriptionEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({});
  const subscription = queryResult?.data?.data;

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: subscription?.users,
  });
  const { selectProps: restaurantSelectProps } = useSelect({
    resource: "restaurants",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: subscription?.restaurants,
  });
  const { selectProps: mealSelectProps } = useSelect({
    resource: "meals",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: subscription?.meals,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name={["name"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name={["price"]} rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Assign Users" name={["users"]}>
          <Select mode="multiple" {...userSelectProps} placeholder="Select users" />
        </Form.Item>
        <Form.Item label="Assign Restaurants" name={["restaurants"]}>
          <Select mode="multiple" {...restaurantSelectProps} placeholder="Select restaurants" />
        </Form.Item>
        <Form.Item label="Assign Meals" name={["meals"]}>
          <Select mode="multiple" {...mealSelectProps} placeholder="Select meals" />
        </Form.Item>
  <Form.Item label="Time" name={["time"]} rules={[{ required: true }]}>
  <Select
    mode="multiple"
    options={timeOptions}
    placeholder="Select time(s)"
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
    </Edit>
  );
};