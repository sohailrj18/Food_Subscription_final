import { Show, DateField, NumberField, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions } from "antd";

const { Title } = Typography;

export const OrderShow = () => {
  const { queryResult } = useShow();
  const record = queryResult?.data?.data;

  return (
    <Show>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Order ID">{record?.id}</Descriptions.Item>
        <Descriptions.Item label="User">{record?.userId}</Descriptions.Item>
        <Descriptions.Item label="Restaurant">{record?.restaurantId}</Descriptions.Item>
        <Descriptions.Item label="Total">
          <NumberField value={record?.total} />
        </Descriptions.Item>
        <Descriptions.Item label="Delivery Status">
          <Tag color={
            record?.deliveryStatus === "delivered"
              ? "green"
              : record?.deliveryStatus === "pending"
              ? "orange"
              : record?.deliveryStatus === "cancelled"
              ? "red"
              : "blue"
          }>
            {record?.deliveryStatus?.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Order Date">
          <DateField value={record?.createdAt} />
        </Descriptions.Item>
        <Descriptions.Item label="Details">
          <pre>{JSON.stringify(record, null, 2)}</pre>
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};