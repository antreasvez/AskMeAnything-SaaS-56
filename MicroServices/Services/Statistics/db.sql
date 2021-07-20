CREATE DATABASE micro_stats_questions;

CREATE TABLE questions(
    questionID serial primary key,
    -- userID int,                      --no need for this
    -- title varchar(255) not null,     --or this
    -- question_text text not null,     --or this
    keywords text[],
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);