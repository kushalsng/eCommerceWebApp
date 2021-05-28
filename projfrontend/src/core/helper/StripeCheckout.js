import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import { cartEmpty, loadCart } from "./CartHelper";
import StripeCheckOutButton from "react-stripe-checkout";
import { API } from "../../backend";
import { createOrder } from "./orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((product) => {
      amount += product.price;
    });
    return amount;
  };

  const makePayment = () => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const {status} = response
      })
      .catch(console.log("error in fetching stripe"));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckOutButton
        stripeKey="pk_test_51ItWfvSDFHHS61mNxtV9bVOOqxYTc4twffhK7FGS1QPlHnOZASmJlesBL05CmCD4ct04riJcAakm5KhIko2biGl200DwJcq86k"
        token={makePayment}
        name="Buy Tshirts"
        amount={getFinalPrice() * 100}
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Checkout with Stripe</button>
      </StripeCheckOutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
