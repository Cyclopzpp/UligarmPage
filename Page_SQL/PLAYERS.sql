CREATE TABLE PLAYERS (

    player_name VARCHAR(100) NOT NULL,
    player_passwd VARCHAR(20) NOT NULL,
    pj_id INT NOT NULL,
    country_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (player_name, pj_id)
    ALTER TABLE PLAYERS 
    MODIFY COLUMN player_passwd VARCHAR(255) NOT NULL;
    
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

CREATE TABLE STATS (

    player_name VARCHAR(100) NOT NULL,
    pj_id INT NOT NULL,
    strength INT,
    strength_mod INT,
    dexterity INT,
    dexterity_mod INT,
    constitution INT,
    constitution_mod INT,
    intelligence INT,
    intelligence_mod INT,
    wisdom INT,
    wisdom_mod INT,
    charisma INT,
    charisma_mod INT,
    PRIMARY KEY (player_name, pj_id),
    CHECK (strength BETWEEN 1 AND 20),
    CHECK (dexterity BETWEEN 1 AND 20),
    CHECK (constitution BETWEEN 1 AND 20),
    CHECK (intelligence BETWEEN 1 AND 20),
    CHECK (wisdom BETWEEN 1 AND 20),
    CHECK (charisma BETWEEN 1 AND 20),
    CHECK (strength_mod = FLOOR((strength - 10) / 2)),
    CHECK (dexterity_mod = FLOOR((dexterity - 10) / 2)),
    CHECK (constitution_mod = FLOOR((constitution - 10) / 2)),
    CHECK (intelligence_mod = FLOOR((intelligence - 10) / 2)),
    CHECK (wisdom_mod = FLOOR((wisdom - 10) / 2)),
    CHECK (charisma_mod = FLOOR((charisma - 10) / 2)),
    FOREIGN KEY (player_name, pj_id) REFERENCES PJ(player_name, pj_id)

);

CREATE TABLE COUNTRIES (
    country_name VARCHAR(30) PRIMARY KEY,
    description TEXT,
    climate VARCHAR(50),
    ruler VARCHAR(100),
    image_url VARCHAR(255)
);

INSERT INTO COUNTRIES (country_name, description, climate, ruler) VALUES 
('Alta del Este', 'Una región montañosa conocida por sus grandes ciudadelas y guerreros valientes.', 'Frío/Montañoso', 'Rey Aldric III'),
('Pir', 'Archipiélago tropical famoso por sus rutas comerciales y gremios de navegantes.', 'Tropical', 'Consejo de Capitanes'),
('Mezonia', 'Extensas llanuras y bosques densos donde la magia fluye de forma natural.', 'Templado', 'La Gran Druida');