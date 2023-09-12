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
const getContractType = require('./dropdown_routes/contractTypes');

// Incluir rutas de contratos
const postContract = require('./contract_routes/postContract');
const deleteContract = require('./contract_routes/deleteContract');
const getContract = require('./contract_routes/getContract');
const putContract = require('./contract_routes/putContract');

// Incluir rutas de referencias
const postReferences = require('./reference_routes/postReferences');
const deleteReferences = require('./reference_routes/deleteReferences');
const getReferences = require('./reference_routes/getReferences');
const putReferences = require('./reference_routes/putReferences');

// Incluir ruta de intereses
const getInterest = require('./interest_routes/getInterest');

// Usar la ruta de intereses
app.use('/api', getInterest);

// Incluir rutas de calculadora
const postCalculator = require('./calculator_routes/postCalculator');
const deleteCalculator = require('./calculator_routes/deleteCalculator');
const getCalculator = require('./calculator_routes/getCalculator');
const putCalculator = require('./calculator_routes/putCalculator');

// Usar las rutas de calculadora
app.use('/api', postCalculator);
app.use('/api', deleteCalculator);
app.use('/api', getCalculator);
app.use('/api', putCalculator);

// Usar las rutas de referencias
app.use('/api', postReferences);
app.use('/api', deleteReferences);
app.use('/api', getReferences);
app.use('/api', putReferences);

// Usar las rutas de contrato
app.use('/api', postContract);
app.use('/api', deleteContract);
app.use('/api', getContract);
app.use('/api', putContract);

// Usar las rutas de dropdowns
app.use('/api', getCompanyType);
app.use('/api', getCountryCode);
app.use('/api', getCiiuCode);
app.use('/api', getContractType);

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
