-- Cambiar a la base de datos principal
USE u_cash_customers;

-- Crear la tabla de empresas
CREATE TABLE company_info (
	 id INT AUTO_INCREMENT PRIMARY KEY,
     nit VARCHAR(20),
     company_name VARCHAR(255) NOT NULL UNIQUE,
     kind_of_society VARCHAR(50),
     code_telephone VARCHAR (5),
     telephone VARCHAR (20),
     code_cell_phone VARCHAR (10),
     cell_phone VARCHAR(20),
     company_address VARCHAR(255),
     num_employees INT,
     annual_income DECIMAL(18, 2),
     annual_expenditures DECIMAL(18, 2),
     total_assets DECIMAL(18, 2),
     total_liabilities DECIMAL(18, 2),
     equity_total DECIMAL (18,2),
     constitution_date DATE,
     ciiu VARCHAR(255)
);

SELECT * FROM company_info;
DELETE FROM company_info;

ALTER TABLE company_info AUTO_INCREMENT = 1;

DROP TABLE company_info;