import React, { useState, useEffect } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import { getProducts } from "./helper/coreapicalls";
import StripeCheckout from "./helper/StripeCheckout";
import Paymentb from "./Paymentb";


const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load Product</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addtoCart={false}
            removeFromCart={true}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </div>
    );
  };
  //   const loadCheckout = () => {
  //     return (
  //       <div>
  //         <h2>This section is for Checkout</h2>
  //       </div>
  //     );
  //   };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No product in cart</h3>
          )}
        </div>
        <div className="col-6">
          <Paymentb products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
