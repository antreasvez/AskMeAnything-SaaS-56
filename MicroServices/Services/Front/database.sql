CREATE DATABASE micro_front;

CREATE TABLE users (
    uid serial PRIMARY KEY,
    username varchar(250) NOT NULL UNIQUE,
    password varchar(250) NOT NULL,
    email varchar(250) NOT NULL UNIQUE
);

CREATE TABLE sessions(
    sid character varying(255) primary key not null,
    sess json not null,
    expire timestamp(6) without time zone not null
);

CREATE TABLE questions(
    qid int generated always as identity,
    uid int,
    question varchar(255) not null,
    information text not null,
    tags text[],
    qTime TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    primary key(qid),
    constraint fk_user foreign key(uid) references users(uid) on delete no action
);

CREATE TABLE answers(
    aid serial primary key,
    uid int,
    qid int,
    answer text not null,
    aTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    constraint fk_user foreign key(uid) references users(uid) on delete no action,
    constraint fk_question foreign key(qid) references questions(qid) on delete no action
);