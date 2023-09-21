-- Cambiar a la base de datos
USE u_cash_customers;

-- Crear la tabla de clientes
CREATE TABLE customers_rates_survey (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cc VARCHAR(20),
    name VARCHAR(60),
    rate DECIMAL(4, 2)
);

DROP TABLE customers_rates_survey;