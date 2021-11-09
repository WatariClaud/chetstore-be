-- users table
create table users (userid serial primary key, name varchar(50), email varchar(50), password text);

-- products table
create table products (productid serial primary key, productname varchar(50), productcost integer, productdescription text, productimage varchar(200));

-- carts table
create table carts (cartid serial primary key, byuser integer, productid integer);