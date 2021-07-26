CREATE DATABASE AskMeAnything;

CREATE TABLE users (
    uid serial PRIMARY KEY,
    username varchar(250) NOT NULL UNIQUE,
    password varchar(250) NOT NULL,
    email varchar(250) NOT NULL UNIQUE
);

CREATE TABLE questions (
    questionID serial PRIMARY KEY,
    description varchar(1000),
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

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