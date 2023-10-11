-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de tipos de empresas
CREATE TABLE company_types (
  name VARCHAR(100) PRIMARY KEY NOT NULL
);

INSERT INTO company_types (name) VALUES
  ('Ltda.'),
  ('S.A.'),
  ('& Cía.'),
  ('S. en C.'),
  ('S.C.A.'),
  ('S.A.S.'),
  ('S.C.');

SELECT * FROM company_types;
DELETE FROM company_types;


DROP TABLE company_types;