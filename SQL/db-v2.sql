/*
heroku postgress db name = postgresql-metric-65706
heroku cloud app name = shielded-reef-62106
use this command to login to heroku db in shielded-reef-62106 cloud app:
	heroku pg:psql postgresql-metric-65706
after logging in you can run sql at cmd prompt to create , selecte, update db tables
	shielded-reef-62106::DATABASE=>
*/

/*localhost db (MyPHPAdmin)*/
CREATE DATABASE familyhistory;
\c familyhistory;

/*localhost db (MyPHPAdmin)*/
CREATE USER admin_user WITH PASSWORD 'admin_pass';
GRANT SELECT, INSERT, UPDATE ON person TO admin_user;
GRANT USAGE, SELECT ON SEQUENCE person_id_seq TO admin_user;

/*localhost db (MyPHPAdmin) + heroku cloud app*/
CREATE TABLE person_table (
  person_id     serial       PRIMARY KEY,
  first_name    VARCHAR(50)  NOT NULL,
  last_name     VARCHAR(50)  NOT NULL,
  date_of_birth DATE
);

/*localhost db (MyPHPAdmin) + heroku cloud app*/
CREATE TABLE relationship_table (
  parent_id int REFERENCES person_table(person_id),
  child_id int REFERENCES person_table(person_id)
);


/*localhost db (MyPHPAdmin) + heroku cloud app*/
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('Steve', 'Rodgers', '1918-07-04');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('Peter', 'Parker', '1968-07-07');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('Reed', 'Richards', '1966-01-16');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('James', 'Tanton', '1967-02-27');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES 
('Kimberly', 'Llanos', '1967-04-01');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('Joshua', 'Van Ness', '1989-09-08');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('Karley', 'Quick', '1996-06-25');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('Katelyn', 'Tanton', '2004-11-06');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('Emily', 'Tanton', '2006-04-10');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('Juan', 'Llanos', '1947-01-13');
INSERT INTO person_table(first_name, last_name, date_of_birth) VALUES ('Edith', 'Llanos', '1950-04-26');


INSERT INTO relationship_table VALUES (4, 8);  -- James to Katelyn
INSERT INTO relationship_table VALUES (4, 9);  -- James to Emily
INSERT INTO relationship_table VALUES (5, 6);  -- Kimberly to Joshua
INSERT INTO relationship_table VALUES (5, 7);  -- Kimberly to Karley
INSERT INTO relationship_table VALUES (5, 8);  -- Kimberly to Katelyn
INSERT INTO relationship_table VALUES (5, 9);  -- Kimberly to Emily
INSERT INTO relationship_table VALUES (10, 5);  -- Juan to Kimberly
INSERT INTO relationship_table VALUES (11, 5);  -- Edith to Kimberly

/*add whatever id you want to query here*/
SELECT FROM person_table first_name, last_name, date_of_birth WHERE (SELECT relationship_table.parent_id WHERE relationship_table.child_id = childID) = id;

SELECT person_id FROM person_table WHERE (SELECT parent_id WHERE child_id = childID) = id;


/*localhost db (MyPHPAdmin) + heroku cloud app*/
/*getPerson ->*/
SELECT * from person_table WHERE person_id = id;

/*localhost db (MyPHPAdmin) + heroku cloud app*/
/*getParents ->*/
SELECT parent_id FROM relationship_table WHERE child_id = id;

/*localhost db (MyPHPAdmin) + heroku cloud app*/
/*etChildren ->*/
SELECT child_id FROM relationship_table WHERE parent_id = id;
