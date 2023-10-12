-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de creación de usuario
CREATE TABLE application_information (
	id INT AUTO_INCREMENT PRIMARY KEY,
    identification VARCHAR(30),
    name VARCHAR(60),
    email VARCHAR(100),
    cell VARCHAR(15),
    chosenPlan VARCHAR(255),
    requiredAmount DECIMAL(20, 2),
    validated VARCHAR(5),
    approval VARCHAR(5),
    status VARCHAR(20)
);

-- Insertar los datos en la nueva tabla uniéndose las tablas de clientes y de información de la calculadora.
INSERT INTO application_information (identification, name, email, cell, chosenPlan, requiredAmount)
SELECT
    c.identification,
    c.name,
    c.email,
    c.cell,
    ci.chosenPlan,
    ci.requiredAmount
FROM
    customers AS c
JOIN
    calculator_info AS ci
ON
    c.identification = ci.customerId;
    

SELECT * FROM application_information;


DELETE FROM application_information;

ALTER TABLE application_information AUTO_INCREMENT = 1;

DROP TABLE application_information;