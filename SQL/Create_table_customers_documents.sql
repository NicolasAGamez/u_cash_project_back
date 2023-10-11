-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de documentos.
CREATE TABLE documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url_documents VARCHAR(255) NOT NULL
);

SELECT * FROM documents;
DELETE FROM documents;

ALTER TABLE documents AUTO_INCREMENT = 1;

DROP TABLE documents;