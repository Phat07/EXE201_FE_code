import React, { useRef, useState } from "react";
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
  Select,
  message,
} from "antd";
import { Content } from "antd/es/layout/layout";
import {
  ShareAltOutlined,
  HeartOutlined,
  StarFilled,
  StarOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import "../css/salonDetail.css";

const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Option } = Select;

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
  { name: "Regular cut", price: "125.000", duration: "25min" },
  { name: "Haircut w beard", price: "150.000", duration: "30min" },
  { name: "Kids haircut", price: "200.000", duration: "20min" },
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
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showServiceList, setShowServiceList] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  console.log("selectedDate", selectedDate);
  console.log("selectedTimeSlot", selectedTimeSlot);
  console.log("timeSlots", timeSlots);

  const handleScroll = (direction, containerRef) => {
    const maxScroll =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const scrollAmount = containerRef.current.clientWidth / 2;

    if (direction === "left" && scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else if (
      direction === "right" &&
      containerRef.current.scrollLeft < maxScroll
    ) {
      setScrollIndex(scrollIndex + 1);
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const dateContainerRef = useRef(null);
  const timeContainerRef = useRef(null);

  const generateTimeSlots = (startHour, endHour, intervalMinutes) => {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        slots.push(time);
      }
    }
    return slots;
  };

  const generateDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  function generateNextSevenDays() {
    let days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day);
    }
    return days;
  }

  // Call the function to get the next seven days
  const currentMonthDays = generateNextSevenDays();
  // const currentMonthDays = generateDaysInMonth(
  //   // new Date().getFullYear(),
  //   // new Date().getMonth()

  // );

  const handleBookClick = (service) => {
    console.log("service", service);
    // setSelectedService(service);
    // setIsBookingModalVisible(true);
    // setAdditionalServices([...additionalServices, service]);
    // setAdditionalServices([...additionalServices, { ...service, isChangingStaff: false }]);
    // Hiển thị phần "Add Another Service"
    // setIsBookingModalVisible(true);
    // setShowServiceList(true);
    const isServiceAlreadySelected = additionalServices.some(
      (s) => s.name === service.name
    );

    if (isServiceAlreadySelected) {
      // Hiển thị thông báo nếu dịch vụ đã được chọn
      message.warning("Dịch vụ này đã được chọn trước đó.");
      // Hoặc sử dụng Ant Design message component
      // message.warning("Dịch vụ này đã được chọn trước đó.");
    } else {
      // Thêm dịch vụ vào mảng additionalServices nếu chưa được chọn
      setAdditionalServices([...additionalServices, service]);
      // Hiển thị phần "Add Another Service"
      setIsBookingModalVisible(true);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff); // Hàm để cập nhật selectedStaff
  };

  const handleServiceSelect = (service) => {
    // if (additionalServices.includes(service)) {
    //   setAdditionalServices(additionalServices.filter((s) => s !== service));
    // } else {
    //   setAdditionalServices([...additionalServices, service]);
    // }
    if (additionalServices.some((s) => s.name === service.name)) {
      // Nếu dịch vụ đã tồn tại, loại bỏ nó khỏi danh sách
      setAdditionalServices(
        additionalServices.filter((s) => s.name !== service.name)
      );
    } else {
      // Nếu dịch vụ chưa tồn tại, thêm nó vào danh sách
      setAdditionalServices([...additionalServices, service]);
    }
  };

  const calculateTotal = () => {
    const mainServicePrice =
      parseFloat(selectedService?.price.replace("$", "")) || 0;
    const additionalServicesPrice = additionalServices.reduce(
      (total, service) => {
        return total + parseFloat(service.price.replace("$", ""));
      },
      0
    );
    return mainServicePrice + additionalServicesPrice;
  };

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

  const handleModalOk = (staff) => {
    setAdditionalServices((prevServices) =>
      prevServices.map((s) =>
        s.name === currentService.name ? { ...s, staff } : s
      )
    );
    setIsModalVisible(false);
    setCurrentService(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentService(null);
  };

  // const handleChangeStaff = (service, newStaff) => {
  //   setAdditionalServices((prevServices) =>
  //     prevServices.map((s) => (s === service ? { ...s, staff: newStaff } : s))
  //   );

  // };

  const handleChangeStaff = (service) => {
    setCurrentService(service);
    setIsModalVisible(true);
  };
  console.log("addService", additionalServices);

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
                              <Button
                                type="primary"
                                key="book"
                                onClick={() => handleBookClick(service)}
                              >
                                Book
                              </Button>,
                            ]}
                          >
                            <List.Item.Meta
                              title={
                                <span
                                  style={{
                                    fontSize: "1.3rem",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setIsBookingModalVisible(true)}
                                >
                                  {service.name}
                                </span>
                              }
                              description={`${service.price} vnđ • ${service.duration}`}
                            />
                          </List.Item>
                        )}
                        style={{ backgroundColor: "transparent" }}
                      />
                    </Panel>
                  </Collapse>
                </div>
                <div>
                  <Modal
                    title="Book Service"
                    visible={isBookingModalVisible}
                    onCancel={() => {
                      setIsBookingModalVisible(false);
                      setShowServiceList(false);
                    }}
                    footer={null}
                    width={800}
                  >
                    {showServiceList ? (
                      // <div>
                      //   <Title level={4}>Select Additional Services</Title>
                      //   <List
                      //     itemLayout="horizontal"
                      //     dataSource={services}
                      //     renderItem={(service, index) => (
                      //       <List.Item
                      //         key={index} // Thêm thuộc tính key
                      //         actions={[
                      //           <Checkbox
                      //             key={`checkbox-${index}`} // Thêm thuộc tính key cho Checkbox
                      //             checked={additionalServices.includes(service.name)}
                      //             onChange={() => handleServiceSelect(service)}
                      //           >
                      //             Add
                      //           </Checkbox>,
                      //         ]}
                      //       >
                      //         <List.Item.Meta
                      //           title={
                      //             <span
                      //               style={{
                      //                 fontSize: "1.3rem",
                      //               }}
                      //             >
                      //               {service.name}
                      //             </span>
                      //           }
                      //           description={`${service.price} • ${service.duration}`}
                      //         />
                      //       </List.Item>
                      //     )}
                      //     style={{ backgroundColor: "transparent" }}
                      //   />
                      //   <Button
                      //     type="dashed"
                      //     block
                      //     style={{ marginTop: "16px" }}
                      //     onClick={() => setShowServiceList(false)}
                      //   >
                      //     Back to Booking
                      //   </Button>
                      // </div>
                      <div>
                        <Title level={4}>Select Additional Services</Title>
                        <List
                          itemLayout="horizontal"
                          dataSource={services}
                          renderItem={(service, index) => {
                            // Kiểm tra nếu dịch vụ đã được chọn
                            const isChecked = additionalServices.some(
                              (s) => s.name === service.name
                            );

                            return (
                              <List.Item
                                key={index} // Thêm thuộc tính key
                                actions={[
                                  <Checkbox
                                    key={`checkbox-${index}`} // Thêm thuộc tính key cho Checkbox
                                    checked={isChecked}
                                    onChange={() =>
                                      handleServiceSelect(service)
                                    }
                                  >
                                    Add
                                  </Checkbox>,
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
                            );
                          }}
                          style={{ backgroundColor: "transparent" }}
                        />
                        <Button
                          type="dashed"
                          block
                          style={{ marginTop: "16px" }}
                          onClick={() => setShowServiceList(false)}
                        >
                          Back to Booking
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Divider />
                        <div className="scroll-container">
                          <button
                            className="arrow-button"
                            onClick={() =>
                              handleScroll("left", dateContainerRef)
                            }
                          >
                            <LeftOutlined />
                          </button>
                          <div
                            className="scroll-wrapper"
                            ref={dateContainerRef}
                          >
                            <div className="scroll-content">
                              {currentMonthDays.map((day, index) => (
                                <Button
                                  key={index}
                                  onClick={() => handleDateSelect(day)}
                                  className={
                                    selectedDate &&
                                    selectedDate.toDateString() ===
                                      day.toDateString()
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  {day.toDateString().slice(0, 10)}
                                </Button>
                              ))}
                            </div>
                          </div>
                          <button
                            className="arrow-button"
                            onClick={() =>
                              handleScroll("right", dateContainerRef)
                            }
                          >
                            <RightOutlined />
                          </button>
                        </div>
                        <Divider />

                        {selectedDate && (
                          <>
                            <div className="time-picker">
                              <div className="time-selector">
                                <Button
                                  onClick={() =>
                                    setTimeSlots(generateTimeSlots(8, 12, 15))
                                  }
                                  className={
                                    timeSlots.length &&
                                    timeSlots[0].getHours() === 8
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  Morning
                                </Button>
                                <Button
                                  onClick={() =>
                                    setTimeSlots(generateTimeSlots(13, 17, 15))
                                  }
                                  className={
                                    timeSlots.length &&
                                    timeSlots[0].getHours() === 13
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  Afternoon
                                </Button>
                                <Button
                                  onClick={() =>
                                    setTimeSlots(generateTimeSlots(19, 22, 15))
                                  }
                                  className={
                                    timeSlots.length &&
                                    timeSlots[0].getHours() === 19
                                      ? "selected"
                                      : ""
                                  }
                                >
                                  Evening
                                </Button>
                              </div>
                              {timeSlots.length > 0 && (
                                <>
                                  <Divider />
                                  <div className="scroll-container">
                                    <button
                                      className="arrow-button"
                                      onClick={() =>
                                        handleScroll("left", timeContainerRef)
                                      }
                                    >
                                      <LeftOutlined />
                                    </button>
                                    <div
                                      className="scroll-wrapper"
                                      ref={timeContainerRef}
                                    >
                                      <div className="scroll-content">
                                        {timeSlots.map((slot, index) => (
                                          <Button
                                            key={index}
                                            onClick={() =>
                                              handleTimeSlotSelect(slot)
                                            }
                                            className={
                                              selectedTimeSlot === slot
                                                ? "selected"
                                                : ""
                                            }
                                          >
                                            {slot.toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                    <button
                                      className="arrow-button"
                                      onClick={() =>
                                        handleScroll("right", timeContainerRef)
                                      }
                                    >
                                      <RightOutlined />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                            <Divider />
                          </>
                        )}

                        {/* {selectedTimeSlot && (
                          <>
                            <Select
                              placeholder="Select a staff"
                              style={{ width: "100%" }}
                              onChange={handleStaffSelect}
                            >
                              <Option value="staff1">Staff 1</Option>
                              <Option value="staff2">Staff 2</Option>
                              <Option value="staff3">Staff 3</Option>
                            </Select>
                          </>
                        )} */}

                        {/* code form tại đây */}
                        {/* {additionalServices.length > 0 && (
                          <div>
                            <Title level={4}>Additional Services</Title>
                            <List
                              itemLayout="horizontal"
                              dataSource={additionalServices}
                              renderItem={(service) => (
                                <List.Item>
                                  <List.Item.Meta
                                    title={service.name}
                                    description={`${service.price} vnđ • ${service.duration}`}
                                  />
                                </List.Item>
                              )}
                            />
                          </div>
                        )} */}
                        {additionalServices.length > 0 && (
                          <div>
                            <Title level={4}>Additional Services</Title>
                            <List
                              itemLayout="horizontal"
                              dataSource={additionalServices}
                              renderItem={(service) => (
                                <List.Item
                                  actions={[
                                    <Button
                                      key="change"
                                      onClick={() => handleChangeStaff(service)}
                                    >
                                      Change
                                    </Button>,
                                  ]}
                                >
                                  <List.Item.Meta
                                    title={service.name}
                                    description={
                                      <>
                                        {`${service.price} vnđ • ${service.duration}`}
                                        <br />
                                        <span>
                                          Staff:{" "}
                                          {service.staff || "Not assigned"}
                                        </span>
                                      </>
                                    }
                                  />
                                  {/* {service.isChangingStaff && (
                                    <Select
                                      placeholder="Select a staff"
                                      style={{ width: "100%" }}
                                      onChange={(value) =>
                                        handleChangeStaff(service, value)
                                      }
                                    >
                                      <Option value="staff1">Staff 1</Option>
                                      <Option value="staff2">Staff 2</Option>
                                      <Option value="staff3">Staff 3</Option>
                                    </Select>
                                  )} */}
                                  <Modal
                                    title="Select a Staff"
                                    visible={isModalVisible}
                                    onOk={() => handleModalOk(selectedStaff)}
                                    onCancel={handleModalCancel}
                                  >
                                    <Select
                                      placeholder="Select a staff"
                                      style={{ width: "100%" }}
                                      onChange={setSelectedStaff}
                                    >
                                      <Option value="staff1">Staff 1</Option>
                                      <Option value="staff2">Staff 2</Option>
                                      <Option value="staff3">Staff 3</Option>
                                    </Select>
                                  </Modal>
                                </List.Item>
                              )}
                            />
                          </div>
                        )}

                        <Button
                          type="dashed"
                          block
                          style={{ marginTop: "16px" }}
                          onClick={() => setShowServiceList(true)}
                        >
                          Add Another Service
                        </Button>

                        <div style={{ marginTop: "16px" }}>
                          <Title level={4}>Total</Title>
                          <p>{calculateTotal().toFixed(2)} vnđ</p>
                          <Button type="primary" block>
                            Thanh toán
                          </Button>
                        </div>
                      </div>
                    )}
                  </Modal>
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
