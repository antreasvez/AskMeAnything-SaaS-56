CREATE DATABASE micro_post_questions;

CREATE TABLE questions(
    questionID serial primary key,
    userID int,
    title varchar(255) not null,
    question_text text not null,
    keywords text[],
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);