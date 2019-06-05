-- Create user table
CREATE TABLE "user" (
    id serial PRIMARY KEY,
    name VARCHAR(75) NOT NULL,
	role VARCHAR(20) NOT NULL,
	email VARCHAR(50),
	phone VARCHAR(20)
);

-- Create shift table
CREATE TABLE "shift" (
	id serial PRIMARY KEY,
	emp_id INT NOT NULL,
	FOREIGN KEY (emp_id) REFERENCES "user"(id),
	start_time TIMESTAMP NOT NULL,
	end_time TIMESTAMP NOT NULL
);

-- Insert test data into user table
INSERT INTO "user" ("name", "role", "email", "phone") VALUES ('Scout', 'employee', 'scout@me.com', '612-555-1234');
INSERT INTO "user" ("name", "role", "email", "phone") VALUES ('Gatsby', 'employee', 'gatsby@me.com', '612-555-1234');
INSERT INTO "user" ("name", "role", "email", "phone") VALUES ('Lando', 'manager', 'lando@me.com', '651-555-9845');


-- Insert test data into shift table
INSERT INTO "shift" ("emp_id", "start_time", "end_time") VALUES (1, '2019-06-10 12:00:00', '2019-06-10 18:00:00');
INSERT INTO "shift" ("emp_id", "start_time", "end_time") VALUES (2, '2019-06-10 07:00:00', '2019-06-10 11:59:59');
INSERT INTO "shift" ("emp_id", "start_time", "end_time") VALUES (2, '2019-06-12 11:30:00', '2019-06-12 18:00:00');
INSERT INTO "shift" ("emp_id", "start_time", "end_time") VALUES (3, '2019-06-13 07:00:00', '2019-06-13 14:30:00');
INSERT INTO "shift" ("emp_id", "start_time", "end_time") VALUES (1, '2019-06-15 07:00:00', '2019-06-15 14:00:00');
INSERT INTO "shift" ("emp_id", "start_time", "end_time") VALUES (3, '2019-06-11 06:30:00', '2019-06-11 15:00:00');