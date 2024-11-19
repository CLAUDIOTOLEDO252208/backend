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
// Listar todos los créditos
exports.getAllCreditos = async (req, res) => {
  try {
    const creditos = await Credito.find();
    // .populate("clienteSeleccionado", "nombre") // Ajusta según tu esquema Cliente
    // .populate("asesorSeleccionado", "nombre"); // Ajusta según tu esquema Asesor
    res.status(200).json(creditos);
  } catch (error) {
    console.error("Error al listar créditos:", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener un crédito por ID
exports.getCreditoById = async (req, res) => {
  try {
    const { id } = req.params;
    const credito = await Credito.findById(id)
      .populate("clienteSeleccionado", "nombre")
      .populate("asesorSeleccionado", "nombre");
    if (!credito)
      return res.status(404).json({ message: "Crédito no encontrado" });
    res.status(200).json(credito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un crédito
exports.updateCredito = async (req, res) => {
  try {
    const { id } = req.params;
    const creditoActualizado = await Credito.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!creditoActualizado)
      return res.status(404).json({ message: "Crédito no encontrado" });
    res.status(200).json(creditoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un crédito
exports.deleteCredito = async (req, res) => {
  try {
    const { id } = req.params;
    const creditoEliminado = await Credito.findByIdAndDelete(id);
    if (!creditoEliminado)
      return res.status(404).json({ message: "Crédito no encontrado" });
    res
      .status(200)
      .json({ message: "Crédito eliminado con éxito", creditoEliminado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
