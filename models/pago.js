const mongoose = require("mongoose");

const PagoSchema = new mongoose.Schema({
  credito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Credito",
    required: true,
  },
  fechaPago: {
    type: Date,
    default: Date.now,
    required: true,
  },
  montoPago: {
    type: Number,
    required: true,
    min: 0,
  },
  saldoRestante: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Pago", PagoSchema);
