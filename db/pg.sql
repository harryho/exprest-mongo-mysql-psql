COPY products to '/home/<your_name>/db/products.csv' delimiter ',' csv; 
COPY purchase_items to '/home/<your_name>/db/purchase_items.csv' delimiter ',' csv; 
COPY purchases to '/home/<your_name>/db/purchases.csv' delimiter ',' csv; 
COPY users to '/home/<your_name>/db/users.csv' delimiter ',' csv; 

select json_agg(t) from (select * from products) t \t on \pset format unaligned \g products.json
select json_agg(t) from (select * from users) t \t on \pset format unaligned \g users.json
select json_agg(t) from (select * from purchases) t \t on \pset format unaligned \g purchases.json
select json_agg(t) from (select * from purchase_items) t \t on \pset format unaligned \g purchase_items.json