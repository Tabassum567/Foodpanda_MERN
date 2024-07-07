import React, { useState, useEffect } from "react";
import axios from "axios";

const Restaurant = () => {
  if (window.localStorage.getItem("User") === null) {
    window.location = "/login";
  }
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    getTheRestaurant();
  }, []);

  const getTheRestaurant = async () => {
    try {
      await axios.get("http://localhost:3001/restraunts").then((res) => {
        const allRestaurant = res.data;
        setRestaurant(allRestaurant);
      });
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Restraunt ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {restaurant.map((item) => (
            <tr key={item.restaurant_id}>
              <a href={"/menu/" + item.restaurant_id.toString()}>
                <td>{item.restaurant_id}</td>
              </a>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Restaurant;
