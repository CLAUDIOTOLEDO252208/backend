const Credito = require("../models/Credito");

exports.createCredito = async (req, res) => {
  try {
    const {
      clienteSeleccionado,
      asesorSeleccionado,
      fechaCredito,
      montoCredito,
      formaPago,
      cantidadCuotas,
    } = req.body;

    // Calcular el interés y otros valores aquí
    const interesRate =
      formaPago === "diario"
        ? 0.01
        : formaPago === "semanal"
        ? 0.05
        : formaPago === "quincenal"
        ? 0.15
        : 0.4;
    const montoInteres = montoCredito * interesRate * cantidadCuotas;
    const totalPagar = montoCredito + montoInteres;
    const montoCuota = totalPagar / cantidadCuotas;

    const nuevoCredito = new Credito({
      clienteSeleccionado,
      asesorSeleccionado,
      fechaCredito,
      montoCredito,
      formaPago,
      cantidadCuotas,
      montoInteres,
      montoCuota,
      totalInteres: montoInteres,
      totalPagar,
    });

    await nuevoCredito.save();
    res.status(201).json(nuevoCredito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
