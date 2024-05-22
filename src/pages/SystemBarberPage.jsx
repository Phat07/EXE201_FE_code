import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Select, Space, Empty, Button } from "antd";
import "../css/baber.css";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import Loader from "../components/Loader";
function SystemBarberPage(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  //
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
          console.log("distr", response.data);
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
  // -----------------------------------------------------------------------------------------------------------
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
    console.log("value", value);
    setSelectedProvince(value);
    setSelectedDistrict('');
    setSelectedWard("");
  };
  const handleChangeDistrict = (value) => {
    setSelectedDistrict(value);
  };
  console.log("pro", provinces);
  console.log("selected", selectedProvince);
  console.log("disstr", selectedDistrict);
  function handleSearch() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAdd(data.address));
    });
  }
  return (
    <div>
      <Header />
      {/* <div
        style={{
          width: "100vw",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="../../public/images/barber.jpeg"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
        />
      </div> */}
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
              // defaultValue="District"
              value={selectedDistrict || 'District'}
              style={{
                width: 200,
              }}
              onChange={handleChangeDistrict}
              options={selectedProvince ? districts : <Empty />}
              // disabled={!selectedProvince}
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
      <Loader/>
    </div>
  );
}

export default SystemBarberPage;
