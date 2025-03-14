import express from "express";
import {
    addProducts,
    deleteProduct,
    editProduct,
    getProducts,
} from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProducts);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;
