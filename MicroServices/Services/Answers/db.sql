CREATE DATABASE micro_answers;

CREATE TABLE answers(
    answerID serial primary key,
    userID int,
    questionID int,
    answer_text text not null,
    answered_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);