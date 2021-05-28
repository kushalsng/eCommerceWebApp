require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentb.js");
const stripeRoutes = require("./routes/stripepayment");

const app = express();

//DB connection
mongoose.connect(process.env.DBCONNECT,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("DB CONNECTED");
});

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//My Routes 
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);
app.use("/api", stripeRoutes);


//PORT
const port = process.env.PORT || 4000;

//Starting a server
app.listen(port, () => {
    console.log(`App is runnning on port ${port}`);
})
