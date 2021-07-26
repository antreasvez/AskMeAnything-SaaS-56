CREATE DATABASE AskMeAnything;

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

--------------------------------------

CREATE TABLE answers (
    answerID serial PRIMARY KEY,
    description varchar(1000),
    date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE keyword (
    name PRIMARY KEY
);




/* One to many relationship */

ALTER TABLE
    answers
ADD CONSTRAINT
    userID
FOREIGN KEY (uid) REFERENCES users

ALTER TABLE
    answers
ADD CONSTRAINT
    questionID
FOREIGN KEY (questionID) REFERENCES questions
/* Answers FK = userID, questionID  */


/* One user makes many questions */
ALTER TABLE
    questions
ADD CONSTRAINT
    userID
FOREIGN KEY (uid) REFERENCES users