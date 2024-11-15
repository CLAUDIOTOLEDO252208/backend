const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  apellidos: { type: String, required: true },
  nombres: { type: String, required: true },
  direccion: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  tipoDocumento: {
    type: String,
    enum: ["dni", "pasaporte", "cedula"],
    required: true,
  },
  numeroDocumento: { type: String, required: true },
  estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
  comentarios: { type: String },
});

module.exports = mongoose.model("Cliente", clienteSchema);
