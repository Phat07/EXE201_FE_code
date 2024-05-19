import axios from "axios";
import React, { useEffect, useState } from "react";
import { log } from "three/examples/jsm/nodes/Nodes.js";

function BarberShopPage(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tinh_tp.json"
      )
      .then((response) => {
        console.log("re",response);
        // const mapper = Object.values(response.data).map((e)=>{
        //   return{

        //   }
        // })
        setProvinces(Object.values(response.data))
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
            (district) => district.parent_code === selectedProvince
          );
          setDistricts(districtsData);
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
  // useEffect(() => {
  //   axios.get('https://thongtindoanhnghiep.co/api/city')
  //     .then(response => setProvinces(response.data.LtsItem))
  //     .catch(error => console.error('Error fetching provinces:', error));
  // }, []);

  // useEffect(() => {
  //   if (selectedProvince) {
  //     axios.get(`https://thongtindoanhnghiep.co/api/city/${selectedProvince}/district`)
  //       .then(response => setDistricts(response.data))
  //       .catch(error => console.error('Error fetching districts:', error));
  //   } else {
  //     setDistricts([]);
  //     setWards([]);
  //   }
  // }, [selectedProvince]);

  // useEffect(() => {
  //   if (selectedDistrict) {
  //     axios.get(`https://thongtindoanhnghiep.co/api/district/${selectedDistrict}/ward`)
  //       .then(response => setWards(response.data))
  //       .catch(error => console.error('Error fetching wards:', error));
  //   } else {
  //     setWards([]);
  //   }
  // }, [selectedDistrict]);

  // useEffect(() => {
  //   // Gọi API để lấy danh sách tỉnh/thành phố
  //   axios
  //     .get("https://portal.mic.gov.vn/addresses")
  //     .then((response) => setProvinces(response.data))
  //     .catch((error) => console.error("Error fetching provinces:", error));
  // }, []);

  // useEffect(() => {
  //   // Nếu có tỉnh/thành phố được chọn, gọi API để lấy danh sách quận/huyện
  //   if (selectedProvince) {
  //     axios
  //       .get(`https://portal.mic.gov.vn/addresses/${selectedProvince}`)
  //       .then((response) => setDistricts(response.data))
  //       .catch((error) => console.error("Error fetching districts:", error));
  //   } else {
  //     setDistricts([]);
  //     setWards([]);
  //   }
  // }, [selectedProvince]);

  // useEffect(() => {
  //   // Nếu có quận/huyện được chọn, gọi API để lấy danh sách xã/phường
  //   if (selectedDistrict) {
  //     axios
  //       .get(
  //         `https://portal.mic.gov.vn/addresses/${selectedProvince}/${selectedDistrict}`
  //       )
  //       .then((response) => setWards(response.data))
  //       .catch((error) => console.error("Error fetching wards:", error));
  //   } else {
  //     setWards([]);
  //   }
  // }, [selectedDistrict]);
  console.log("search", provinces);
  console.log("selected", selectedProvince);
  console.log("distri",districts);
  console.log("seted-di",selectedDistrict);
  console.log("wa",wards);
  return (
    <div>
      <h1>Location Selector</h1>

      <div>
        <label>
          Province:
          <select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedDistrict("");
              setSelectedWard("");
            }}
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          District:
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedWard("");
            }}
            disabled={!selectedProvince}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Ward:
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            disabled={!selectedDistrict}
          >
            <option value="">Select Ward</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default BarberShopPage;
