CREATE DATABASE clan_roster;

USE clan_roster;

CREATE TABLE members (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    therol VARCHAR(20),
    nickname VARCHAR(20),
    therank VARCHAR(20),
    theimg VARCHAR(10000)
);