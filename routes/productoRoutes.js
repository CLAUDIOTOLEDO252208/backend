const express = require("express");
const router = express.Router();

const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  toggleEstadoProducto,
  searchProductos,
} = require("../controllers/productoController");

// CRUD de productos
router.get("/", getProductos); // Listar todos los productos
router.get("/:id", getProductoById); // Obtener un producto por ID
router.post("/", createProducto); // Crear producto
router.put("/:id", updateProducto); // Editar producto
router.delete("/:id", deleteProducto); // Eliminar producto
router.patch("/:id/toggle-estado", toggleEstadoProducto); // Cambiar estado

// Búsquedas
router.get("/buscar/rubro/:rubro", searchProductos); // Buscar por rubro
router.get("/buscar", searchProductos); // Buscar por descripción o código

module.exports = router;
