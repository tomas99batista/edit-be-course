import express from "express";
import productsService from "./productsService.js";
import productsSchemas from "./productsSchemas.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  const name = req.query.name;

  if (name) {
    const products = await productsService.getProductsByName(name);
    return res.status(200).json(products);
  }

  const products = await productsService.getProducts();
  res.json(products);
});

router.post("/products", async (req, res) => {
  const {error, value} = productsSchemas.createProductSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  const updatedProductsList = await productsService.createProduct(value);
  res.json(updatedProductsList);
});

// TODO: Editar um produto existente
router.put("/products/:id", (req, res) => {
  const updatedProducts = productsService.updateProduct(
    req.params.id,
    req.body
  );
  res.json(updatedProducts);
});

router.delete("/products/:id", (req, res) => {
  const updatedProducts = productsService.deleteProduct(req.params.id);
  res.json(updatedProducts);
});

export default router;
