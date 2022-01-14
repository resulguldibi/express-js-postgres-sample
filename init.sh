#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "postgresuser" <<-EOSQL
	create database express;
EOSQL

psql -v ON_ERROR_STOP=1 --username "postgresuser" --dbname "express" <<-EOSQL
	CREATE TABLE customers(id INTEGER PRIMARY KEY, name VARCHAR);
	insert into customers(id,name) values(1,'resul güldibi');
EOSQL