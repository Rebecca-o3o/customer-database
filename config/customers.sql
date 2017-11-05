DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    customerID SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    birthday TIMESTAMP,
    gender VARCHAR(300) NOT NULL,
    lastContact TIMESTAMP,
    customerLifetimeValue NUMERIC,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO customers (first, last, birthday, gender, lastContact, customerLifetimeValue) VALUES ('Peter', 'Smith', '1996-10-12', 'm', '2017-06-01 23:28:56.782', 191.12);
INSERT INTO customers (first, last, birthday, gender, lastContact, customerLifetimeValue) VALUES ('Anna', 'Hopp', '1987-05-03', 'w', '2017-07-08 13:18:56.888', 50.99);
INSERT INTO customers (first, last, birthday, gender, lastContact, customerLifetimeValue) VALUES ('Christian', 'Cox', '1991-02-21', 'm', '2017-08-01 11:57:47.142', 0);
INSERT INTO customers (first, last, birthday, gender, lastContact, customerLifetimeValue) VALUES ('Roxy', 'Fox', '1979-06-30', 'w', '2017-01-29 21:08:50.700', 213.12);
INSERT INTO customers (first, last, birthday, gender, lastContact, customerLifetimeValue) VALUES ('Eric', 'Adam', '1969-11-21', 'm', '2017-03-18 12:20:06.702', 1019.91);
