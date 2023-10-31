const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// configuración de la base de datos MySQL
const dbConfig = {
  host: 'demo-umonei-aws.cbg6k7u60pgo.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: 'root',
  password: 'eHrZp*H0358w',
  database: 'db_demo_umonei',
};

// Establecer conexión con el servidor MySQL
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error conectando con el servidor:', err);
  } else {
    console.log('Conexión PostCompany realizada');
  }
});

// POST API para la información de las empresas
router.post('/company', (req, res) => {
    const newCompany = req.body;
    const {
        companyNit,
        nameCompany,
        TypeSociety,
        codeTelephone,
        telephone,
        codeCellPhone,
        cellPhone,
        companyAddress,
        numEmployees,
        annualIncome,
        annualExpenditures,
        totalAssets,
        totalLiabilities,
        equityTotal,
        constitutionDate,
        companyCiiu
     } = newCompany;

    const sql = 'INSERT INTO company_info (nit, company_name, kind_of_society, code_telephone, telephone, code_cell_phone, cell_phone, company_address, num_employees, annual_income, annual_expenditures, total_assets, total_liabilities, equity_total, constitution_date, ciiu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const values = [
      companyNit,
      nameCompany,
      TypeSociety,
      codeTelephone,
      telephone,
      codeCellPhone,
      cellPhone,
      companyAddress,
      numEmployees,
      annualIncome,
      annualExpenditures,
      totalAssets,
      totalLiabilities,
      equityTotal,
      constitutionDate,
      companyCiiu
     ];

    connection.query(sql, values, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.error('Error: El valor de Nit ya existe en la base de datos.');
          res.status(409).json({ error: 'El valor de Nit ya existe en la base de datos.' });
        } else {
          console.error('Error al insertar datos:', err.message);
          res.status(500).json({ error: 'Ocurrió un error al insertar los datos.' });
        }
      } else {
        console.log('Datos insertados con éxito:', result);
        res.status(201).json({ message: 'Datos insertados con éxito.' });
      }
    });
  });

  module.exports = router;
