const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: [true, "El código es obligatorio"],
    unique: true,
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  precioCosto: {
    type: Number,
    required: [true, "El precio costo es obligatorio"],
  },
  rentabilidad: {
    type: Number,
    required: [true, "La rentabilidad es obligatoria"], // Porcentaje
  },
  stock: {
    type: Number,
    required: [true, "El stock es obligatorio"],
  },
  precioVenta: {
    type: Number, // Se calculará automáticamente
  },
  estado: {
    type: String,
    enum: ["activo", "inactivo"],
    default: "activo",
  },
  rubro: {
    type: String,
    enum: ["hogar", "comercial"],
    required: [true, "El rubro es obligatorio"],
  },
});

ProductoSchema.pre("save", function (next) {
  // Calcular el precio de venta antes de guardar
  this.precioVenta = this.precioCosto * (1 + this.rentabilidad / 100);
  next();
});

module.exports = mongoose.model("Producto", ProductoSchema);
