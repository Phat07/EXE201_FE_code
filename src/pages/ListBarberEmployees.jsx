import React, { useEffect, useState } from "react";
import { List, Avatar, Image, Button, Flex } from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

function ListBarberEmployees() {
  const [employeesList, setEmployeesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const EMPLOYEES_URL =
    "https://664db6b2ede9a2b556548a08.mockapi.io/api/salon/SalonEmployees";
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    axios.get(EMPLOYEES_URL + `?page=${page}&limit=${limit}`).then((res) => {
      setEmployeesList(res.data);
      setIsLoading(false);
      console.log(res.data, "EmployeeList");
    });
  }, []);

  const onLoadMore = () => {
    const nextPage = page + 1;
    setTimeout(() => {
      axios.get(EMPLOYEES_URL + `?page=${page}&limit=${limit}`).then((res) => {
        const nextData = employeesList.concat(res.data);
        setEmployeesList(nextData);
        setPage(nextPage);
        window.dispatchEvent(new Event("resize"));
      });
    }, 1000);
  };
  return (
    <>
      <div
        style={{
          marginTop: "175px",
          marginLeft: "250px",
          marginRight: "250px",
        }}
      >
        <List
          // loadMore={onLoadMore}
          loading={isLoading}
          itemLayout="horizontal"
          dataSource={employeesList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.fullName}
                description={item.email}
              />
              <Link to={`/account_details/${item.id}`}>
                <Button icon={<EditOutlined />} type="text">
                  Edit
                </Button>
              </Link>
              <Button icon={<DeleteOutlined />} danger>
                Delete
              </Button>
            </List.Item>
          )}
        />
        <Flex justify="center" align="center">
          {employeesList && !isLoading && (
            <Button onClick={onLoadMore}>Load More</Button>
          )}
        </Flex>
      </div>
    </>
  );
}

export default ListBarberEmployees;
