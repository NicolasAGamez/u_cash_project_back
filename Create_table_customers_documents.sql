-- Switch to the newly created database
USE u_cash_customers;

-- Create the documents table
CREATE TABLE documents (
     id INT AUTO_INCREMENT PRIMARY KEY,
     customer_id INT,
     customer_email VARCHAR (100),
     client_type VARCHAR(20) NOT NULL,
	 certificate_of_constitution_path VARCHAR(255),
	 copy_of_current_rut_path VARCHAR(255),
     id_pdf_path VARCHAR(255),
     active_contract_pdf_path VARCHAR(255),
     compliance_policy_pdf_path VARCHAR(255),
     policy_payment_support_pdf_path VARCHAR(255),
     bank_certification_pdf_path VARCHAR(255),
     payment_support_pdf_path VARCHAR(255),
     bank_statement_pdf_path VARCHAR(255),
     collection_accounts_pdf_path VARCHAR(255),
     personal_reference1_pdf_path VARCHAR(100),
     personal_reference2_pdf_path VARCHAR(100),
     contract_payer_details_pdf_path VARCHAR(255),
     supervisor_details_pdf_path VARCHAR(255),
     residence_receipt_pdf_path VARCHAR(255),
     rut_copy_pdf_path VARCHAR(255),
     FOREIGN KEY (customer_id) REFERENCES customers(id)
);

DROP TABLE documents;