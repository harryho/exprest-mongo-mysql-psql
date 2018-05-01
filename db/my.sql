

CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255),
    price DECIMAL(10, 2)  NOT NULL,
    created_at datetime,
    deleted_at datetime,
    tags VARCHAR(255)
    ,PRIMARY KEY (id)
);

CREATE TABLE purchase_items (
    id INT AUTO_INCREMENT NOT NULL,
    purchase_id INT,
    product_id INT,
    price numeric,
    quantity INT,
    state VARCHAR(255)
    ,PRIMARY KEY (id)
);


CREATE TABLE purchases (
    id INT AUTO_INCREMENT NOT NULL,
    created_at datetime,
    name VARCHAR(255),
    address VARCHAR(255),
    state VARCHAR(2),
    zipcode INT,
    user_id INT
    ,PRIMARY KEY (id)
);
    


CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    details VARCHAR(5000),
    created_at datetime,
    deleted_at datetime
    ,PRIMARY KEY (id)
);

load data local infile '/home/hho/db/products.csv' into table products fields terminated by ',' enclosed by '"' lines terminated by '\n' ;
load data local infile '/home/hho/db/users.csv' into table users fields terminated by ',' enclosed by '"' lines terminated by '\n' ;
load data local infile '/home/hho/db/purchases.csv' into table purchases fields terminated by ',' enclosed by '"' lines terminated by '\n' ;
load data local infile '/home/hho/db/purchase_items.csv' into table purchase_items fields terminated by ',' enclosed by '"' lines terminated by '\n' ;
;
--- (id, title, price, created_at, deleted_at, tags);

