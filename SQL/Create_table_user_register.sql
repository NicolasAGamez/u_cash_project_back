-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de creación de usuario
CREATE TABLE user_register (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60),
  email VARCHAR(100),
  cell VARCHAR(15)
);

SELECT * FROM user_register;
DELETE FROM user_register;

ALTER TABLE user_register AUTO_INCREMENT = 1;

DROP TABLE user_register;