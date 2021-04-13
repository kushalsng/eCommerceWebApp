const express = require("express");

const app = express();
const port= 8000;
app.get("/", (req, res) => {
    return res.send("Home Page");
});

app.get("/login", (req, res) => {
    return res.send("This will be the login page");
});

const admin = (req, res) => {
    return res.send("THis is admin")
}

const isAdmin = (req, res, next) => {
    console.log("YEs it is admin!");
    next();
}

const isloggedIn = (req, res, next) => {
    console.log("YEs I am logged in");
    next();
}

const isAPerson = (req, res) => {
    console.log("Yes I am a human not a robot");
}

app.get("/admin", isAdmin, isloggedIn, isAPerson, admin);

app.get("/signup", (req, res) => {
    return res.send("This will be the signup page");
});

app.get("/signout", (req, res) => {
    return res.send("You are signed out");
});

app.get("/kushal", (req, res) => {
    return res.send("Kushal don't uses facebook");
});

app.listen(port, () => {
    console.log("Server is up and running...");
});
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })