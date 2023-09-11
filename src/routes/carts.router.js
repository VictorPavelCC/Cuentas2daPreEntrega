const { Router } = require("express");
const { cartModel } = require("../models/cart.model");
const { productModel } = require("../models/product.model")
const router = Router();

//GET
router.get("/", async (req, res) => {
  try {
    let carts = await cartModel.find().populate("products.product"); // Utilizamos populate para obtener los productos completos en cada carrito
    res.json({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los carritos" })
  }
});

router.get("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartModel.findById(cid).populate("products.product");
  
      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
  
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el carrito" });
    }
});

//PUT -  Actualizar el carrito 
router.put("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const cart = await cartModel.findById(cid);
  
      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
  
      cart.products = products || [];
      await cart.save();
  
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el carrito" });
    }
});


// Actualizar la cantidad de un producto del carrito
router.put("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartModel.findById(cid);
  
      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
  
      const products = cart.products || [];
      const productUpdate = products.find((product) => product.product == pid);
  
      if (!productUpdate) {
        return res.status(404).json({ error: "Producto no encontrado en el carrito" });
      }
  
      productUpdate.quantity = quantity;
      await cart.save();
  
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la cantidad de producto en el carrito" });
    }
});

//DELETE - Eliminar un producto específico del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartModel.findById(cid);
  
      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
  
      const products = cart.products || [];
      const updatedProducts = products.filter((product) => product.product != pid);
  
      cart.products = updatedProducts;
      await cart.save();
  
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el producto del carrito" });
    }
});

// DELETE api/carts/:cid - Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartModel.findById(cid);
  
      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
  
      cart.products = [];
      await cart.save();
  
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar todos los productos del carrito" });
    }
  });

module.exports = router;