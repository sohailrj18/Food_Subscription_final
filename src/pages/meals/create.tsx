import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

const typeOptions = [
  { label: "Veg", value: "veg" },
  { label: "Non-Veg", value: "non-veg" },
];

export const MealCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: restaurantSelectProps } = useSelect({
    resource: "restaurants",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
       
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[{ required: true, message: "Please enter meal name" }]}
        >
          <Input />
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
          rules={[{ required: true, type: "number", min: 0, message: "Please enter a valid price" }]}
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
            placeholder="Select restaurants"
            {...restaurantSelectProps}
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
  rules={[{ required: true, message: "Please select spice level" }]}
>
  <Select placeholder="Select spice level">
    <Select.Option value="Mild">🟢 Mild</Select.Option>
    <Select.Option value="Medium">🟠 Medium</Select.Option>
    <Select.Option value="Hot">🔴 Hot</Select.Option>
  </Select>
</Form.Item>
          
      </Form>
    </Create>
  );
};