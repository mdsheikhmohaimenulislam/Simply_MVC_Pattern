const product = require("../models/productModel");

// Business Logic

const getProducts = async (req, res) => {
  try {
    const allProducts = await product.find();

    if (!allProducts || allProducts.length === 0) {
      res.json({
        message: "There is NO Product",
      });
    }
    // if we have product >= 1
    res.status(200).json({
      Success: true,
      product: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      Success: false,
      message: "Internal Server Error",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, price, brand, stock, description, rating, image } =
      req.body;
    const newProduct = new product({
      name,
      category,
      price,
      brand,
      stock,
      description,
      rating,
      image,
    });

    await newProduct.save();
    res.status(200).json({
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      Success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, brand, stock, description } = req.body;
    const updatedProduct = await product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price,
        brand,
        stock,
        description,
      },
      { new: true }
    );

    if (!updateProduct) {
      res.json({
        message: "There is NO Product",
      });
    }

    res.status(200).json({
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      Success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.json({
        message: "Products Not found, cannot delete",
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      Success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { getProducts, updateProduct, createProduct, deleteProduct };
