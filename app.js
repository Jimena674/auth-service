// Importar módulos para acceder a sus funciones a través de la variable
const express = require("express"); // Para crear servicios
const mongoose = require("mongoose"); // Para conectarse con MongoDB
const dotenv = require("dotenv"); // Para leer variables de entorno del archivo dev

// Inicializar express, crear una instancia de express llamada app para que maneja las peticiones HTTP y para poder definir rutas, usar middleware o escuchar el puerto
const app = express();
// Cargar variables del archivo .env
dotenv.config();

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());

// Importar rutas de autenticación
const authRoutes = require("./routes/auth.routes");
//Cuando llega una solicitud a una ruta que empiece por /api/auth, se delega el manejo al módulo de rutas
app.use("/api/auth", authRoutes);

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a la base de datos."))
  .catch((err) => console.log("Error al conectar la base de datos:", err));

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
