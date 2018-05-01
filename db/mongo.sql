mongoimport --db sample --collection products --drop --jsonArray --file ~/db/products.json
mongoimport --db sample --collection purchases --drop --jsonArray --file ~/db/purchases.json
mongoimport --db sample --collection purchase_items --drop --jsonArray --file ~/db/purchase_items.json
mongoimport --db sample --collection users --drop --jsonArray --file ~/db/users.json