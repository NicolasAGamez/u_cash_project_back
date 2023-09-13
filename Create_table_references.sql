-- Cambiar a la base de datos
USE u_cash_customers;

-- Crear la tabla de clientes
CREATE TABLE customers_references (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nit VARCHAR(20),
    name VARCHAR(60),
    cell VARCHAR(15),
    email VARCHAR(100) UNIQUE 
);

DROP TABLE customers_references;

SELECT * FROM customers_references;
DELETE FROM customers_references;