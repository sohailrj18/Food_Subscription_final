import React from "react";
import { Card, Row, Col, Button, Typography, Tag } from "antd";
import { useList } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const HomePage = () => {
  const navigate = useNavigate();

  // Fetch meals, restaurants, subscriptions
  const { data: mealsData } = useList({ resource: "meals" });
  const { data: restaurantsData } = useList({ resource: "restaurants" });
  const { data: subscriptionsData } = useList({ resource: "subscriptions" });

  // Get unique meal types
  const mealTypes = Array.from(
    new Set(mealsData?.data?.map((meal) => meal.type))
  );

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Welcome to Food Subscription Admin</Title>

      {/* Section 1: Meal Types */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "space-between" }}>
        <Title level={4}>Types of Meals</Title>
        <Button onClick={() => navigate("/meals")}> View More </Button>
      </div>
      <Row
        gutter={16}
        style={{
          marginBottom: 32,
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {mealsData?.data?.slice(0, 4).map((meal) => (
          <Col
            key={meal.id}
            xs={24}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            style={{ marginBottom: 16 }}
          >
            <Card title={meal.name}>
              <Tag color={meal.type === "veg" ? "green" : "red"}>
                {meal.type}
              </Tag>
              <div>{meal.description}</div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Section 2: Restaurants */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "space-between" }}>
        <Title level={4}>Restaurants</Title>
        <Button onClick={() => navigate("/restaurants")}> View More </Button>
      </div>

      <Row gutter={16} style={{ marginBottom: 32 }}>
        {restaurantsData?.data?.slice(0, 4).map((rest) => (
          <Col key={rest.id}>
            <Card title={rest.name}>
              <Tag color={rest.status === "active" ? "green" : "red"}>
                {rest.status}
              </Tag>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Section 3: Subscriptions */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "space-between" }}>
        <Title level={4}>Subscription</Title>
        <Button onClick={() => navigate("/subscriptions")}> View More </Button>
      </div>
      <Row gutter={16} style={{ marginBottom: 32 }}>
        {subscriptionsData?.data?.slice(0, 4).map((sub) => (
          <Col key={sub.id}>
            <Card title={sub.name}>
              <div>Price: ₹{sub.price}</div>
              <div>
                <Button type="link" onClick={() => navigate(`/subscriptions/show/${sub.id}`)}>
                  View Subscription
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};