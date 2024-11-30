const Pago = require("../models/pago");
const Credito = require("../models/Credito");

// Registrar un pago
exports.createPago = async (req, res) => {
  try {
    const { creditoId, montoPago } = req.body;

    // Verificar que el crédito existe
    const credito = await Credito.findById(creditoId);
    if (!credito) {
      return res.status(404).json({ message: "Crédito no encontrado" });
    }

    // Calcular el saldo restante
    const nuevoSaldo = credito.totalPagar - montoPago;

    if (nuevoSaldo < 0) {
      return res
        .status(400)
        .json({ message: "El monto excede el saldo pendiente" });
    }

    // Crear un nuevo pago
    const pago = new Pago({
      credito: creditoId,
      montoPago,
      saldoRestante: nuevoSaldo,
    });

    // Guardar el pago
    await pago.save();

    // Actualizar el saldo del crédito
    credito.totalPagar = nuevoSaldo;
    if (nuevoSaldo === 0) {
      credito.pagado = true; // Marcar como pagado si el saldo llega a cero
    }
    await credito.save();

    res.status(201).json({ message: "Pago registrado con éxito", pago });
  } catch (error) {
    console.error("Error al registrar el pago:", error);
    res.status(500).json({ message: error.message });
  }
};

// Listar pagos de un crédito
exports.getPagosByCredito = async (req, res) => {
  try {
    const { creditoId } = req.params;

    // Verificar que el crédito existe
    const credito = await Credito.findById(creditoId);
    if (!credito) {
      return res.status(404).json({ message: "Crédito no encontrado" });
    }

    // Obtener los pagos
    const pagos = await Pago.find({ credito: creditoId }).sort({
      fechaPago: -1,
    });

    res.status(200).json(pagos);
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    res.status(500).json({ message: error.message });
  }
};
