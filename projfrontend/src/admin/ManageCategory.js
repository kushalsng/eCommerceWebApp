import React from "react";
import Base from "../core/Base";


const ManageCategory = () => {
  return (
    <Base
      title="Create Category"
      description="A pLace to create category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-7 offset-md-2">
            <h3>Category 1</h3>
        </div>
        <div className="col-md-1">
            <input className="form-check-input" type="checkbox" name="" id="" />
        </div>
        <div className="col-md-7 offset-md-2">
            <h3>Category 1</h3>
        </div>
        <div className="col-md-1">
            <input className="form-check-input" type="checkbox" name="" id="" />
        </div>
        <div className="col-md-7 offset-md-2">
            <h3>Category 1</h3>
        </div>
        <div className="col-md-1">
            <input className="form-check-input" type="checkbox" name="" id="" />
        </div>
      </div>
    </Base>
  );
};

export default ManageCategory;
