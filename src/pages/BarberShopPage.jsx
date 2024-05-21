import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import Header from "../components/Header";
import SalonForm from "../components/SalonShop/SalonForm";
import AddEmployeeForm from "../components/SalonShop/AddEmployeeForm";
import AddServiceForm from "../components/SalonShop/AddServiceForm";
import axios from "axios";

const { Step } = Steps;
function BarberShopPage(props) {
  const [current, setCurrent] = useState(0);
  const [salon, setSalon] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const handleSubmit = () => {
    message.success("Salon created successfully!");
    // Here, you can handle the form submission to your backend.
  };
  const steps = [
    {
      title: "Create Salon",
      content: (
        <SalonForm
          onAddSalon={(salon) => {
            setSalon(salon);
            // next();
          }}
        />
      ),
    },
    {
      title: "Add Employees",
      content: (
        <AddEmployeeForm
          onAddEmployees={(employees) => {
            setEmployees(employees);
            // next();
          }}
        />
      ),
    },
    {
      title: "Add Services",
      content: (
        <AddServiceForm
          onAddServices={(services) => {
            setServices(services);
            // next();
          }}
        />
      ),
    },
    {
      title: "Review & Submit",
      content: (
        <div>
          <h3>Salon Details:</h3>
          <p>Name: {salon?.name}</p>
          <p>Location: {salon?.location}</p>
          <h3>Employees:</h3>
          {employees.map((emp, index) => (
            <p key={index}>
              {emp.name} - {emp.position}
            </p>
          ))}
          <h3>Services:</h3>
          {services.map((service, index) => (
            <p key={index}>
              {service.name} - {service.price}
            </p>
          ))}
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={() => setCurrent(0)}>Edit</Button> {/* Thêm nút "Edit" */}
        </div>
      ),
    },
  ];

  const next = () => {
    // setCurrent(current + 1);
    if (current === 0) {
      // Call the create salon API
      axios
        .post("/api/salons", salon)
        .then((response) => {
          setSalon({ ...salon, id: response.data.id });
          message.success("Salon created successfully!");
          setCurrent(current + 1);
        })
        .catch((error) => {
          console.error("Error creating salon:", error);
          message.error("Failed to create salon.");
        });
    } else if (current === 1) {
      // Call the add employees API
      axios
        .post(`/api/salons/${salon.id}/employees`, { employees })
        .then(() => {
          message.success("Employees added successfully!");
          setCurrent(current + 1);
        })
        .catch((error) => {
          console.error("Error adding employees:", error);
          message.error("Failed to add employees.");
        });
    } else if (current === 2) {
      // Call the add services API
      axios
        .post(`/api/salons/${salon.id}/services`, { services })
        .then(() => {
          message.success("Services added successfully!");
          setCurrent(current + 1);
        })
        .catch((error) => {
          console.error("Error adding services:", error);
          message.error("Failed to add services.");
        });
    } else if (current === 3) {
      // Bước "Review & Submit"
      setCurrent(0); // Chuyển về bước "Create Salon" khi nhấn "Edit"
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "175px",
          // backgroundColor: "orange",
          marginLeft: "250px",
          marginRight: "250px",
        }}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BarberShopPage;
