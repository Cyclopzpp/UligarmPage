CREATE TABLE PLAYERS (

    player_name VARCHAR(100) NOT NULL,
    pj_id INT NOT NULL,
    country_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (player_name, pj_id)

);

CREATE TABLE PJ (
    
    player_name VARCHAR(100) NOT NULL,
    pj_id INT NOT NULL,
    pj_name VARCHAR(50),
    pj_genre CHAR(1), -- "F" o "M"
    pj_level INT,
    pj_experience INT,
    pj_race VARCHAR(30),
    pj_class VARCHAR(30),
    PRIMARY KEY (player_name, pj_id),
    FOREIGN KEY (player_name, pj_id) REFERENCES PLAYERS(player_name, pj_id)

);

CREATE TABLE SPA (

    player_name VARCHAR(100) NOT NULL,
    pj_id INT NOT NULL,
    ability_cant INT NOT NULL,
    special_ability_name VARCHAR(100),
    special_ability_description TEXT,
    PRIMARY KEY (player_name, pj_id, ability_cant),
    CHECK (ability_cant IN (1, 2)),
    FOREIGN KEY (player_name, pj_id) REFERENCES PLAYERS(player_name, pj_id)
    
);