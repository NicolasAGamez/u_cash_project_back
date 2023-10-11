-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de datos de contratos
CREATE TABLE contract_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nit VARCHAR (20),
    contracting_entity_name VARCHAR(255) NOT NULL,
    contract_type VARCHAR(100) NOT NULL,
    duration_months VARCHAR(4),
    total_contract_value DECIMAL(15, 2),
    supervisor_name VARCHAR(100),
    supervisor_phone VARCHAR(20),
    supervisor_email VARCHAR(255)
);

SELECT * FROM contract_info;
DELETE FROM contract_info;

ALTER TABLE contract_info AUTO_INCREMENT = 1;

DROP TABLE contract_info;