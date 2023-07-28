-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS u_cash_customers;

-- Cambiar a la base de datos recién creada
USE u_cash_customers;

-- Crear la tabla de clientes
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60),
    email VARCHAR(100),
    cell VARCHAR(15)
);

-- Agregar un índice en la columna de nombre para mejorar el rendimiento de las consultas
CREATE INDEX idx_customers_name ON customers(name);