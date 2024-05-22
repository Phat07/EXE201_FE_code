import React, { useState } from "react";
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

const daysOfWeek = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const SalonForm = ({ onAddSalon }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [dayOff, setDayOff] = useState({});

  const onFinish = (values) => {
    const { name, location, description, ...schedules } = values;
    const formattedSchedules = {};
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

    const salonData = { name, location, description, image: fileList };
    onAddSalon(salonData, formattedSchedules);
    form.resetFields();
    setFileList([]);
    setDayOff({});
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
      <Form.Item name="name" label="Salon Name" rules={[{ required: true }]}>
        <Input placeholder="Enter salon name" />
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
            src={URL.createObjectURL(file.originFileObj)}
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Salon
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SalonForm;
