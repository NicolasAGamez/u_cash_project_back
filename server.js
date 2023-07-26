const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000; 

app.use(cors());
app.use(bodyParser.json());

// Incluir las rutas
const postRoute = require('./routes/postRoute');
const deleteRoute = require('./routes/deleteRoute');
const getRoute = require('./routes/getRoute');
const putRoute = require('./routes/putRoute');

// Usar las rutas
app.use('/api', postRoute);
app.use('/api', deleteRoute);
app.use('/api', getRoute);
app.use('/api', putRoute);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
