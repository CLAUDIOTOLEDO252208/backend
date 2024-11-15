const Asesor = require("../models/asesorModel");

// Crear un nuevo asesor

exports.crearAsesor = async (req, res) => {
  try {
    const { apellido, nombre, dni, domicilio, telefono, correo } = req.body;

    if (!apellido || !nombre || !dni || !domicilio || !telefono || !correo) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const nuevoAsesor = new Asesor(req.body);
    const asesorGuardado = await nuevoAsesor.save();
    res.status(201).json(asesorGuardado);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "El correo o DNI ya están registrados." });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Otros métodos para obtener, actualizar y eliminar asesores...

// Obtener todos los asesores
exports.obtenerAsesores = async (req, res) => {
  try {
    const asesores = await Asesor.find();
    res.json(asesores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un asesor por ID
exports.obtenerAsesorPorId = async (req, res) => {
  try {
    const asesor = await Asesor.findById(req.params.id);
    if (!asesor) {
      return res.status(404).json({ error: "Asesor no encontrado" });
    }
    res.json(asesor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un asesor por ID
exports.actualizarAsesor = async (req, res) => {
  try {
    const asesorActualizado = await Asesor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!asesorActualizado) {
      return res.status(404).json({ error: "Asesor no encontrado" });
    }
    res.json(asesorActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un asesor por ID
exports.eliminarAsesor = async (req, res) => {
  try {
    const asesorEliminado = await Asesor.findByIdAndDelete(req.params.id);
    if (!asesorEliminado) {
      return res.status(404).json({ error: "Asesor no encontrado" });
    }
    res.json({ message: "Asesor eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
