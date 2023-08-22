-- Create the OTP verification table
CREATE TABLE otp_verification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp VARCHAR(10) NOT NULL
);

SELECT * FROM otp_verification;

delete FROM otp_verification;

ALTER TABLE otp_verification AUTO_INCREMENT = 1;