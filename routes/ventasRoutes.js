const express = require("express");
const { registrarVenta } = require("../controllers/ventasController");

const router = express.Router();

router.post("/ventas", registrarVenta);

module.exports = router;
