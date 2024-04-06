"use strict";
import express from "express";
import { customerRouter } from "./customers/customer.route.js";
import { productRouter } from "./products/product.route.js";
const app = express();
const PORT = 3000;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

app.use(productRouter);
app.use(customerRouter);

app.get("/", (req, res) => res.send("Server: good URL!"));

app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
