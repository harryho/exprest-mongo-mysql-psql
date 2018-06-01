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
createdb sample
pg_restore --no-owner --dbname sample example.dump
psql --dbname sample

psql 

# Rename database -- use double quote 
ALTER database "sample" rename to "sample"
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

#### Run the API

```
git clone https://github.com/harryho/exprest-mongo-mysql-psql
cd exprest-mongo-mysql-psql

# Install packages with npm or yarn
npm i 

npm run

```

### You can run any API you preferred  e.g. MongoDB

**Please make sure MongoDB is running on your OS**

```
# Check mongod service (Linux: Ubuntu/Debian)

systemctl status mongod
npm run start:mongodb

## You will see following information
# Server is running on 127.0.0.1:3001, DB:  mongodb


# You can use wget, curl or browser to test the URL: http://127.0.0.1:3001/api/v1/users


```

### Test API wtih CURL



```
curl -X GET http://127.0.0.1:3001/api/v1/users

# You will see some data as below

...

  { _id: 47,
    email: 'Harrison.Puett@yahoo.com',
    password: 'ff9e460aaca39a2c3bbd68043047826a',
    details: { sex: 'M' },
    created_at: '2009-07-22T01:20:00+10:00',
    deleted_at: null },
  { _id: 48,
    email: 'Granville.Hedgpeth@gmail.com',
    password: '87f0bfd98e2a9b8d30bc1309936744cb',
    details: null,
    created_at: '2009-08-04T00:54:00+10:00',
    deleted_at: null },
...

```