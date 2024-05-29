import React, { useRef, useState } from "react";
import Header from "../components/Header";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Input,
  List,
  Menu,
  Pagination,
  Rate,
  Row,
} from "antd";
import {
  ClockCircleOutlined,
  EnvironmentFilled,
  EnvironmentOutlined,
  HeartOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../css/ListSalon.css";

const { Meta } = Card;

const location = {
  area: "HCM City",
  number: "115",
};

const salonData = [
  {
    name: "OMAR KINGSMEN BARBER ",
    address: "960 Lincoln Hwy, Schererville, 46375",
    rating: 5.0,
    reviews: 509,
    recommend: true,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "LEO KINGSMEN BARBER",
    address: "960 Lincoln Hwy, Schererville, 46375",
    rating: 4.9,
    reviews: 187,
    recommend: false,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "Sergio Mendoza KINGSMEN BARBER",
    address: "142 E US-30 Highway, Schererville, 46375",
    rating: 5.0,
    reviews: 176,
    recommend: false,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "Scottyt KINGSMEN BARBER",
    address: "960 W US",
    rating: 4.5,
    reviews: 0,
    recommend: true,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "OMAR KINGSMEN BARBER ",
    address: "960 Lincoln Hwy, Schererville, 46375",
    rating: 5.0,
    reviews: 509,
    recommend: true,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "LEO KINGSMEN BARBER",
    address: "960 Lincoln Hwy, Schererville, 46375",
    rating: 4.9,
    reviews: 187,
    recommend: false,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "Sergio Mendoza KINGSMEN BARBER",
    address: "142 E US-30 Highway, Schererville, 46375",
    rating: 5.0,
    reviews: 176,
    recommend: false,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "Scottyt KINGSMEN BARBER",
    address: "960 W US",
    rating: 0,
    reviews: 0,
    recommend: true,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "OMAR KINGSMEN BARBER ",
    address: "960 Lincoln Hwy, Schererville, 46375",
    rating: 5.0,
    reviews: 509,
    recommend: true,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "LEO KINGSMEN BARBER",
    address: "960 Lincoln Hwy, Schererville, 46375",
    rating: 4.9,
    reviews: 187,
    recommend: false,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "Sergio Mendoza KINGSMEN BARBER",
    address: "142 E US-30 Highway, Schererville, 46375",
    rating: 5.0,
    reviews: 176,
    recommend: false,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "Scottyt KINGSMEN BARBER",
    address: "960 W US",
    rating: 0,
    reviews: 0,
    recommend: true,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "OMAR KINGSMEN BARBER ",
    address: "960 Lincoln Hwy, Schererville, 46375",
    rating: 5.0,
    reviews: 509,
    recommend: true,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "LEO KINGSMEN BARBER",
    address: "960 Lincoln Hwy, Schererville, 46375",
    rating: 4.9,
    reviews: 187,
    recommend: false,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "Sergio Mendoza KINGSMEN BARBER",
    address: "142 E US-30 Highway, Schererville, 46375",
    rating: 5.0,
    reviews: 176,
    recommend: false,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
  {
    name: "Scottyt KINGSMEN BARBER",
    address: "960 W US",
    rating: 5.0,
    reviews: 20,
    recommend: true,
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg",
  },
];

function ListSalon(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentSalons = salonData.slice(startIndex, startIndex + pageSize);

  const recommendedSalons = salonData.filter((salon) => salon.recommend);

  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const enableLocation = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<EnvironmentFilled style={{ color: "#00bcd4" }} />}
      >
        Enable location access
      </Menu.Item>
    </Menu>
  );

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
      <div style={{ marginLeft: "20rem", fontFamily: "Ariel", color: "black" }}>
        <div className="search-container">
          <Row gutter={16} style={{ width: "100%" }}>
            <Col span={8}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search services or businesses"
                size="large"
                className="search-input"
              />
            </Col>
            <Col span={8}>
              <Dropdown overlay={enableLocation} trigger={["click"]}>
                <Input
                  prefix={<EnvironmentOutlined />}
                  placeholder="Where?"
                  size="large"
                  className="search-input"
                />
              </Dropdown>
            </Col>
            <Col span={8}>
              <DatePicker
                suffixIcon={<ClockCircleOutlined />}
                placeholder="When?"
                size="large"
                className="search-input"
                style={{ width: "60%" }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "3.5rem" }}>
            Barbers near me in {location.area} | More Than ({location.number})
          </h1>
          <p>
            What affects the search results? <InfoCircleOutlined />
          </p>
        </div>
        <div className="carousel-container">
          <button className="arrow-button" onClick={() => handleScroll("left")}>
            <LeftOutlined />
          </button>
          <div className="scroll-wrapper" ref={scrollContainerRef}>
            <div className="scroll-content">
              {recommendedSalons.map((item, index) => (
                <Card
                  key={index}
                  cover={<img alt={item.name} src={item.image} />}
                  actions={[<HeartOutlined key="heart" />]}
                >
                  <Meta
                    title={
                      <>
                        <span className="card-title">{item.name}</span>
                      </>
                    }
                    description={
                      <>
                        <Rate
                          disabled
                          defaultValue={item.rating}
                          style={{ fontSize: 14 }}
                        />{" "}
                        {item.reviews} reviews
                        <br />
                        <EnvironmentOutlined /> {item.address}
                      </>
                    }
                    style={{ height: "8rem" }}
                  />
                </Card>
              ))}
            </div>
          </div>
          <button
            className="arrow-button"
            onClick={() => handleScroll("right")}
          >
            <RightOutlined />
          </button>
        </div>
        <div style={{ width: "148.5rem" }}>
          <Divider />
        </div>
        <div style={{ width: "148.5rem" }}>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={currentSalons}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  cover={<img alt={item.name} src={item.image} />}
                >
                  <Meta
                    title={item.name}
                    description={
                      <>
                        <Rate disabled defaultValue={item.rating} />
                        <p>{item.reviews} reviews</p>
                        <p>
                          <EnvironmentOutlined /> {item.address}
                        </p>
                      </>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={salonData.length}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "2rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ListSalon;
