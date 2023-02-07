// import "dotenv/config"; // loads variables from .env file
// import express from "express";
const express = require("express");
// import * as paypal from "./paypal-api.js";
const paypal = require("./paypal-api");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config({ path: ".env" });
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// app.use(express.static("public"));

app.post("/api/orders", async (req, res) => {
  try {
    const order = await paypal.createOrder();
    console.log(order);
    res.json(order);
  } catch (err) {
    // console.log("Order is not created");
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server running");
});
