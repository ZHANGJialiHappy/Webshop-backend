// index.js
import express from "express";
import {
  getAllCustomers,
  postCustomer,
  login,
  getCustomer,
  putCustomer,
  deleteCustomer,
} from "./customers.controler.js";

export const customerRouter = express.Router();

// middleware specific to this route
customerRouter.use(express.json());

// route handlers
customerRouter.post("/customers", postCustomer);
customerRouter.post("/login", login);

// Only for test
customerRouter.get("/customers", getAllCustomers);

// customerRouter.get("/customers/:id", getCustomer);

// customerRouter.put("/customers/:id", putCustomer);

// customerRouter.delete("/customers/:id", deleteCustomer);
