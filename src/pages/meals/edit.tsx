import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

const typeOptions = [
  { label: "Veg", value: "veg" },
  { label: "Non-Veg", value: "non-veg" },
];

export const MealEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({});
  const mealData = queryResult?.data?.data;

  const { selectProps: restaurantSelectProps } = useSelect({
    resource: "restaurants",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: mealData?.restaurants,
    queryOptions: { enabled: true },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
         <Form.Item
          label="ID"
          name={["id"]}
          rules={[{ required: true }]}
        >
        <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Description"
          name={["description"]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Price"
          name={["price"]}
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Assigned Restaurants"
          name={["restaurants"]}
          rules={[{ required: true, message: "Please select at least one restaurant" }]}
        >
          <Select
            mode="multiple"
            {...restaurantSelectProps}
            placeholder="Assign to restaurants"
          />
        </Form.Item>
        <Form.Item
          label="Type"
          name={["type"]}
          rules={[{ required: true, message: "Please select meal type" }]}
        >
          <Select
            options={typeOptions}
            placeholder="Select type"
          />
        </Form.Item>
        <Form.Item
          label="Spice Level"
          name={["spiceLevel"]}
          rules={[{ required: true, message: "Please enter spice level" }]}
        >
          <Input placeholder="e.g. Mild, Medium, Hot" />
        </Form.Item>
      </Form>
    </Edit>
  );
};