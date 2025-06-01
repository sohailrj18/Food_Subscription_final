import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useState } from "react";
import { Table as AntTable } from "antd";

const subscriptionOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];
const subscriptionOrder = ["daily", "weekly", "monthly", "yearly"];
const mealsOptions = [
  { label: "1 time", value: 1 },
  { label: "2 times", value: 2 },
  { label: "3 times", value: 3 },
];

// Fixed costs per meal
const subscriptionCosts: Record<string, number> = {
  daily: 50,
  weekly: 300,
  monthly: 1200,
  yearly: 15000,
};

export const RestaurantCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);

  // Table columns: meal options
  const columns = [
    {
      title: "Subscription Type",
      dataIndex: "subscription",
      key: "subscription",
      render: (sub: string) =>
        subscriptionOptions.find((s) => s.value === sub)?.label || sub,
    },
    ...selectedMeals.map((meal) => ({
      title: mealsOptions.find((m) => m.value === meal)?.label || `${meal} times`,
      dataIndex: `meal_${meal}`,
      key: `meal_${meal}`,
      align: "center" as const,
    })),
  ];

  // Table data: each row is a subscription, each cell is cost
  const dataSource = subscriptionOrder
    .filter((sub) => selectedSubscriptions.includes(sub))
    .map((sub) => {
      const row: any = {
        key: sub,
        subscription: sub,
      };
      selectedMeals.forEach((meal) => {
        row[`meal_${meal}`] = `₹${subscriptionCosts[sub] * meal}`;
      });
      return row;
    });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="ID"
          name={["id"]}
          rules={[{ required: true, message: "Please enter restaurant ID" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[{ required: true, message: "Please enter restaurant name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={["email"]}
          rules={[
            { required: true, message: "Please enter restaurant email" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Subscriptions Offered"
          name={["subscriptionsOffered"]}
          rules={[{ required: true, message: "Please select at least one subscription" }]}
        >
          <Select
            mode="multiple"
            options={subscriptionOptions}
            placeholder="Select subscriptions"
            onChange={setSelectedSubscriptions}
          />
        </Form.Item>
        <Form.Item
          label="Meals Per Day Offered"
          name={["mealsPerDayOffered"]}
          rules={[{ required: true, message: "Please select at least one meal option" }]}
        >
          <Select
            mode="multiple"
            options={mealsOptions}
            placeholder="Select meal options"
            onChange={setSelectedMeals}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name={["status"]}
          initialValue="active"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>

      {/* Costing Table */}
      {selectedSubscriptions.length && selectedMeals.length ? (
        <div style={{ marginTop: 24 }}>
          <h4>Costing Table</h4>
          <AntTable
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
            size="middle"
            style={{ marginTop: 16, maxWidth: 600 }}
          />
        </div>
      ) : null}
    </Create>
  );
};