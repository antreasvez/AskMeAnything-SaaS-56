CREATE DATABASE micro_auth;

CREATE TABLE users(
    userID serial primary key,
    email varchar(250) not null unique,
    password varchar(250) not null
);

CREATE TABLE expired_tokens(
    tokenID varchar(255) primary key
);