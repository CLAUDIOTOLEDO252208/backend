const express = require("express");
const router = express.Router();
const asesorController = require("../controllers/asesorController");

// Crear un nuevo asesor
router.post("/", asesorController.crearAsesor);

// Obtener todos los asesores
router.get("/", asesorController.obtenerAsesores);

// Obtener un asesor por ID
router.get("/:id", asesorController.obtenerAsesorPorId);

// Actualizar un asesor por ID
router.put("/:id", asesorController.actualizarAsesor);

// Eliminar un asesor por ID
router.delete("/:id", asesorController.eliminarAsesor);

module.exports = router;
