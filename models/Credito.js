const mongoose = require("mongoose");

const creditoSchema = new mongoose.Schema({
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
  fechaCredito: { type: Date, required: true },
  montoCredito: { type: Number, required: true },
  formaPago: {
    type: String,
    required: true,
    enum: ["diario", "semanal", "quincenal", "mensual"],
  },
  cantidadCuotas: { type: Number, required: true }, // NUEVO CAMPO
  montoInteres: { type: Number },
  montoCuota: { type: Number },
  totalInteres: { type: String },
  totalPagar: { type: Number },

  pagado: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Credito", creditoSchema);
