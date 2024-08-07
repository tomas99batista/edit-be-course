import dotenv from "dotenv";
import express from "express";
import ordersRouter from "./orders/ordersRouter.js";
import productsRouter from "./products/productsRouter.js";
import dbService from "./db/mongo.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(productsRouter);
app.use(ordersRouter);

await dbService.initializeDb(); // Inicializa a BD

app.listen(PORT, () => {
  console.log("Server running", PORT);
});
