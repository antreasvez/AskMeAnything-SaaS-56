CREATE DATABASE micro_questions;

CREATE TABLE questions(
    questionID serial primary key,
    userID int,
    email varchar(255),
    title varchar(255) not null,
    question_text text not null,
    keywords text[],
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);