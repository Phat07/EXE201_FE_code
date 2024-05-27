import React, { useState } from "react";
import Header from "../components/Header";
import {
  Button,
  Carousel,
  Col,
  Collapse,
  Divider,
  Layout,
  List,
  Pagination,
  Row,
  Space,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import {
  ShareAltOutlined,
  HeartOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const imageArray1 = [
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  // Thêm các link ảnh khác nếu có
];

const businessSchedule = [
  { day: "Monday", hours: "10:00 AM - 06:00 PM" },
  { day: "Tuesday", hours: "Closed" },
  { day: "Wednesday", hours: "10:00 AM - 08:00 PM" },
  { day: "Thursday", hours: "10:00 AM - 08:00 PM" },
  { day: "Friday", hours: "07:00 AM - 08:30 PM" },
  { day: "Saturday", hours: "07:00 AM - 08:30 PM" },
  { day: "Sunday", hours: "09:00 AM - 05:00 PM" },
];

const services = [
  { name: "Regular cut", price: "$35.00", duration: "25min" },
  { name: "Haircut w beard", price: "$40.00", duration: "30min" },
  { name: "Kids haircut", price: "$30.00", duration: "20min" },
  // Thêm các dịch vụ khác nếu có
];

const feedbacks = [
  {
    user: "John Doe",
    stars: 5,
    service: "Regular cut",
    comment: "Great service, will definitely come back!",
    timestamp: "2024-05-26T12:00:00Z",
  },
  {
    user: "Jane Smith",
    stars: 3,
    service: "Haircut w beard",
    comment: "Friendly staff and excellent haircut.",
    timestamp: "2024-05-25T15:30:00Z",
  },
  {
    user: "Jane Smith",
    stars: 4,
    service: "Haircut w beard",
    comment: "Friendly staff and excellent haircut.",
    timestamp: "2024-05-25T15:30:00Z",
  },
  {
    user: "Jane Smith",
    stars: 4,
    service: "Haircut w beard",
    comment: "Friendly staff and excellent haircut.",
    timestamp: "2024-05-25T15:30:00Z",
  },
  {
    user: "Jane Smith",
    stars: 4,
    service: "Haircut w beard",
    comment: "Friendly staff and excellent haircut.",
    timestamp: "2024-05-25T15:30:00Z",
  },
  {
    user: "Jane Smith",
    stars: 4,
    service: "Haircut w beard",
    comment: "Friendly staff and excellent haircut.",
    timestamp: "2024-05-25T15:30:00Z",
  },
  {
    user: "Jane Smith",
    stars: 4,
    service: "Haircut w beard",
    comment: "Friendly staff and excellent haircut.",
    timestamp: "2024-05-25T15:30:00Z",
  },
  {
    user: "Jane Smith",
    stars: 4,
    service: "Haircut w beard",
    comment: "Friendly staff and excellent haircut.",
    timestamp: "2024-05-25T15:30:00Z",
  },
];

function SalonDetail(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Số lượng phản hồi trên mỗi trang
  const indexOfLastFeedback = currentPage * pageSize;
  const indexOfFirstFeedback = indexOfLastFeedback - pageSize;
  const currentFeedbacks = feedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  function renderStars(stars) {
    const filledStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;

    const starIcons = [];

    for (let i = 0; i < filledStars; i++) {
      starIcons.push(<StarFilled key={i} style={{ color: "#FFD700" }} />);
    }

    if (hasHalfStar) {
      starIcons.push(
        <StarOutlined key={filledStars} style={{ color: "#FFD700" }} />
      );
    }

    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(<StarOutlined key={filledStars + i + 1} />);
    }

    return starIcons;
  }

  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "175px",
          marginLeft: "250px",
          marginRight: "250px",
        }}
      ></div>
      <div>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Row gutter={16}>
              <Col
                xs={24}
                md={10}
                style={{ marginBottom: "16px", marginLeft: "20rem" }}
              >
                <div>
                  <div
                    className="rating-overlay"
                    style={{
                      position: "absolute",
                      right: "10px",
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      padding: "10px",
                      borderRadius: "8px",
                      textAlign: "right",
                      zIndex: "2",
                    }}
                  >
                    <div
                      className="rating-score"
                      style={{
                        textAlign: "center",
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      5.0
                    </div>
                    <div className="rating-count">208 reviews</div>
                  </div>
                  <div>
                    <Carousel autoplay>
                      {imageArray1.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image}
                            alt={`image${index}`}
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    OMAR KINGSMENT BARBER LOUNGE
                  </h2>
                  <Space>
                    <Button
                      type="text"
                      icon={<ShareAltOutlined style={{ fontSize: "1.5rem" }} />}
                    />
                    <Button
                      type="text"
                      icon={<HeartOutlined style={{ fontSize: "1.5rem" }} />}
                    />
                  </Space>
                </div>
                <div>
                  <Collapse
                    bordered={false}
                    expandIconPosition="end"
                    className="custom-collapse"
                    style={{
                      marginTop: "16px",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Panel
                      header={
                        <span
                          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                        >
                          Services
                        </span>
                      }
                      key="1"
                    >
                      <List
                        itemLayout="horizontal"
                        dataSource={services}
                        renderItem={(service) => (
                          <List.Item
                            actions={[
                              <Button type="primary" key="book">
                                Book
                              </Button>,
                            ]}
                          >
                            <List.Item.Meta
                              title={
                                <span
                                  style={{
                                    fontSize: "1.3rem",
                                  }}
                                >
                                  {service.name}
                                </span>
                              }
                              description={`${service.price} • ${service.duration}`}
                            />
                          </List.Item>
                        )}
                        style={{ backgroundColor: "transparent" }}
                      />
                    </Panel>
                  </Collapse>
                </div>
                <div>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    Feedbacks
                  </h2>
                  <List
                    itemLayout="horizontal"
                    dataSource={currentFeedbacks}
                    renderItem={(feedback) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <div>
                              <div>{renderStars(feedback.stars)}</div>
                              <p>
                                {feedback.user} •{" "}
                                {new Date(
                                  feedback.timestamp
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          }
                          description={
                            <div>
                              <p>{feedback.comment}</p>
                              <p>Service: {feedback.service}</p>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                  <Pagination
                    current={currentPage}
                    total={feedbacks.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </Col>
              <Col xs={24} md={7}>
                <div
                  style={{
                    padding: "24px",
                    marginLeft: "5rem",
                    background: "#fff",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <Title level={4}>Address</Title>
                    <Text>960 Lincoln Hwy, Schererville, 46375</Text>
                    <Divider />
                  </div>

                  <div>
                    <Title level={4}>About Us</Title>
                    <Text>
                      CASH ONLY, CASH ONLY, NO CARD, NO MOBILE PAYMENT CASH ONLY
                    </Text>
                    <Divider />
                  </div>

                  <div>
                    <Title level={4}>Contact & Business Hours</Title>

                    <Row justify="space-between" align="middle">
                      <Text>+12199868410</Text>
                      <Button type="primary" href="tel:+12199868410">
                        Call
                      </Button>
                    </Row>
                    <Divider />
                  </div>

                  <div>
                    {businessSchedule.map((schedule, index) => (
                      <Row justify="space-between" key={index}>
                        <Text strong>{schedule.day}:</Text>
                        <Text>{schedule.hours}</Text>
                      </Row>
                    ))}
                    <Divider />
                  </div>

                  <div>
                    <Button danger block>
                      Report Shop
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default SalonDetail;
