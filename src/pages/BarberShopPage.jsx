import React, { useEffect, useState } from "react";
import { Steps, Button, message } from "antd";
import Header from "../components/Header";
import SalonForm from "../components/SalonShop/SalonForm";
import AddEmployeeForm from "../components/SalonShop/AddEmployeeForm";
import AddServiceForm from "../components/SalonShop/AddServiceForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Step } = Steps;
function BarberShopPage(props) {
  const { id } = useParams();
  const [current, setCurrent] = useState(0);
  const [salon, setSalon] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [salonData, setSalonData] = useState({});

  useEffect(() => {
    axios
      .get("https://664db6b2ede9a2b556548a08.mockapi.io/api/salon/salon")
      .then((res) => {
        setSalonData(res.data[0]);
        console.log(res.data[0]);
      });
  }, []);

  const handleSubmit = () => {
    message.success("Salon created successfully!");
    // Here, you can handle the form submission to your backend.
  };
  const steps = [
    {
      title: "Create Salon",
      content: (
        <SalonForm
          id={id}
          salon={salonData}
          onAddSalon={(salon) => {
            setSalon(salon);
            // setCurrent(current + 1);
            next();
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
              {emp.fullName} - {emp.address} - {emp.email} - {emp.phone} -{" "}
              {emp.gender}
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
          <Button onClick={() => setCurrent(0)}>Edit</Button>{" "}
          {/* Thêm nút "Edit" */}
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
