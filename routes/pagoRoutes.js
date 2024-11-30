const express = require("express");
const router = express.Router();
const {
  createPago,
  getPagosByCredito,
} = require("../controllers/pagoController");

// Registrar un pago
router.post("/pagos", createPago);

// Obtener pagos por crédito
router.get("/pagos/:creditoId", getPagosByCredito);

module.exports = router;
