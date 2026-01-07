-- Script de Importación Optimizado
SET FOREIGN_KEY_CHECKS = 0;

-- Inserciones para PLAYERS
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('AntonioE', '12ab', 1, 'Alta del Este');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('BastianP', '12ab', 2, 'Alta del Este');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('CristobalJ', '12ab', 3, 'Alta del Este');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('JavieraP', '12ab', 4, 'Alta del Este');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('MauricioB', '12ab', 5, 'Alta del Este');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('CamilaP', '12ab', 6, 'Pir');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('CarlaB', '12ab', 7, 'Pir');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('RaquelA', '12ab', 8, 'Pir');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('FabianG', '12ab', 9, 'Mezonia');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('FernandaH', '12ab', 10, 'Mezonia');
INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ('PalomaO', '12ab', 11, 'Mezonia');

-- Inserciones para PJ
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('AntonioE', 1, 'Ibro Hamok', 'M', 1, 0, 'Humano', 'Brujo');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('BastianP', 2, 'Raychin Gueña', 'M', 1, 0, 'Minotauro', 'Barbaro');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('CristobalJ', 3, 'Sento Hasegawa', 'M', 1, 0, 'Tieffling', 'Paladin');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('JavieraP', 4, NULL, 'F', 1, 0, 'Mediano', 'Monje');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('MauricioB', 5, 'Lucanar Tarknus', 'M', 1, 0, 'Humano+', 'Guerrero');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('CamilaP', 6, 'Krivna Jeryn', 'F', 1, 0, 'Draconido', 'Guerrero');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('CarlaB', 7, NULL, 'F', 1, 0, 'Draconido', 'Hechicero');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('RaquelA', 8, 'Sira Strand', 'F', 1, 0, 'Elfo del Bosque', 'Bardo');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('FabianG', 9, 'Vexillum Viride', 'M', 1, 0, 'Humano', 'Picaro');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('FernandaH', 10, NULL, 'F', 1, 0, 'Elfo', 'Cleriego');
INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('PalomaO', 11, NULL, 'F', 1, 0, 'Drow', 'Hechicero');

-- Inserciones para SPA
INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ('AntonioE', 1, 1, 'Swap', 'Realiza un cambio de almas entre el usuario y su contratante que dura 1 minuto (fuera de combate) o 2 turnos (dentro de combate). El alma del usuario vuelve una vez pasado el tiempo, todo el daño recibido es compartido. Si el contratante es derrotado antes de que se acabe el tiempo, el usuario vuelve sin rasjuños.');
INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ('BastianP', 2, 1, 'Suena el Punch', 'El usuario acumula todo el daño inflingido, recibido y curado en el turno, para liberarlo en un golpe devastador en su siguiente ataque. Este golpe equivale a 1D12 + acumulado. En caso que no pueda acumular nada, el objetivo obtendra un estado negativo elegido por el usuario: Stun (20 segundos / 1 turno), Sangrado (30 segundos / 2 turnos) o Confusion (40 segundos / 3 Turnos)');
INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ('CristobalJ', 3, 1, 'Black Celebration', 'Convierte aliados en un liquido a eleccion, saltandose el siguiente turno de sus aliados, a cambio, los cura levemente y son inmunes al daño, efectos cualquieras, etc. Cualquier efecto aplicado antes de la liquidificacion es eliminado al final del efecto. 1 uso por descanso.');
INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ('MauricioB', 5, 1, 'Iron Maiden', 'El usuario es capaz de manipular los metales que lo rodean (hasta 25 metros de distancia), haciendo formas varias de defensas y ataques que benefician a si mismo y a sus aliados.');
INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ('CamilaP', 6, 1, 'Sora', 'Aguila. Stats: 8STR ; 18DEX ; 10CON ; 10INT ; 12WIS ; 14CAR. Puede causar un destello cegante a merced de su usuario (20 segundos / 1 turno), ademas, puede volar por su cuenta (30 metros de altura, alejarse 20 metros del usuario maximo en otra direccion) y el usuario puede ver a traves de los ojos de Sora, quedando limitado a ver lo que este hace (no puede hacer mas que ver a traves de Sora y hablar con su propio cuerpo).');
INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ('RaquelA', 8, 1, 'Princesita', 'OsoBuho. Stats: 18STR ; 14DEX ; 16CON ; 8INT ; 6WIS ; 10CAR. Ataca con sus garras afiladas, haciendo 2d12 de daño + sangrado a partir de "AC_enemigo + 2".');
INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ('FabianG', 9, 1, 'Suerte++', 'Usa suerte de golpe, siguiente tirada se calcula como: "Suerte ganada / 2" De manera que se redondea a lo mas alto. La suerte se gana con un sistema de karma.');
INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ('FabianG', 9, 2, 'Sombras', 'El usuario puede viajar mediante las sombras (hasta 25 metros de distancia), recibiendo 1D4 de daño mediante un chance, calculado como "1/2^(8-n)", siendo n el numero de veces que se usa la habilidad antes de un descanso largo. ');

-- Inserciones para STATS
INSERT INTO STATS VALUES ('AntonioE', 1, 5, -3, 12, 1, 13, 1, 10, 0, 13, 1, 15, 2);
INSERT INTO STATS VALUES ('BastianP', 2, 14, 2, 10, 0, 15, 2, 12, 1, 7, -2, 14, 2);
INSERT INTO STATS VALUES ('CristobalJ', 3, 9, -1, 15, 2, 18, 4, 5, -3, 15, 2, 11, 0);
INSERT INTO STATS VALUES ('JavieraP', 4, 10, 0, 16, 3, 13, 1, 7, -2, 15, 2, 9, -1);
INSERT INTO STATS VALUES ('MauricioB', 5, 11, 0, 13, 1, 12, 1, 14, 2, 11, 0, 15, 2);
INSERT INTO STATS VALUES ('CamilaP', 6, 9, -1, 13, 1, 13, 1, 11, 0, 12, 1, 16, 3);
INSERT INTO STATS VALUES ('CarlaB', 7, 14, 2, 14, 2, 14, 2, 9, -1, 8, -1, 8, -1);
INSERT INTO STATS VALUES ('RaquelA', 8, 10, 0, 16, 3, 14, 2, 9, -1, 13, 1, 16, 3);
INSERT INTO STATS VALUES ('FabianG', 9, 9, -1, 18, 4, 12, 1, 15, 2, 13, 1, 15, 2);
INSERT INTO STATS VALUES ('FernandaH', 10, 12, 1, 11, 0, 12, 1, 6, -2, 17, 3, 10, 0);
INSERT INTO STATS VALUES ('PalomaO', 11, 9, -1, 14, 2, 14, 2, 10, 0, 6, -2, 16, 3);

SET FOREIGN_KEY_CHECKS = 1;