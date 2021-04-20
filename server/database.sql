CREATE DATABASE AskMeAnything;

CREATE TABLE users (
    uid serial PRIMARY KEY,
    username varchar(250),
    password varchar(250),
    email varchar(250)
);
