CREATE TABLE IF NOT EXISTS user_profile (
	user_id serial PRIMARY KEY,
	first_name VARCHAR ( 50 ) NOT NULL,
	last_name VARCHAR ( 50 ) NOT NULL,
	display_name VARCHAR ( 100 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	work_phone VARCHAR (20) NOT NULL,
	personal_phone VARCHAR (20),
	location varchar( 80),
	created_on TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO user_profile( first_name, last_name, display_name, email, work_phone, personal_phone, location) 
VALUES( 'sarah', 'win', 'sarah win','sarah.win@gmail.com', 1234, 5678, 'vja');