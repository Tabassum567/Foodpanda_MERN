import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersCart = () => {
  if (window.localStorage.getItem("User") === null) {
    window.location = "/login";
  }

  if (window.localStorage.getItem("Order") === null) {
    alert("Cart is Empty");
    window.location = "/restraunts";
  }

  var today = new Date();
  const [cartOrder, setCartOrder] = useState([]);

  const [order, setOrder] = useState({
    order_no: makeid(6),
    product_id: [],
    product_name: [],
    address: "",
    credit_card: "",
    email_address: JSON.parse(window.localStorage.getItem("User"))
      .email_address,
    amount: [],
    order_date: today.getTime(),
    order_status: "Pending",
    order_completion_date: today.getTime() + 500000,
  });

  let price = 0;

  useEffect(() => {
    setCartOrder(JSON.parse(window.localStorage.getItem("Order")));
    // if (cartOrder.length !== 0) {
    for (
      let index = 0;
      index < JSON.parse(window.localStorage.getItem("Order")).length;
      index++
    ) {
      order.product_id.push(
        JSON.parse(window.localStorage.getItem("Order"))[index].product_id
      );

      order.amount.push(
        JSON.parse(window.localStorage.getItem("Order"))[index].price
      );
      console.log(
        "Product Name: ",
        JSON.parse(window.localStorage.getItem("Order"))[index].product_name
      );
      order.product_name.push(
        JSON.parse(window.localStorage.getItem("Order"))[index].product_name
      );
    }
    // }
  }, []);

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const placeOrder = () => {
    try {
      const { address, credit_card } = order;
      if (address && credit_card) {
        axios.post("http://localhost:3001/placeOrder", order).then((res) => {
          alert(res.data.message);
          window.localStorage.removeItem("Order");
          window.location = "/restraunts";
        });
      } else {
        alert("Please Fill Address and Credit Card Information");
      }
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order, // Spread Operator (...)
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartOrder !== null
              ? cartOrder.map((m) => (
                  <tr>
                    <td>{m.product_name}</td>
                    <td>{m.price}</td>

                    <td style={{ display: "none" }}>
                      {" "}
                      {(price += parseInt(m.price))}
                    </td>
                  </tr>
                ))
              : null}
            <tr>
              <td>
                <b>Total</b>
              </td>
              <td>
                <b>{price}</b>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    window.localStorage.removeItem("Order");
                  }}
                >
                  Empty Cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row">
        <label htmlFor="address">Address</label>
        <input
          name="address"
          value={order.address}
          type="text"
          className="form-control"
          id="address"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="credit_card">Credit Card</label>
        <input
          name="credit_card"
          value={order.credit_card}
          type="text"
          className="form-control"
          id="credit_card"
          onChange={handleChange}
          required
        />

        <br />
        <button className="btn btn-primary" onClick={placeOrder}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrdersCart;
