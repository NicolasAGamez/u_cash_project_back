-- Switch to the newly created database
USE u_cash_customers;

-- Create the company_info table
CREATE TABLE company_info (
     nit VARCHAR(20) PRIMARY KEY,
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

DROP TABLE company_info;

SELECT * FROM company_info;
DELETE FROM company_info;

-- SELECT * FROM company_info ci WHERE nit JOIN customers c WHERE c.nit = ci.nit ORDER BY ASC;