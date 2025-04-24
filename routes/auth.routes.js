// Importar módulos
const express = require("express");
const bcrypt = require("bcryptjs");
// Se importa e inicializa el médoto Router() de express. Devuelve un miniobjeto de tipo app para manejar las rutas y conectarlas a la app principal
const router = express.Router();
// Se importa el modelo User.js
const User = require("../models/User");

// Ruta para el registro de usuario
router.post("/register", async (req, res) => {
  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists)
      return res.status(400).json({ message: "Usuario ya existe" });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Crear nuevo usuario
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

module.exports = router;
