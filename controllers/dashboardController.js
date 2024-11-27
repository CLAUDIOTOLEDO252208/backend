const Cliente = require("../models/Cliente"); // Ajusta al nombre correcto del modelo
const Credito = require("../models/Credito"); // Ajusta al nombre correcto del modelo

const obtenerResumen = async (req, res) => {
  try {
    const cantidadClientes = await Cliente.countDocuments();
    // const cantidadAsesores = await Asesor.countDocuments();
    const cantidadCreditos = await Credito.countDocuments();
    const cantidadCreditosCancelados = await Credito.countDocuments({
      estado: "cancelado", // Asegúrate de que coincida con tu base de datos
    });
    const cantidadCreditosPendientes = await Credito.countDocuments({
      estado: "pendiente", // Asegúrate de que coincida con tu base de datos
    });

    res.status(200).json({
      cantidadClientes,
      cantidadCreditos,
      // cantidadAsesores,
      cantidadCreditosCancelados,
      cantidadCreditosPendientes,
    });
  } catch (error) {
    console.error("Error al obtener el resumen:", error);
    res.status(500).json({ message: "Error al obtener el resumen" });
  }
};

module.exports = { obtenerResumen };
