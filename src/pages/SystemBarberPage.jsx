import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Select, Space, Empty, Button, message, Modal } from "antd";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import Loader from "../components/Loader";
import "../css/baber.css";

function SystemBarberPage(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [add, setAdd] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tinh_tp.json"
      )
      .then((response) => {
        const mapper = Object.values(response.data).map((e) => {
          return { code: e.code, value: e.name, label: e.name };
        });
        setProvinces(mapper);
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          "https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/quan_huyen.json"
        )
        .then((response) => {
          const districtsData = Object.values(response.data).filter(
            (district) => district.path.includes(selectedProvince)
          );
          const mapper = districtsData.map((e) => {
            return { value: e?.name, label: e?.name };
          });
          setDistricts(mapper);
        })
        .catch((error) => console.error("Error fetching districts:", error));
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(
          "https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/xa_phuong.json"
        )
        .then((response) => {
          const wardsData = Object.values(response.data).filter(
            (ward) => ward.parent_code === selectedDistrict
          );
          setWards(wardsData);
        })
        .catch((error) => console.error("Error fetching wards:", error));
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleChange = (value) => {
    setSelectedProvince(value);
    setSelectedDistrict('');
    setSelectedWard("");
  };

  const handleChangeDistrict = (value) => {
    setSelectedDistrict(value);
  };

  const handleSearch = () => {
    document.body.style.overflow = 'hidden'; // Disable scrolling
  
    Modal.confirm({
      title: 'Location Permission',
      content: 'Do you want to allow access to your location?',
      onOk() {
        setLoading(true); // Show loader only when 'Ok' is clicked
  
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
              fetch(url)
                .then((res) => res.json())
                .then((data) => setAdd(data.address))
                .finally(() => {
                  setLoading(false); // Hide loader on success
                  document.body.style.overflow = ''; // Enable scrolling
                });
              message.success("Thank you for enabling location services.");
            },
            (error) => {
              message.error("You have denied location access.");
              setLoading(false); // Hide loader on error
              document.body.style.overflow = ''; // Enable scrolling
            }
          );
        } else {
          message.error("Geolocation is not supported by your browser.");
          setLoading(false); // Hide loader on error
          document.body.style.overflow = ''; // Enable scrolling
        }
      },
      onCancel() {
        message.error("You have denied location access.");
        document.body.style.overflow = ''; // Enable scrolling
      }
    });
  };
  

  return (
    <div>
      <Header />
      <div className="system-salon__container">
        <div className="flex justify-between">
          <div
            className="flex"
            style={{ backgroundColor: "#1677FF", borderRadius: "10px" }}
          >
            <CiLocationOn style={{ color: "white" }} className="text-5xl" />
            <Button type="primary" onClick={handleSearch}>
              Find a salon nearby
            </Button>
          </div>
          <div>
            <Select
              defaultValue="Provinces"
              style={{
                width: 200,
              }}
              onChange={handleChange}
              options={provinces}
            />
          </div>

          <div>
            <Select
              value={selectedDistrict || 'District'}
              style={{
                width: 200,
              }}
              onChange={handleChangeDistrict}
              options={selectedProvince ? districts : <Empty />}
            />
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div>
            salon có theo tỉnh và cần api, đây là một map bộc bởi thẻ a ròi khi
            nhấn thì sẽ hiển thị nhiều salon ra và sẽ hiển thị bên map nhiều địa
            chỉ vị trí
          </div>
          <div>bản đồ</div>
          <p>
            {add.city}, {add.country}
          </p>
        </div>
      </div>
      {loading && <div className="overlay" ><Loader /></div>}
    </div>
  );
}

export default SystemBarberPage;
