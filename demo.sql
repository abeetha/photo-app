create table student(
    std_id int,
    name varchar(255),
    address varchar(255),
    tel_no varchar(255),
    mark decimal(10,2)
);

create table userlogin(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
