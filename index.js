// const express = require("express");

// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Conexión a MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Conectado a MongoDB"))
//   .catch((err) => console.error("Error de conexión:", err));

// // Rutas
// const clienteRoutes = require("./routes/ClienteRoutes");
// app.use("/api/clientes", clienteRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Importa el paquete CORS

dotenv.config();

const app = express();
app.use(express.json());

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia esto a la URL de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

// Rutas
const clienteRoutes = require("../routes/clienteRoutes");
const creditoRoutes = require("../routes/creditoRoutes"); // Nueva ruta de crédito
const asesorRoutes = require("../routes/asesorRoutes");
app.use("/api/clientes", clienteRoutes);
app.use("/api/creditos", creditoRoutes); // Nueva ruta

app.use("/api/asesores", asesorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
