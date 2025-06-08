import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: subscriptionSelectProps } = useSelect({
    resource: "subscriptions",
  });

  const { selectProps: restaurantSelectProps } = useSelect({
    resource: "restaurants",
    optionLabel: "name",
    filters: [
      {
        field: "status",
        operator: "eq",
        value: "active",
      },
    ],
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"User ID"}
          name={["id"]}
          rules={[
            {
              required: true,
              message: "Please enter a user ID",
            },
          ]}
          initialValue={crypto.randomUUID()}
        >
          <Input placeholder="Enter user ID" disabled />
        </Form.Item>
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Subscription"}
          name={["subscription", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...subscriptionSelectProps} />
        </Form.Item>
        {/* <Form.Item
          label={"Meals Per Day"}
          name={["mealsPerDay"]}
          rules={[
            {
              required: true,
              message: "Please select how many times per day",
            },
          ]}
        >
          <Select
            options={[
              { value: 1, label: "1 time" },
              { value: 2, label: "2 times" },
              { value: 3, label: "3 times" },
            ]}
            placeholder="Select times per day"
            style={{ width: 180 }}
          />
        </Form.Item> */}
        <Form.Item
          label={"Restaurant"}
          name={["restaurant", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...restaurantSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"active"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            defaultValue={"active"}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
