import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Menu = ({ user }) => {
  if (window.localStorage.getItem("User") === null) {
    window.location = "/login";
  }

  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  let price = 0;

  const selectedFromMenu = [];

  const { restaurant_id } = useParams();

  console.log(restaurant_id);
  if (restaurant_id === null || restaurant_id === undefined) {
    window.location = "/restraunts";
  }

  useEffect(() => {
    getTheMenu();
    iterateOrders();
  }, []);

  console.log("Orders: ", order);

  const iterateOrders = () => {
    setOrder(JSON.parse(window.localStorage.getItem("Order")));
  };

  const getTheMenu = async () => {
    try {
      await axios
        .get("http://localhost:3001/menu/" + restaurant_id)
        .then((res) => {
          const allMenu = res.data;
          setMenu(allMenu);
        });
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((m) => (
              <tr key={m.product_id}>
                <td>{m.product_name}</td>
                <td>{m.price}</td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    price += parseInt(m.price);
                    selectedFromMenu.push(m);
                    window.localStorage.setItem(
                      "Order",
                      JSON.stringify(selectedFromMenu)
                    );
                  }}
                >
                  Add to Cart
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container">
          <button
            className="btn btn-primary"
            onClick={() => {
              window.location = "/order_cart";
            }}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* <div className="col-sm-4">
        {window.localStorage.getItem("Order") !== null ? (
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Order</th>
              </tr>
            </thead>
            <tbody>
              {order.map((m) => (
                <tr>
                  <td>{m.product_name}</td>
                  <td>{m.price}</td>
                  <button className="btn btn-primary">Remove From Cart</button>
                  {selectedFromMenu.push(m)}
                  {(price += parseInt(m.price))}
                </tr>
              ))}
              <tr>
                <td>
                  <b>Total</b>
                </td>
                <td>
                  <b>{price}</b>
                </td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    window.location = "/order_cart";
                  }}
                >
                  Place Order
                </button>
              </tr>
            </tbody>
          </table>
        ) : null}
      </div> */}
    </div>
  );
};

export default Menu;
