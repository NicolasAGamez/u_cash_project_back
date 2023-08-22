-- Switch to the newly created database
USE u_cash_customers;

-- Create the company_info table
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
DROP TABLE company_types;