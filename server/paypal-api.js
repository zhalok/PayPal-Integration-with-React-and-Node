// import fetch from "node-fetch";
const fetch = require("node-fetch");
// const express = require("express");
// import fetch from "node-fetch";
// const axios = require("axios");

// const { CLIENT_ID, APP_SECRET } = process.env;

const base = "https://api-m.sandbox.paypal.com";

const paypalAPI = {};

paypalAPI.createOrder = async function createOrder() {
  // console.log("Hi");
  const accessToken = await generateAccessToken();

  // console.log(accessToken);
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
    }),
  });

  return handleResponse(response);
};

paypalAPI.capturePayment = async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
};

async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  console.log(CLIENT_ID, APP_SECRET);
  // console.log(auth);
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  // const response = await axios;

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

// async function createAuth() {
//   CLIENT_ID =
//     "AdL6zjRId1MYjp8yH7yRYE7n9FTl2CS_x0NgkTrjMj20Jt2BE1p0tDk2UL1oYqE6iNSjNN7p8WhVKK4O";
//   APP_SECRET = "EIRDGS8bG6AHv5tE6GbCFaZnXPir0G1p";
//   const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");

//   // console.log(auth.split(":"));
// }

// exports.
module.exports = paypalAPI;
