import React, { useState } from "react";
import Header from "../components/Header";
import {
  Button,
  Carousel,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Layout,
  List,
  Modal,
  Pagination,
  Progress,
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
import "../css/salonDetail.css";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const imageArray1 = [
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
];

const ourWorkImages = [
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
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

const reportOptions = [
  "Spam or misleading",
  "Inappropriate content",
  "Hate speech or graphic violence",
  "Harassment or bullying",
];

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

function SalonDetail(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Số lượng phản hồi trên mỗi trang
  const indexOfLastFeedback = currentPage * pageSize;
  const indexOfFirstFeedback = indexOfLastFeedback - pageSize;
  const currentFeedbacks = feedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);
  const [showAllWork, setShowAllWork] = useState(false);

  const showReportModal = () => {
    setIsReportModalVisible(true);
  };

  const handleCancel = () => {
    setIsReportModalVisible(false);
  };

  const handleReport = () => {
    console.log("Reported items:", selectedReports);
    setIsReportModalVisible(false);
  };

  const onChangeCheckbox = (checkedValues) => {
    setSelectedReports(checkedValues);
  };

  const calculateRatingDistribution = (feedbacks) => {
    const totalReviews = feedbacks.length;
    const ratingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    let totalStars = 0;

    feedbacks.forEach((feedback) => {
      totalStars += feedback.stars;
      const roundedStars = Math.round(feedback.stars);
      ratingDistribution[roundedStars]++;
    });

    const averageRating = (totalStars / totalReviews).toFixed(1);

    return { averageRating, ratingDistribution, totalReviews };
  };

  const { averageRating, ratingDistribution, totalReviews } =
    calculateRatingDistribution(feedbacks);

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
                  <div className="rating-overlay">
                    <div className="rating-score">5.0</div>
                    <div>208 reviews</div>
                  </div>
                  <div>
                    <Carousel autoplay>
                      {imageArray1.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image}
                            alt={`image${index}`}
                            className="carousel-image"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
                <div className="space-between">
                  <h2
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
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
                    defaultActiveKey={["1"]}
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
                          style={{ fontSize: "1.8rem", fontWeight: "bold" }}
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
                  <div className="our-work-section">
                    <h2
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                      }}
                    >
                      See Our Work
                    </h2>
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <img
                          src={ourWorkImages[0]}
                          alt="Main Work"
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Row gutter={[8, 8]}>
                          {ourWorkImages.slice(1, 5).map((image, index) => (
                            <Col key={index} span={12}>
                              <img
                                src={image}
                                alt={`Work ${index + 1}`}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  borderRadius: "8px",
                                }}
                              />
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                    <Button
                      block
                      onClick={() => setShowAllWork(true)}
                      style={{ marginTop: "16px" }}
                    >
                      SEE ALL WORK
                    </Button>
                  </div>

                  <div>
                    <Modal
                      title="All Our Work"
                      visible={showAllWork}
                      onCancel={() => setShowAllWork(false)}
                      footer={null}
                      width={800}
                    >
                      <Carousel arrows infinite={false}>
                        {ourWorkImages.map((image, index) => (
                          <div key={index}>
                            <img
                              src={image}
                              alt={`Work ${index}`}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Modal>
                  </div>
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    Feedback
                  </h2>
                </div>
                <div className="rating-stats-container">
                  <div className="rating-summary">
                    <h3>
                      <span>{averageRating}</span>/5
                    </h3>
                    {renderStars(parseFloat(averageRating))}
                    <p>Based on {totalReviews} reviews</p>
                  </div>
                  <div className="divider-line"></div>
                  <div className="rating-distribution">
                    {[1, 2, 3, 4, 5].reverse().map((starValue) => (
                      <div key={starValue} className="rating-bar-container">
                        <span className="star-value">
                          {starValue} <StarFilled style={{ color: "gold" }} />
                        </span>
                        <Progress
                          className="rating-progress-bar"
                          percent={
                            (ratingDistribution[starValue] / totalReviews) * 100
                          }
                          status="active"
                          showInfo={false}
                        />
                        <span className="review-count">
                          {ratingDistribution[starValue]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
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
              <div></div>
              <Col xs={24} md={7} className="sticky-col">
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
                    <Title level={4}>Contact Us</Title>
                    <Row justify="space-between" align="middle">
                      <Text>+12199868410</Text>
                      <Button type="primary">Call</Button>
                    </Row>
                    <Divider />
                  </div>

                  <div>
                    <Title level={4}>Business Hours</Title>
                    {businessSchedule.map((schedule, index) => (
                      <Row justify="space-between" key={index}>
                        <Text strong>{schedule.day}:</Text>
                        <Text>{schedule.hours}</Text>
                      </Row>
                    ))}
                    <Divider />
                  </div>

                  <div>
                    <Button danger block onClick={showReportModal}>
                      Report Shop
                    </Button>
                  </div>

                  <div>
                    <Modal
                      title="Report Shop"
                      centered
                      visible={isReportModalVisible}
                      onOk={handleReport}
                      onCancel={handleCancel}
                      okText="Report"
                      cancelText="Cancel"
                      width={400}
                      style={{ textAlign: "center" }}
                      footer={null}
                    >
                      <Checkbox.Group
                        style={{ width: "100%" }}
                        onChange={onChangeCheckbox}
                      >
                        {reportOptions.map((option, index) => (
                          <div
                            key={index}
                            style={{
                              display: "block",
                              textAlign: "left",
                              width: "100%",
                              padding: "8px 0",
                            }}
                          >
                            <Checkbox value={option}>{option}</Checkbox>
                            {index < reportOptions.length - 1 && <Divider />}
                          </div>
                        ))}
                      </Checkbox.Group>
                      <div
                        style={{
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        <Button
                          key="back"
                          onClick={handleCancel}
                          style={{ marginRight: "8px" }}
                        >
                          Cancel
                        </Button>
                        <Button
                          key="submit"
                          type="primary"
                          onClick={handleReport}
                        >
                          Report
                        </Button>
                      </div>
                    </Modal>
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