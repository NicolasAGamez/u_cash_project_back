-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de tipos de contratos
CREATE TABLE contract_types (
  name VARCHAR(100) PRIMARY KEY NOT NULL
);

INSERT INTO contract_types (name) VALUES
  ('Prestación de Servicios'),
  ('Laboral (Indefinido)'),
  ('Laboral (Definido)');


SELECT * FROM contract_types;
DELETE FROM contract_types;


DROP TABLE company_types;