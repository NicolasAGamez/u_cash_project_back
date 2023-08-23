const express = require('express');
const bodyParser = require('body-parser');
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
const emailRoute = require('./routes/emailRoute');

// Incluir rutas de empresas
const postCompany = require('./company_routes/postCompany');
const deleteCompany = require('./company_routes/deleteCompany');
const getCompany = require('./company_routes/getCompany');
const putCompany = require('./company_routes/putCompany');

// Incluir rutas de dropdowns
const getCompanyType = require('./dropdown_routes/companyType');
const getCountryCode = require('./dropdown_routes/countryCodes');
const getCiiuCode = require('./dropdown_routes/ciuuCodes');

// Incluir rutas de contratos
const postContract = require('./contract_routes/postContract');
const deleteContract = require('./contract_routes/deleteContract');
const getContract = require('./contract_routes/getContract');
const putContract = require('./contract_routes/putContract');

// Usar las rutas de contrato
app.use('/api', postContract);
app.use('/api', deleteContract);
app.use('/api', getContract);
app.use('/api', putContract);

// Usar las rutas de dropdowns
app.use('/api', getCompanyType);
app.use('/api', getCountryCode);
app.use('/api', getCiiuCode);

// Usar las rutas de empresas
app.use('/api', postCompany);
app.use('/api', deleteCompany);
app.use('/api', getCompany);
app.use('/api', putCompany);

// Usar las rutas
app.use('/api', postRoute);
app.use('/api', deleteRoute);
app.use('/api', getRoute);
app.use('/api', putRoute);
app.use('/api', emailRoute);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
