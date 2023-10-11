-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de referencias dadas por los clientes
CREATE TABLE customers_references (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cc VARCHAR(20),
    name VARCHAR(60),
    cell VARCHAR(15),
    email VARCHAR(100) UNIQUE 
);

SELECT * FROM customers_references;
DELETE FROM customers_references;

ALTER TABLE customers_references AUTO_INCREMENT = 1;

DROP TABLE customers_references;