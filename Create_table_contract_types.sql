-- Switch to the newly created database
USE u_cash_customers;

-- Create the contract_type table
CREATE TABLE contract_types (
  name VARCHAR(100) PRIMARY KEY NOT NULL
);

INSERT INTO contract_types (name) VALUES
  ('Prestación de Servicios'),
  ('Laboral (Indefinido)'),
  ('Laboral (Definido)');
  
SELECT * FROM contract_types;
DROP TABLE company_types;