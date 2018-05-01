## Express REST API demo with MongoDB, MySql, PostgreSQL


> This demo app is developed on Ubuntu 16 

### Prerequisite 

* Install MonogoDB, MySql, PostgreSQL
* Install NodeJs, ExpressJs


### Install PostgresQL

* psql is case sensitive

```
echo 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main' >> /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

sudo apt-get update
sudo apt-get install postgresql-10

sudo su - postgres
psql -U postgres

# Create a dump databbase
curl -L -O http://cl.ly/173L141n3402/download/example.dump
createdb pgguide
pg_restore --no-owner --dbname pgguide example.dump
psql --dbname pgguide

psql 

# Rename database -- use double quote 
ALTER database "pgguide" rename to "sample"
```

* export the database to sql file

```
sudo su postgres
pg_dump sample >> sample.sql
```

* export table to csv file

```
COPY users to '/home/<your_name>/db/users.csv' delimiter ',' csv; 
```

* export data to json file

```
select json_agg(t) from (select * from users) t \t on \pset format unaligned \g users.json
```


### Install MySql

* Install mysql 

```
wget https://dev.mysql.com/get/mysql-apt-config_0.8.9-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.9-1_all.deb
sudo apt-get install mysql-server
systemctl status mysql
mysqladmin -u root -p version

mysql -u root -p mysql
```

* create a sample table users

```
CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    details VARCHAR(5000),
    created_at datetime,
    deleted_at datetime
    ,PRIMARY KEY (id)
);

load data local infile '/home/<your_name>/db/users.csv' into table users fields terminated by ',' enclosed by '"' lines terminated by '\n' (id, title, price, created_at, deleted_at, tags);
```



### Install mongodb

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

sudo apt-get update
sudo apt-get install -y mongodb-org

sudo service mongod start
sudo service mongod stop
sudo service mongod status

```

* Create a database `sample` and insert one record into document `users`

```
use sample
db.users.insertOne({id: 1, title: "Dictionary", price: 9.99, created_at: "2011-01-02 07:00:00+11", tags: "{Book}"});

db.users.find();
```

* Import json into database


```
mongoimport --db sample --collection users --drop --jsonArray --file ~/db/users.json
```




###  Install express-generator

```
 npm install express-generator -g
```


## Run & Test the API



```
git clone 
```


