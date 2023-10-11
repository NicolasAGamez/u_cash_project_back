-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Revisar datos de las tablas principales
SELECT * FROM user_register;
SELECT * FROM otp_verification;
SELECT * FROM customers;
SELECT * FROM company_info;
SELECT * FROM contract_info;
SELECT * FROM customers_references;
SELECT * FROM documents;
SELECT * FROM calculator_info;
SELECT * FROM customers_rates_survey;
SELECT * FROM application_information;



-- Borrar los datos de las tablas principales
DELETE FROM user_register;
DELETE FROM otp_verification;
DELETE FROM customers;
DELETE FROM company_info;
DELETE FROM contract_info;
DELETE FROM customers_references;
DELETE FROM calculator_info;
DELETE FROM documents;
DELETE FROM customers_rates_survey;
DELETE FROM application_information;



-- Reiniciar el id de las tablas principales
ALTER TABLE user_register AUTO_INCREMENT = 1;
ALTER TABLE otp_verification AUTO_INCREMENT = 1;
ALTER TABLE customers AUTO_INCREMENT = 1;
ALTER TABLE company_info AUTO_INCREMENT = 1;
ALTER TABLE contract_info AUTO_INCREMENT = 1;
ALTER TABLE customers_references AUTO_INCREMENT = 1;
ALTER TABLE calculator_info AUTO_INCREMENT = 1;
ALTER TABLE documents AUTO_INCREMENT = 1;
ALTER TABLE customers_rates_survey AUTO_INCREMENT = 1;
ALTER TABLE application_information AUTO_INCREMENT = 1;



-- Eliminar las tablas principales
DROP TABLE user_register;
DROP TABLE otp_verification;
DROP TABLE customers;
DROP TABLE company_info;
DROP TABLE contract_info;
DROP TABLE customers_references;
DROP TABLE calculator_info;
DROP TABLE documents;
DROP TABLE customers_rates_survey;
DROP TABLE application_information;
