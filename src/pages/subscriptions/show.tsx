import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions, Button, Modal, DatePicker, message } from "antd";
import { useOne } from "@refinedev/core";
import React, { useState } from "react";

const { Title } = Typography;

const timeLabels: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

const timeColors: Record<string, string> = {
  breakfast: "gold",
  lunch: "blue",
  dinner: "purple",
};

export const SubscriptionShow = () => {
  const { queryResult } = useShow();
  const record = queryResult?.data?.data;

  // Fetch related users, restaurants, and meals for display names
  const { data: usersData } = useOne({
    resource: "users",
    id: record?.users?.[0],
    queryOptions: { enabled: !!record?.users?.length },
  });
  const { data: restaurantsData } = useOne({
    resource: "restaurants",
    id: record?.restaurants?.[0],
    queryOptions: { enabled: !!record?.restaurants?.length },
  });
  const { data: mealsData } = useOne({
    resource: "meals",
    id: record?.meals?.[0],
    queryOptions: { enabled: !!record?.meals?.length },
  });

  // Local state to simulate status changes
  const [status, setStatus] = useState(record?.status || "active");
  const [rescheduleModal, setRescheduleModal] = useState(false);

  // Helper to render tags with fallback to ID if name not found
  const renderTags = (items: any[], data: any, key = "name") =>
    items?.length
      ? items.map((id: string) => (
          <Tag key={id}>
            {data?.data?.id === id && data?.data?.[key]
              ? data.data[key]
              : id}
          </Tag>
        ))
      : "-";

  // Helper to render time tags
  const renderTimeTags = (times?: string[] | string) => {
    if (!times) return "-";
    const arr = Array.isArray(times) ? times : [times];
    return arr.length
      ? arr.map((t) => (
          <Tag
            key={t}
            color={timeColors[t?.toLowerCase?.()] || "default"}
            style={{ marginRight: 4, marginBottom: 2 }}
          >
            {timeLabels[t?.toLowerCase?.()] || t}
          </Tag>
        ))
      : "-";
  };

  // Simulate pause/resume/reschedule logic (replace with API call as needed)
  const handlePause = () => {
    setStatus("paused");
    message.success("Subscription paused!");
  };

  const handleReschedule = () => {
    setRescheduleModal(true);
  };

  const handleRescheduleOk = () => {
    setStatus("rescheduled");
    message.success("Subscription rescheduled!");
    setRescheduleModal(false);
  };

  // Status tag color and label
  const getStatusTag = () => {
    if (status === "paused") return <Tag color="red">Paused</Tag>;
    if (status === "rescheduled") return <Tag color="orange">Rescheduled</Tag>;
    return <Tag color="green">Active</Tag>;
  };

  return (
    <Show>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Name">{record?.name}</Descriptions.Item>
        <Descriptions.Item label="Price">{record?.price}</Descriptions.Item>
        
        <Descriptions.Item label="Restaurants">
          {renderTags(record?.restaurants, restaurantsData)}
        </Descriptions.Item>
        <Descriptions.Item label="Meals">
          {renderTags(record?.meals, mealsData)}
        </Descriptions.Item>
        <Descriptions.Item label="Time">
          {renderTimeTags(record?.time)}
        </Descriptions.Item>
        <Descriptions.Item label="Days">
          {record?.days?.length
            ? record.days.map((d: string) => <Tag key={d}>{d}</Tag>)
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {getStatusTag()}
        </Descriptions.Item>
        <Descriptions.Item label="Action">
          {status === "paused" ? (
            <Button type="primary" onClick={handleReschedule}>
              Reschedule
            </Button>
          ) : status === "rescheduled" ? (
            <Button type="primary" onClick={() => {
              setStatus("active");
              message.success("Subscription activated!");
            }}>
              Activate
            </Button>
          ) : (
            <Button danger onClick={handlePause}>
              Pause
            </Button>
          )}
        </Descriptions.Item>
      </Descriptions>
      <Modal
        title="Reschedule Subscription"
        open={rescheduleModal}
        onOk={handleRescheduleOk}
        onCancel={() => setRescheduleModal(false)}
      >
        <DatePicker style={{ width: "100%" }} />
      </Modal>
    </Show>
  );
};