-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS u_cash_customers;

-- Cambiar a la base de datos recién creada
USE u_cash_customers;

-- Crear la tabla de clientes
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60),
    identification VARCHAR (30),
    nit VARCHAR (20),
    city VARCHAR (100),
    address VARCHAR (100),
    cell VARCHAR(15),
    email VARCHAR(100),
    person_type VARCHAR (10)
);

SELECT * FROM customers;
DELETE FROM customers;

ALTER TABLE customers AUTO_INCREMENT = 1;

DROP TABLE customers;

