const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App de Node arrancada");

// Conectar a la base de datos
connection();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Rutas
const article_routes = require("./routes/article");


// Cargo las rutas
app.use("/api", article_routes);


// Prueba 
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).send({
        curso: "Master en React",
        autor: "Paul Flores"
    });
});

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " + puerto);
})