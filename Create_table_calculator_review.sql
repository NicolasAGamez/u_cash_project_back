-- Switch to the created database
USE u_cash_customers;

CREATE TABLE calculator_info (
    customerId VARCHAR(30) PRIMARY KEY,
    person_type VARCHAR (20),
    amount DECIMAL(20, 2),
    monthContract INT,
    chosenPlan VARCHAR(255),
    paymentMethod VARCHAR(255),
    requiredAmount DECIMAL(20, 2),
    valueToFinance DECIMAL(20, 2),
    interestRateEA DECIMAL(20, 2),
    intermediation DECIMAL(20, 2),
    administration DECIMAL(20, 2),
    administrationVAT DECIMAL(20, 2),
    installmentValue DECIMAL(20, 2),
    disbursedValue DECIMAL(20, 2),
    firstInstallment DECIMAL(20, 2),
    secondInstallment DECIMAL(20, 2),
    thirdInstallment DECIMAL(20, 2),
    fourthPaymentCredit DECIMAL(20, 2)
);

SELECT * FROM customers;
SELECT * FROM company_info;
SELECT * FROM contract_info;
SELECT * FROM customers_references;
SELECT * FROM calculator_info;



DELETE FROM customers;
DELETE FROM company_info;
DELETE FROM contract_info;
DELETE FROM customers_references;
DELETE FROM calculator_info;