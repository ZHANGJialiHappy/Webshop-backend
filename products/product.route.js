import express from "express";
import {
  getAllProducts,
  getProduct,
  getRecommedProducts,
} from "./products.controler.js";

export const productRouter = express.Router();

// middleware specific to this route
productRouter.use(express.json());

// route handlers
productRouter.get("/products", getAllProducts);

productRouter.get("/recommendproducts", getRecommedProducts);

productRouter.get("/products/:id", getProduct);

// productRouter.post("/products", postProduct);

// productRouter.put("/products/:id", putProduct);

// productRouter.delete("/products/:id", deleteProduct);
