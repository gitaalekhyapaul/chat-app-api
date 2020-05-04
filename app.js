require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app =express();

const chatRoutes = require("./routes/chat");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI).then(result => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server Listening on Port ${process.env.PORT}`);
    });
}).catch(err => console.log(err));