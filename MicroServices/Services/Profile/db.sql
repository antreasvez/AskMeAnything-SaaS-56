CREATE DATABASE micro_profile;

CREATE TABLE questions(
    questionID serial primary key,
    userID int,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    
);

CREATE TABLE answers(
    answerID serial primary key,
    userID int,
    answered_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);