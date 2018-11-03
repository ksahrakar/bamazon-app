create database bamazon;
use bamazon;
create table products(
	item_id varchar(15) unique not null,
    product_name varchar(100),
    department_name varchar(50),
    price dec (10,2),
    stock_quantity int(10)
);

insert into products values("CP12009","OnePlus 6T","cell phones",580,18);
insert into products values("CP12099","iPhone 1/2Xs","cell phones",1099,2);
insert into products values("CP11909","Samsung Galaxy Note 5","cell phones",899,10);
insert into products values("CPA12109","USB C Charger","cell phone accessories",39,40);
insert into products values("CPA12209","iPhone 10Xs case","cell phone accessories",59,23);
insert into products values("EA12079","Micro SD card 128GB","electronic accessories",29,56);
insert into products values("EA16551","12V Charger","electronic accessories",10,24);
insert into products values("APP99301","Vuarnet Sunglasses","apparel",130,13);
insert into products values("APP99530","Faux gold chain","apparel",15,80);
insert into products values("APP99501","Tongue ring","apparel",14,17);