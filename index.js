const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Habilitar express para entender json
app.use(express.json());


//Creando Certificado HTTPS
https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/archive/api.jasailive.xyz/fullchain1.pem'),
    key: fs.readFileSync('/etc/letsencrypt/archive/api.jasailive.xyz/privkey1.pem')
}, app).listen(port, function () {
    console.log('Servidor https corriendo en el puerto 443');
})
app.get('/', function (req, res) {
    res.send('Hola, estas en la pagina inicial');
    console.log('Se recibio una petición get a través de https');
});


// Aquí almacenamos las estadísticas como un ejemplo
let estadisticas = {
    total_personas: 0,
    moda: [],
    mediana: null,  
    desviacion_estandar: null,
    S: null,
    S2: null,
    Ai: null,
    tiempo_envio: null
};

// Endpoint para obtener las estadísticas
app.get('/stats', (req, res) => {
    res.json(estadisticas);
});

// Endpoint para actualizar las estadísticas
app.post('/stats', (req, res) => {
    // Aquí actualizamos el objeto estadisticas con los datos recibidos en el cuerpo de la solicitud
    estadisticas = { ...estadisticas, ...req.body };
    res.status(200).send('Estadísticas actualizadas');
});
