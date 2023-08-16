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
        companyName,
        companyKindOfSociety,
        companyCellPhone,
        companyAddress,
        companyNumEmployees,
        companyAnnualIncome,
        companyAnnualExpenditures,
        companyTotalAssets,
        companyTotalLiabilities,
        companyConstitutionDate,
        companyCiiu,
        companyCountriesObligedToTax,
        companyTradingCurrencies,
        companyVirtualCurrencies
     } = newCompany;
    
    const sql = 'INSERT INTO company_info (nit, company_name, kind_of_society, cell_phone, company_address, num_employees, annual_income, annual_expenditures, total_assets, total_liabilities, constitution_date, ciiu, countries_obliged_to_tax, trading_currencies, virtual_currencies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    const values = [
        companyNit,
        companyName,
        companyKindOfSociety,
        companyCellPhone,
        companyAddress,
        companyNumEmployees,
        companyAnnualIncome,
        companyAnnualExpenditures,
        companyTotalAssets,
        companyTotalLiabilities,
        companyConstitutionDate,
        companyCiiu,
        companyCountriesObligedToTax,
        companyTradingCurrencies,
        companyVirtualCurrencies
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