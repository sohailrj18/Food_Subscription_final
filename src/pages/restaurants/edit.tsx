import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Button } from "antd";
import { useState } from "react";

const subscriptionOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const mealsOptions = [
  { label: "1 time", value: 1 },
  { label: "2 times", value: 2 },
  { label: "3 times", value: 3 },
];

export const RestaurantEdit = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm({});
  const userData = queryResult?.data?.data;

  // For cost summary
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>(userData?.subscriptionsOffered || []);
  const [selectedMeals, setSelectedMeals] = useState<number[]>(userData?.mealsPerDayOffered || []);

  // Fixed costs per meal
  const subscriptionCosts: Record<string, number> = {
    daily: 50,
    weekly: 300,
    monthly: 1200,
    yearly: 15000,
  };
  const subscriptionOrder = ["daily", "weekly", "monthly", "yearly"];

  // Cost summary
  const costSummary =
    selectedSubscriptions.length && selectedMeals.length ? (
      <div style={{ marginTop: 24 }}>
        <h4>Cost Summary (per subscription & meal):</h4>
        <ul>
          {subscriptionOrder
            .filter((sub) => selectedSubscriptions.includes(sub))
            .map((sub) =>
              selectedMeals.map((meal) => (
                <li key={sub + meal}>
                  {subscriptionOptions.find((s) => s.value === sub)?.label} - {meal} time{meal > 1 ? "s" : ""} per day: ₹
                  {subscriptionCosts[sub] * meal}
                </li>
              ))
            )}
        </ul>
      </div>
    ) : null;

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="ID"
          name={["id"]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Name"
          name={["name"]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Subscriptions Offered"
          name={["subscriptionsOffered"]}
          rules={[{ required: true, message: "Please select at least one subscription" }]}
          initialValue={userData?.subscriptionsOffered}
        >
          <Select
            mode="multiple"
            options={subscriptionOptions}
            placeholder="Select subscriptions"
            onChange={setSelectedSubscriptions}
            value={selectedSubscriptions}
          />
        </Form.Item>
        <Form.Item
          label="Meals Per Day Offered"
          name={["mealsPerDayOffered"]}
          rules={[{ required: true, message: "Please select at least one meal option" }]}
          initialValue={userData?.mealsPerDayOffered}
        >
          <Select
            mode="multiple"
            options={mealsOptions}
            placeholder="Select meal options"
            onChange={setSelectedMeals}
            value={selectedMeals}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name={["status"]}
          initialValue={userData?.status || "active"}
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
      {costSummary}
    </Edit>
  );
};