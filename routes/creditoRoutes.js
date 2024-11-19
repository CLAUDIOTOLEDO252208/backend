const express = require("express");
const router = express.Router();
const Credito = require("../models/Credito");
const creditoController = require("../controllers/creditoController");
// Endpoint para simular crédito
router.post("/simular-credito", (req, res) => {
  const { fechaCredito, montoCredito, formaPago, cantidadCuotas } = req.body;

  // Configuramos los porcentajes de interés según la forma de pago
  let interesPorcentaje;
  switch (formaPago) {
    case "diario":
      interesPorcentaje = 0.01; // 1% por día
      break;
    case "semanal":
      interesPorcentaje = 0.05; // 5% por semana
      break;
    case "quincenal":
      interesPorcentaje = 0.15; // 15% por quincena
      break;
    case "mensual":
      interesPorcentaje = 0.4; // 40% por mes
      break;
    default:
      return res.status(400).json({ error: "Forma de pago no válida" });
  }

  // Validamos que la cantidad de cuotas y monto de crédito sean valores válidos
  if (!cantidadCuotas || cantidadCuotas <= 0) {
    return res
      .status(400)
      .json({ error: "Cantidad de cuotas debe ser mayor a 0" });
  }
  if (!montoCredito || montoCredito <= 0) {
    return res
      .status(400)
      .json({ error: "El monto de crédito debe ser mayor a 0" });
  }

  // Realizamos los cálculos
  const montoInteresPorCuota = montoCredito * interesPorcentaje; // Interés por cuota
  const totalInteres = interesPorcentaje * 100 * cantidadCuotas; // Total de interés acumulado en porcentaje
  const montoTotalInteres = montoInteresPorCuota * cantidadCuotas; // Interés total en monto
  const montoCuota = (montoCredito + montoTotalInteres) / cantidadCuotas; // Monto de cada cuota
  const totalPagar = montoCredito + montoTotalInteres; // Total a pagar al final del crédito

  // Retornamos los resultados
  res.json({
    fechaCredito,
    montoCredito,
    formaPago,
    cantidadCuotas,
    montoInteres: montoTotalInteres,
    montoCuota,
    totalInteres: `${totalInteres}%`,
    totalPagar,
  });
});

// Endpoint to create and save credit in the database
router.post("/crear-credito", async (req, res) => {
  try {
    const {
      clienteSeleccionado,
      asesorSeleccionado,
      fechaCredito,
      montoCredito,
      formaPago,
      cantidadCuotas,
    } = req.body;

    // Calculate interest rates and amounts
    let interesPorcentaje;
    switch (formaPago) {
      case "diario":
        interesPorcentaje = 0.01;
        break;
      case "semanal":
        interesPorcentaje = 0.05;
        break;
      case "quincenal":
        interesPorcentaje = 0.15;
        break;
      case "mensual":
        interesPorcentaje = 0.4;
        break;
      default:
        return res.status(400).json({ error: "Forma de pago no válida" });
    }

    const montoInteresPorCuota = montoCredito * interesPorcentaje;
    const montoTotalInteres = montoInteresPorCuota * cantidadCuotas;
    const montoCuota = (montoCredito + montoTotalInteres) / cantidadCuotas;
    const totalPagar = montoCredito + montoTotalInteres;
    const totalInteres = interesPorcentaje * 100 * cantidadCuotas; // Total de interés acumulado en porcentaje
    // Create a new credit document
    const nuevoCredito = new Credito({
      clienteSeleccionado,
      asesorSeleccionado,
      fechaCredito,
      montoCredito,
      formaPago,
      cantidadCuotas,
      montoInteres: montoTotalInteres,
      montoCuota,
      totalInteres: `${totalInteres}%`,
      totalPagar,
    });

    // Save the credit to the database
    await nuevoCredito.save();
    res.status(201).json(nuevoCredito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/listar", creditoController.getAllCreditos);
router.get("/:id", creditoController.getCreditoById);
router.put("/actualizar/:id", creditoController.updateCredito);
router.delete("/eliminar/:id", creditoController.deleteCredito);

module.exports = router;
