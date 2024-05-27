import { useParams } from "react-router-dom";
import AccountForm from "./AccountForm";
import { useEffect, useState } from "react";
import axios from "axios";

function AccountPage() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const EMPLOYEES_URL =
    "https://664db6b2ede9a2b556548a08.mockapi.io/api/salon/SalonEmployees";

  useEffect(() => {
    axios.get(EMPLOYEES_URL).then((res) => {
      console.log(res.data[id]);
      setUser(res.data[id]);
    });
  }, [id]);

  return (
    <div>
      <div
        style={{
          marginTop: "175px",
          marginLeft: "250px",
          marginRight: "250px",
        }}
      >
        <AccountForm id={id} user={user} />
      </div>
    </div>
  );
}

export default AccountPage;
