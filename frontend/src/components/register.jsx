import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  if (window.localStorage.getItem("User") !== null) {
    window.location = "/restraunts";
  }

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    gender: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, // Spread Operator (...)
      [name]: value,
    });
  };

  const register = () => {
    try {
      const {
        first_name,
        last_name,
        email_address,
        gender,
        password,
        reEnterPassword,
      } = user;
      if (
        first_name &&
        last_name &&
        email_address &&
        gender &&
        password &&
        reEnterPassword &&
        password === reEnterPassword
      ) {
        axios.post("http://localhost:3001/register", user).then((res) => {
          if (res.status === 200) {
            alert(res.data.message);
            window.location = "/login";
          } else if (res.status === 500) {
            alert(res.data.message);
          }
        });
      } else {
        alert("Missing Fields");
      }
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <label htmlFor="first_name">First Name</label>
        <input
          name="first_name"
          value={user.first_name}
          type="text"
          className="form-control"
          id="first_name"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="last_name">Last Name</label>
        <input
          name="last_name"
          value={user.last_name}
          type="text"
          className="form-control"
          id="last_name"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email_address">Email Address</label>
        <input
          name="email_address"
          value={user.email_address}
          type="email"
          className="form-control"
          id="email_address"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="gender">Gender</label>
        <input
          name="gender"
          value={user.gender}
          type="text"
          className="form-control"
          id="gender"
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          value={user.password}
          type="password"
          className="form-control"
          id="password"
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="reEnterPassword">Re-Enter Password</label>
        <input
          name="reEnterPassword"
          value={user.reEnterPassword}
          type="password"
          className="form-control"
          id="reEnterPassword"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button className="btn btn-primary" onClick={register}>
          Register
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            window.location = "/login";
          }}
        >
          LogIn
        </button>
      </div>
    </div>
  );
};

export default Register;
