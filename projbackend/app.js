require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");

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
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRouter);

//PORT
const port = process.env.PORT || 4000;

//Starting a server
app.listen(port, () => {
    console.log(`App is runnning on port ${port}`);
})
