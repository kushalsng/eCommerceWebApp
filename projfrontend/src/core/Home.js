import React, {useState, useEffect} from "react";
import { API } from "../backend";
import "../styles.css"
import Base from './Base';
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";





const Home = () => {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const loadAllProduct = () => {
    getProducts().then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  useEffect(() => {
    loadAllProduct()
  }, [])

  return (
    <Base title="Home Page" description="Welcome to the T-shirt store">
      <div className="row">
        <h1 className="text-white">All of tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card
                product={product}
                addtoCart={true}
                />
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
