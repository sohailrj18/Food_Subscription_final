import { Card, Row, Col, Statistic, Tag, Table, Select, DatePicker, Space, Button } from "antd";
import { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import fakeOrdersData from "../../data/fakeOrders.json";
import dayjs from "dayjs";

export const OrderList = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(match.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [date, setDate] = useState<any>(null);
  const [user, setUser] = useState<string | undefined>(undefined);
  const [restaurant, setRestaurant] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    setOrders(fakeOrdersData);
    setFilteredOrders(fakeOrdersData);
  }, []);

  const userOptions = Array.from(
    new Set(orders.map((o) => o.userName && o.userId && `${o.userId}|${o.userName}`))
  )
    .filter(Boolean)
    .map((val) => {
      const [id, name] = val.split("|");
      return { label: name, value: id };
    });

  const restaurantOptions = Array.from(
    new Set(orders.map((o) => o.restaurantName && o.restaurantId && `${o.restaurantId}|${o.restaurantName}`))
  )
    .filter(Boolean)
    .map((val) => {
      const [id, name] = val.split("|");
      return { label: name, value: id };
    });

  const handleFilter = () => {
    let filtered = [...orders];
    if (date) {
      filtered = filtered.filter((o) => dayjs(o.createdAt).isSame(date, "day"));
    }
    if (user) {
      filtered = filtered.filter((o) => o.userId === user);
    }
    if (restaurant) {
      filtered = filtered.filter((o) => o.restaurantId === restaurant);
    }
    if (status) {
      filtered = filtered.filter((o) => o.deliveryStatus === status);
    }
    setFilteredOrders(filtered);
  };

  const handleClear = () => {
    setDate(null);
    setUser(undefined);
    setRestaurant(undefined);
    setStatus(undefined);
    setFilteredOrders(orders);
  };

  const totalOrders = filteredOrders.length;
  const delivered = filteredOrders.filter(o => o.deliveryStatus === "delivered").length;
  const pending = filteredOrders.filter(o => o.deliveryStatus === "pending").length;
  const cancelled = filteredOrders.filter(o => o.deliveryStatus === "cancelled").length;
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.total || 0), 0);


  
  const columnData = [
    { status: "Delivered", value: delivered },
    { status: "Pending", value: pending },
    { status: "Cancelled", value: cancelled },
  ];

  const columnConfig = {
    data: columnData,
    xField: "status",
    yField: "value",
    seriesField: "status",
    color: ({ status }: any) => {
      if (status === "Delivered") return "#FFFFFF";
      if (status === "Pending") return "#faad14";
      if (status === "Cancelled") return "#ff4d4f";
      return "#1890ff";
    },
    label: {
      position: "middle",
      style: {
        fill: isDarkMode ? "#fff" : "#222",
        fontWeight: 700,
        fontSize: 16,
        textShadow: isDarkMode
          ? "0 1px 4px #000, 0 -1px 4px #000"
          : "0 1px 4px #fff, 0 -1px 4px #fff"
      },
    },
    xAxis: {
      label: {
        style: {
          fill: isDarkMode ? "#fff" : "#222",
          fontWeight: 600,
        },
      },
      title: {
        style: {
          fill: isDarkMode ? "#fff" : "#222",
          fontWeight: 700,
        },
      },
      line: {
        style: {
          stroke: isDarkMode ? "#aaa" : "#333",
        },
      },
      grid: null,
    },
    yAxis: {
      label: {
        style: {
          fill: isDarkMode ? "#fff" : "#222",
          fontWeight: 600,
        },
      },
      title: {
        style: {
          fill: isDarkMode ? "#fff" : "#222",
          fontWeight: 700,
        },
      },
      line: {
        style: {
          stroke: isDarkMode ? "#aaa" : "#333",
        },
      },
      grid: {
        line: {
          style: {
            stroke: isDarkMode ? "#444" : "#ddd",
            lineDash: [4, 4],
          },
        },
      },
    },
    tooltip: {
      domStyles: {
        'g2-tooltip': {
          color: isDarkMode ? "#fff" : "#000",
          backgroundColor: isDarkMode ? "#1f1f1f" : "#fff",
          borderColor: isDarkMode ? "#444" : "#ccc",
        },
        'g2-tooltip-title': {
          color: isDarkMode ? "#fff" : "#000",
        },
      },
    },
    legend: false,
    height: 250,
    columnStyle: { borderRadius: 4 },
  };

  return (
    <div>
      {/* Filters */}
      <Space style={{ marginBottom: 16 }}>
        <DatePicker
          placeholder="Order Date"
          value={date}
          onChange={setDate}
          allowClear
        />
        <Select
          options={userOptions}
          value={user}
          allowClear
          placeholder="User"
          onChange={setUser}
          style={{ width: 150 }}
        />
        <Select
          options={restaurantOptions}
          value={restaurant}
          allowClear
          placeholder="Restaurant"
          onChange={setRestaurant}
          style={{ width: 150 }}
        />
        <Select
          value={status}
          allowClear
          placeholder="Delivery Status"
          onChange={setStatus}
          style={{ width: 150 }}
          options={[
            { label: "Pending", value: "pending" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" },
          ]}
        />
        <Button type="primary" onClick={handleFilter}>
          Filter
        </Button>
        <Button onClick={handleClear}>
          Clear Filters
        </Button>
      </Space>

      {/* Dashboard Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Orders" value={totalOrders} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Delivered" value={delivered} valueStyle={{ color: "green" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Pending" value={pending} valueStyle={{ color: "orange" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Revenue" value={totalRevenue} prefix="₹" />
          </Card>
        </Col>
      </Row>

      {/* Column Chart */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Order Status Distribution">
            {(delivered || pending || cancelled) ? (
              <Column {...columnConfig} />
            ) : (
              <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
                No order data to display.
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Orders Table */}
      <Table dataSource={filteredOrders} rowKey="id" pagination={{ pageSize: 10 }}>
        <Table.Column dataIndex="id" title="Order ID" />
        <Table.Column dataIndex="userName" title="User" />
        <Table.Column dataIndex="restaurantName" title="Restaurant" />
        <Table.Column dataIndex="total" title="Total" />
        <Table.Column
          dataIndex="deliveryStatus"
          title="Delivery Status"
          render={(status: string) => {
            let color = "blue";
            if (status === "delivered") color = "green";
            if (status === "cancelled") color = "red";
            if (status === "pending") color = "orange";
            return <Tag color={color}>{status?.toUpperCase()}</Tag>;
          }}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Order Date"
          render={(value: string) => value}
        />
      </Table>
    </div>
  );
};
