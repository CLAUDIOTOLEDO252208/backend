const mongoose = require("mongoose");
const ventaSchema = new mongoose.Schema({
  clienteSeleccionado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  asesorSeleccionado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Asesor",
    required: true,
  },
  productoSeleccionado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  cantidad: { type: Number, required: true },
  totalVenta: { type: Number, required: true },
  formaPago: {
    type: String,
    required: true,
    enum: ["diario", "semanal", "quincenal", "mensual"],
  },
  creditoAsociado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Credito",
  },
  fechaVenta: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Venta", ventaSchema);
