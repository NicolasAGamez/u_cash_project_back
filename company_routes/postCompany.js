const express = require('express');
const router = express.Router(); 
const mysql = require('mysql2');

// configuración de la base de datos MySQL
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root', 
  password: 'eHrZp*H0358w',
  database: 'u_cash_customers',
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Error conectando con el servidor:', err);
  } else {
    console.log('Conexión con el servidor CompanyPOST MySQL realizada!');
  }
});

// POST COMPANY API
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
        console.error('Error al agregar datos de la empresa al servidor:', err);
        return res.status(500).json({ error: 'Error al agregar datos de la empresa al servidor' });
      }
      return res.status(201).json({ message: 'Información de la empresa añadida con éxito' });
    });
  });
  
  module.exports = router;