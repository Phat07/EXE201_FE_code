import React, { useEffect, useState } from "react";
import {
  List,
  Avatar,
  Image,
  Button,
  Flex,
  Modal,
  message,
  Popconfirm,
  Typography,
} from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { BsPeople } from "react-icons/bs";
import AddEmployeeForm from "../components/SalonShop/EmployeeForm";

function ListBarberEmployees() {
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [employeesList, setEmployeesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const EMPLOYEES_URL =
    "https://664db6b2ede9a2b556548a08.mockapi.io/api/salon/SalonEmployees/";
  const [page, setPage] = useState(1);
  const limit = 5;
  const [concatList, setConcatList] = useState([]);
  // const messageAddSuccess = message.success("Employee has been added!!!");

  useEffect(() => {
    axios.get(EMPLOYEES_URL + `?page=${page}&limit=${limit}`).then((res) => {
      setEmployeesList(res.data);
      setIsLoading(false);
      console.log(res.data, "EmployeeList");
    });
  }, [concatList]); //New employee added, useEffect will be re-render to show data

  const onLoadMore = () => {
    const nextPage = page + 1;
    setTimeout(() => {
      axios
        .get(EMPLOYEES_URL + `?page=${nextPage}&limit=${limit}`)
        .then((res) => {
          // const nextData = employeesList.concat(res.data);
          const concatData = [...employeesList, ...res.data];
          setEmployeesList(concatData);
          setPage(nextPage);
          window.dispatchEvent(new Event("resize"));
        });
    }, 1000);
  };

  //delete employee
  const handleDelete = (employee) => {
    const employeeDeleted = employeesList.find(({ id }) => {
      // { id } constructuring id from employeeList
      if (id === employee.id) {
        return id;
      }
    });
    axios.delete(EMPLOYEES_URL + `${employeeDeleted.id}`).then((res) => {
      const updatedEmployeeList = employeesList.filter(
        (emp) => emp.id !== employeeDeleted.id
      );
      setEmployeesList(updatedEmployeeList);
      message.success("Employee was deleted!");
      console.log(res.status);
      // setTimeout(() => {
      //   setEmployeesList(updatedEmployeeList);
      //   message.success("Employee was deleted!");
      //   console.log(res.status);
      // }, 1000);
    });
  };

  const showAddEmployeeModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("Your employee is adding...");
    // message;
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    console.log(employeesList, "Employee List");
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
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
        <Flex className="pb-3" justify="flex-end" align="center">
          <Button
            icon={<UserAddOutlined />}
            type="primary"
            onClick={showAddEmployeeModal}
          >
            Add Employee
          </Button>
          <Modal
            width={2000}
            title="Create new employee"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button key="sumit" onClick={handleOk}>
                submit
              </Button>,
            ]}
          >
            <AddEmployeeForm
              isReset={(e) => {
                setReset(e);
              }}
              isOpen={(e) => {
                setOpen(e); //e is False from EmployeeForm component pass value to ListBarberEmployees
              }}
              onAddEmployees={(employee) => {
                // const newEmployeeList = employeesList.concat(employee);
                const concatNewData = [...employeesList, ...employee];
                setEmployeesList(concatNewData);
                setConcatList(concatNewData);
                setOpen(false);
              }}
            />
          </Modal>
        </Flex>
        <List
          // loadMore={onLoadMore}
          loading={isLoading}
          itemLayout="horizontal"
          dataSource={employeesList}
          renderItem={(item) => (
            <>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Flex
                      gap={item.id < 10 ? "middle" : "small"}
                      justify="cetner"
                      align="center"
                    >
                      <Typography.Text strong>{item.id}</Typography.Text>
                      <Avatar src={item.avatar} />
                    </Flex>
                  }
                  title={item.fullName}
                  description={item.email}
                />
                <Link to={`/account_details/${item.id}`}>
                  <Button icon={<EditOutlined />} type="text">
                    Edit
                  </Button>
                </Link>
                <Popconfirm
                  title="Delete employee"
                  description="Are you sure to delete this employee?"
                  onConfirm={() => handleDelete(item)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} danger>
                    Delete
                  </Button>
                </Popconfirm>
              </List.Item>
            </>
          )}
        />
        <Flex justify="center" align="center">
          {employeesList && !isLoading && (
            <Button icon={<PlusCircleOutlined />} onClick={onLoadMore}>
              More
            </Button>
          )}
        </Flex>
      </div>
    </>
  );
}

export default ListBarberEmployees;
