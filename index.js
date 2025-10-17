const express = require("express");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const productRoutes = require("./routes/productRoutes");

app.use(express.json());

// Load env
dotenv.config();

// Connect to Database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// => /api/product
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Product app listening on port ${port}`);
});
