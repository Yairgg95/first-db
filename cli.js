require('dotenv').config();
const mongoose = require('mongoose');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME }= process.env;
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

// crear modelo de datos siempre con la primera mayuscula por ser modelo

const Koder = mongoose.model("koder", new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    lastName: {
        type: String,
        required: false,
        maxLength: 100,
    },
    email: {
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    birthDate: {
        type: Date,
        required: false,
    },
    generation: {
        type: Number,
        min: 1,
        max: 100,
    },
}));

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Conexion exitosa");
    // insertar
    Koder.create({
        firstName: "Yair",
        lastName: "Guadarrama",
        email: "yair@kodemia.mx",
        birthDate: new Date("1995-11-11"),
        generation: 33,
    })
    .then(() => console.log("Koder created"))
    .catch((error) => console.error("Error al crear Koder", error));
})
.catch ((error) => {
    console.error("Error al conectar con la base de datos", error);
});

/*
Las pronmesas por defecto nacen o se crean en estado - pendiente 
- resolve: se resuelve la promesa (then) se ejcuta cuando pasa de pendiente a resuelta
- reject: se rechaza la promesa (catch) pendiente a rechazada
*/