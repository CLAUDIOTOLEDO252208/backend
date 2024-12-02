const Producto = require("../models/Producto");

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// Crear producto
exports.createProducto = async (req, res) => {
  try {
    const { codigo, descripcion, precioCosto, rentabilidad, stock, rubro } =
      req.body;

    const nuevoProducto = new Producto({
      codigo,
      descripcion,
      precioCosto,
      rentabilidad,
      stock,
      rubro,
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// Editar producto
exports.updateProducto = async (req, res) => {
  try {
    const { codigo, descripcion, precioCosto, rentabilidad, stock, rubro } =
      req.body;

    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        codigo,
        descripcion,
        precioCosto,
        rentabilidad,
        stock,
        rubro,
      },
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar producto
exports.deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

// Cambiar estado (activo/inactivo)
exports.toggleEstadoProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    producto.estado = producto.estado === "activo" ? "inactivo" : "activo";
    await producto.save();

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al cambiar el estado del producto" });
  }
};

// Buscar productos por rubro, descripción o código
exports.searchProductos = async (req, res) => {
  try {
    const { rubro, descripcion, codigo } = req.query;

    const query = {};
    if (rubro) query.rubro = rubro;
    if (descripcion) query.descripcion = new RegExp(descripcion, "i");
    if (codigo) query.codigo = new RegExp(codigo, "i");

    const productos = await Producto.find(query);
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar los productos" });
  }
};
