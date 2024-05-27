import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Select, Empty, Button, message, Modal } from "antd";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import Loader from "../components/Loader";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";
import "../css/baber.css";

const mapContainerStyle = {
  height: "500px",
  width: "600px",
};

const defaultCenter = {
  lat: 10.8231, // Default to Ho Chi Minh City
  lng: 106.6297,
};

const sampleSalons = [
  {
    id: 1,
    name: "Salon A",
    latitude: 10.7769,
    longitude: 106.7009,
    address: "123 Salon Street, District 1, Ho Chi Minh City",
    image: "https://example.com/salon_a_image.jpg",
  },
  {
    id: 2,
    name: "Salon B",
    latitude: 10.7815,
    longitude: 106.7025,
    address: "456 Salon Street, District 3, Ho Chi Minh City",
    image: "https://example.com/salon_b_image.jpg",
  },
  {
    id: 3,
    name: "Salon C",
    latitude: 10.787,
    longitude: 106.7002,
    address: "789 Salon Street, District 5, Ho Chi Minh City",
    image: "https://example.com/salon_c_image.jpg",
  },
  // Add more salons as needed
];

function SystemBarberPage(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [salons, setSalons] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);

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
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleChangeDistrict = (value) => {
    setSelectedDistrict(value);
  };

  const handleSearch = () => {
    document.body.style.overflow = "hidden"; // Disable scrolling

    Modal.confirm({
      title: "Location Permission",
      content: "Do you want to allow access to your location?",
      onOk() {
        setLoading(true); // Show loader only when 'Ok' is clicked

        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              setCurrentLocation({ lat: latitude, lng: longitude });
              fetchNearbySalons(latitude, longitude);
              const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
              fetch(url)
                .then((res) => res.json())
                .then((data) => setAdd(data.address))
                .finally(() => {
                  setLoading(false); // Hide loader on success
                  document.body.style.overflow = ""; // Enable scrolling
                });
              message.success("Thank you for enabling location services.");
            },
            (error) => {
              message.error("You have denied location access.");
              setLoading(false); // Hide loader on error
              document.body.style.overflow = ""; // Enable scrolling
            }
          );
        } else {
          message.error("Geolocation is not supported by your browser.");
          setLoading(false); // Hide loader on error
          document.body.style.overflow = ""; // Enable scrolling
        }
      },
      onCancel() {
        message.error("You have denied location access.");
        document.body.style.overflow = ""; // Enable scrolling
      },
    });
  };

  const fetchNearbySalons = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `/api/salons?lat=${latitude}&lng=${longitude}`
      );
      setSalons(response.data);
    } catch (error) {
      console.error("Error fetching salons", error);
    }
  };

  const handleMarkerClick = (salon) => {
    setSelectedSalon(salon);
  };

  return (
    <div>
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
              value={selectedDistrict || "District"}
              style={{
                width: 200,
              }}
              onChange={handleChangeDistrict}
              options={selectedProvince ? districts : <Empty />}
            />
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="salon-list">
            {/* {salons?.length > 0 ? (
              salons?.map((salon) => ( */}
            {sampleSalons?.length > 0 ? (
              sampleSalons?.map((salon) => (
                <div key={salon.id} className="salon-item">
                  <img src={salon.image} alt={salon.name} />
                  <div>
                    <h3>{salon.name}</h3>
                    <p>{salon.address}</p>
                    <Button>Book Now</Button>
                    <Button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${salon.latitude},${salon.longitude}`,
                          "_blank"
                        )
                      }
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <Empty description="No salons available" />
            )}
          </div>
          <div style={{ height: "500px", width: "600px" }}>
            <LoadScript googleMapsApiKey="AIzaSyDPd9amUMvfU5Ete2_iugs172kmLn1WFvo">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={currentLocation}
                zoom={10}
              >
                {sampleSalons.map((salon) => (
                  <Marker
                    key={salon.id}
                    position={{ lat: salon.latitude, lng: salon.longitude }}
                    onClick={() => handleMarkerClick(salon)}
                  />
                ))}
                {selectedSalon && (
                  <InfoWindow
                    position={{
                      lat: selectedSalon.latitude,
                      lng: selectedSalon.longitude,
                    }}
                    onCloseClick={() => setSelectedSalon(null)}
                  >
                    <div>
                      <h3>{selectedSalon.name}</h3>
                      <p>{selectedSalon.address}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <p>
          {add.city}, {add.country}
        </p>
      </div>
      {loading && (
        <div className="overlay">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default SystemBarberPage;
