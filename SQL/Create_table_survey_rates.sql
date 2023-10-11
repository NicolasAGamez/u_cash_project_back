-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de valoración encuesta a clientes
CREATE TABLE customers_rates_survey (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cc VARCHAR(20),
    name VARCHAR(60),
    rate DECIMAL(4, 2)
);

SELECT * FROM customers_rates_survey;
DELETE FROM customers_rates_survey;

ALTER TABLE customers_rates_survey AUTO_INCREMENT = 1;

DROP TABLE customers_rates_survey;