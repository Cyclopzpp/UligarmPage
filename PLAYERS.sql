CREATE TABLE PLAYERS (

    player_name VARCHAR(100) PRIMARY KEY NOT NULL,
    pj_id INT PRIMARY KEY NOT NULL,
    country_name VARCHAR(30) NOT NULL,
    pj_name as FOREIGN KEY (player_name, pj_id) REFERENCES PJ(player_name, pj_id)

)