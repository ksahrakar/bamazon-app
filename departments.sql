use bamazon;
create table departments(
    department_id int(10) unique not null,
    department_name varchar(35),
    overhead int(10),
    sales dec(10,2)
);
insert into departments (department_id,department_name, overhead)
values (37,"apparel", 200);
insert into departments (department_id,department_name, overhead)
values (45,"cell phones", 700);
insert into departments (department_id,department_name, overhead)
values (46,"cell phone accessories", 350);
insert into departments (department_id,department_name, overhead)
values (19,"electronic accessories", 250);