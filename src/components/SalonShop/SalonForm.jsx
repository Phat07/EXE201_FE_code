import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  TimePicker,
  Row,
  Col,
  Upload,
  Checkbox,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

const daysOfWeek = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const SalonForm = ({ onAddSalon, salon, id }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [dayOff, setDayOff] = useState({});
  const [salonData, setSalonData] = useState({});

  // useEffect(() => {
  //   axios
  //     .get("https://664db6b2ede9a2b556548a08.mockapi.io/api/salon/salon")
  //     .then((res) => {
  //       setSalonData(res.data[0]);
  //       console.log(res.data[0]);
  //     });
  // }, []);
  useEffect(() => {
    if (id && salon.img) {
      setFileList([
        { uid: "-1", name: "image.png", status: "done", url: salon.img },
      ]);
      form.setFieldsValue({
        name: salon.name,
        location: salon.address,
        description: salon.description,
        // image: salon.img,
        ...daysOfWeek.reduce((acc, day) => {
          acc[day.value] = {
            start: moment(
              salon?.listDate?.find((item) => item.day === day.value)?.from,
              "HH:mm"
            ),
            end: moment(
              salon?.listDate?.find((item) => item.day === day.value)?.to,
              "HH:mm"
            ),
          };
          return acc;
        }, {}),
      });
    }
  }, [id, salon]);

  const onFinish = (values) => {
    const { name, location, description, ...schedules } = values;
    const formattedSchedules = [];
    console.log("date", formattedSchedules);
    for (const day in schedules) {
      if (!dayOff[day]) {
        if (schedules[day]?.start && schedules[day]?.end) {
          formattedSchedules[day] = {
            start: schedules[day].start.format("HH:mm"),
            end: schedules[day].end.format("HH:mm"),
          };
        }
      } else {
        formattedSchedules[day] = {
          start: null,
          end: null,
        };
      }
    }

    const salonDataForm = {
      name,
      location,
      description,
      image: fileList,
    };
    onAddSalon(salonDataForm, formattedSchedules);
    form.resetFields();
    setFileList([]);
    setDayOff({});
    console.log(salonDataForm, formattedSchedules, "Salon Data created Form");
    message.success("Your salon is created!");
  };

  const renderTimePickers = () => {
    return daysOfWeek.map((day) => (
      <Row key={day.value} gutter={16} align="middle">
        <Col span={8}>
          <Form.Item
            name={[day.value, "start"]}
            label={`${day.label} Start`}
            rules={[
              {
                required: !dayOff[day.value],
                message: "Start time is required unless it's a day off.",
              },
            ]}
          >
            <TimePicker format="HH:mm" disabled={dayOff[day.value]} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={[day.value, "end"]}
            label={`${day.label} End`}
            rules={[
              {
                required: !dayOff[day.value],
                message: "End time is required unless it's a day off.",
              },
            ]}
          >
            <TimePicker format="HH:mm" disabled={dayOff[day.value]} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Checkbox
            onChange={(e) =>
              setDayOff({ ...dayOff, [day.value]: e.target.checked })
            }
            checked={dayOff[day.value]}
          >
            Day Off
          </Checkbox>
        </Col>
      </Row>
    ));
  };

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        // value={salonData.name}
        name="name"
        label="Salon Name"
        rules={[{ required: true }]}
      >
        <Input
          // value={salon?.id ? salon?.name : null}
          placeholder="Enter salon name"
        />
      </Form.Item>
      <Form.Item name="location" label="Location" rules={[{ required: true }]}>
        <Input placeholder="Enter location" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea placeholder="Enter description" />
      </Form.Item>
      {renderTimePickers()}
      <Form.Item name="image" label="Upload Image">
        <Upload
          multiple
          listType="picture"
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false} // Prevent automatic upload
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {fileList.map((file) => (
          <img
            key={file.uid}
            src={
              file.url ||
              (file.originFileObj
                ? URL.createObjectURL(file.originFileObj)
                : null)
            }
            alt={file.name}
            style={{
              width: "50%",
              height: "80%",
              marginTop: "10px",
              background: "cover",
            }} // Adjust size here
          />
        ))}
      </Form.Item>
      {id ? (
        <Form.Item>
        <Button type="primary" htmlType="submit">
          Edit Salon
        </Button>
      </Form.Item>
      ) : (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Salon
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default SalonForm;
