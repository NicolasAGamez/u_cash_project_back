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
    console.log('Conexión PostCalculator realizada');
  }
});

// POST API para la información de la calculadora
router.post('/calculator-info', (req, res) => {
    const newCalculator = req.body;
    const {
        customerId,
        person_type,
        amount,
        monthContract,
        chosenPlan,
        paymentMethod,
        requiredAmount,
        valueToFinance,
        interestRateEA,
        intermediation,
        administration,
        administrationVAT,
        installmentValue,
        disbursedValue,
        firstInstallment,
        secondInstallment,
        thirdInstallment,
        fourthPaymentCredit
    } = newCalculator;
    
    const sql = 'INSERT INTO calculator_info (customerId, person_type, amount, monthContract, chosenPlan, paymentMethod, requiredAmount, valueToFinance, interestRateEA, intermediation, administration, administrationVAT, installmentValue, disbursedValue, firstInstallment, secondInstallment, thirdInstallment, fourthPaymentCredit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    const values = [
        customerId,
        person_type,
        amount,
        monthContract,
        chosenPlan,
        paymentMethod,
        requiredAmount,
        valueToFinance,
        interestRateEA,
        intermediation,
        administration,
        administrationVAT,
        installmentValue,
        disbursedValue,
        firstInstallment,
        secondInstallment,
        thirdInstallment,
        fourthPaymentCredit
    ];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al agregar datos de la calculadora al servidor:', err);
            return res.status(500).json({ error: 'Error al agregar datos de la calculadora al servidor' });
        }
        return res.status(201).json({ message: 'Datos agregados con éxito' });
    });
});
  
  module.exports = router;