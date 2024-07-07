import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  if (window.localStorage.getItem("User") !== null) {
    window.location = "/restraunts";
  }
  const [user, setUser] = useState({
    email_address: "",
    password: "",
  });
  const [customerData, setCustomerData] = useState([]);

  const getCustomerData = () => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    try {
      await axios.post("http://localhost:3001/login", user).then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem("User", JSON.stringify(res.data.users));

          if (window.localStorage.getItem("User") !== null) {
            var email_address = JSON.parse(
              window.localStorage.getItem("User")
            ).email_address;

            const res = axios
              .get("http://localhost:3001/customerData/" + email_address)
              .then((res) => {
                console.log("customers: ", res.data);
                window.localStorage.setItem(
                  "Customer",
                  JSON.stringify(res.data.customer)
                );
              });
          }

          window.location = "/restraunts";
        }
      });
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <label htmlFor="email_address">Email Address:</label>
        <input
          name="email_address"
          value={user.email_address}
          id="email_address"
          type="email"
          className="form-control"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          value={user.password}
          type="password"
          id="password"
          className="form-control"
          onChange={handleChange}
        />
        <br />
        <br />
        <button className="btn btn-primary" onClick={login}>
          LogIn
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            window.location = "/register";
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
