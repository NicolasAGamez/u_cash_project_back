-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de la verificación OTP
CREATE TABLE otp_verification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp VARCHAR(10) NOT NULL
);

SELECT * FROM otp_verification;
DELETE FROM otp_verification;

ALTER TABLE otp_verification AUTO_INCREMENT = 1;

DROP TABLE otp_verification;

