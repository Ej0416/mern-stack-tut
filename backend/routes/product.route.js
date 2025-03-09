import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.log(`Error fetching products: ${error}`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.post("/", async (req, res) => {
    const product = req.body; // dat sent by user

    if (!product.name || !product.price || !product.image) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error(`Error in create product ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ success: false, message: "invalid prodcut id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true,
        });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const product = (await Product.findById(id)) ?? null;
    try {
        if (product) {
            await Product.findByIdAndDelete(id);
            res.status(200).json({ success: true, message: "Product deleted" });
        } else {
            throw new Error("Product not found");
        }
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});

export default router;
