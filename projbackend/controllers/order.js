const { Order, ProductInCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Error in Order Search",
        });
      }
      req.ord = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Error in generating Order",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Error in getiing all orders",
        });
      }
      res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrder = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, updatedOrder) => {
      if (err) {
        return res.status(400).json({
          error: "Error in upating the order",
        });
      }
      res.json(updatedOrder);
    }
  );
};

// exports.deleteOrder = (req, res) => {
//     const order = req.ord;
//     ord.remove((err, removedOrder) => {
//         if(err){
//             return res.status(400).jspn({
//                 error: "Error in deleting order"
//             })
//         }
//         res.json({
//             message: `The Order ${removedOrder} is succesfully deleted!`
//         })
//     })
// }
