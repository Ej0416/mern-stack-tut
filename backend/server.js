import express from "express";
import { connectDB } from "./config/db.js";

const app = express();

app.post("/products", (req, res) => {});
// test for test_branch_commit and for merge test
app.listen(3000, () => {
    connectDB();
    console.log("server started at http://localhost:3000");
});
