import React, { useEffect } from "react";
import DataBase from "../modules/DataBase";
import { Link } from "react-router-dom";
import { Button } from "./Buttons";
import gsap from "gsap";

export default function Confirmation(props) {
  const { orders, user, paymentMethod, totalAmount } = props.location.state;

  useEffect(() => {
    gsap.from(".orderAnim", { duration: 1, y: 50, opacity: 0, stagger: 0.2 });
  }, []);

  const orderSummary = orders.map((order) => (
    <div className="order-summary" key={Math.random() * 4000}>
      <h4>
        {order.amount} x {order.name}
      </h4>
      <h4>{order.amount * order.price}Kr</h4>
    </div>
  ));

  async function placeOrder() {
    const ordersTopost = orders.map((order) => ({
      name: order.name,
      amount: order.amount,
    }));
    const response = await DataBase.PostOrder(ordersTopost);
    props.setorder([]);
    props.history.push({
      pathname: `/orderMessage`,
      state: {
        orderNumber: response.id,
      },
    });
  }

  return (
    <div className="main-wrapper confirmation">
      <h1>Order details</h1>
      <section className="order-summary-personal orderAnim">
        <h2>Personal info</h2>
        <h3>Name</h3>
        <h4>{user.name}</h4>
        <h3>Phone</h3>
        <h4>{user.phone}</h4>
        <h3>Payment method</h3>
        <h4>{paymentMethod}</h4>
      </section>
      <section className="ordersumary orderAnim">
        <h2>Beers</h2>
        <div>{orderSummary}</div>
      </section>
      <section className="order-summary-total orderAnim">
        <h2>Total</h2>
        <h3>{totalAmount}Kr</h3>
      </section>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link
          to={{
            pathname: `/payment`,
          }}>
          <Button type="button" buttonStyle="btn--secondary--solid">
            Go back
          </Button>
        </Link>

        <Button
          onClick={placeOrder}
          type="button"
          buttonStyle="btn--primary--solid">
          Place Order
        </Button>
      </div>
    </div>
  );
}
