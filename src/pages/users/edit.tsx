import { Edit, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm({});

  const userData = queryResult?.data?.data;

  const { selectProps: subscriptionSelectProps } = useSelect({
    resource: "subscriptions",
    defaultValue: userData?.subscription,
    queryOptions: {
      enabled: !!userData?.subscription,
    },
  });

  const { selectProps: restaurantSelectProps } = useSelect({
    resource: "restaurants",
    defaultValue: userData?.restaurant,
    queryOptions: {
      enabled: true,
    },
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
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
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
          label={"Restaurant"}
          name={["restaurant", "id"]}
          initialValue={formProps?.initialValues?.restaurant?.id}
          rules={[{ required: true }]}
        >
          <Select {...restaurantSelectProps} />
        </Form.Item>

        <Form.Item
          label={"Subscription"}
          name={["subscription", "id"]}
          initialValue={formProps?.initialValues?.subscription?.id}
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
          initialValue={formProps?.initialValues?.mealsPerDay}
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
          label={"Status"}
          name={["status"]}
          initialValue={formProps?.initialValues?.status}
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
            defaultValue={formProps?.initialValues?.status}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
