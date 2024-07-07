import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PlacedOrders = () => {
  const [order, setOrders] = useState([]);

  if (window.localStorage.getItem("User") === null) {
    window.location = "/login";
  }

  if (window.localStorage.getItem("User") === null) {
    window.location = "/login";
  }

  useEffect(() => {
    getTheMenu();
  }, []);

  const getTheMenu = async () => {
    await axios
      .get(
        "http://localhost:3001/getOrders/" +
          JSON.parse(window.localStorage.getItem("User")).email_address
      )
      .then((res) => {
        const allOrders = res.data.orders;
        setOrders(allOrders);
      });
  };

  const changeOrders = async (order_no, order) => {
    await axios.post("http://localhost:3001/changeOrders", { order_no, order });
  };

  return (
    <div className="container">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Products</th>
              <th>Price</th>
              <th>order_date</th>
              <th>order_status</th>
              <th>order_completion_date</th>
            </tr>
          </thead>
          <tbody>
            {order.map((m) => (
              <tr key={m.order_no}>
                <td>{m.order_no}</td>
                <td>
                  {m.product_name.map((p) => (
                    <p>{p}</p>
                  ))}
                </td>
                <td>
                  {m.amount.map((p) => (
                    <p>{p}</p>
                  ))}
                </td>
                <td>{m.order_date}</td>
                <td>{m.order_status}</td>
                <td>{m.order_completion_date}</td>
                {m.order_status === "Completed" ? null : (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      changeOrders(m.order_no, m);
                    }}
                  >
                    Received
                  </button>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacedOrders;
