import pandas as pd
import numpy as np

# Cargar el archivo CSV
file_path = 'Uligarm_imports.xlsx - Sheet1.csv'
df = pd.read_csv(file_path)

def generate_sql():
    with open('IMPORT.sql', 'w', encoding='utf-8') as f:
        f.write("-- Script de Importación generado automáticamente\n")
        f.write("SET FOREIGN_KEY_CHECKS = 0;\n\n")

        # 1. Tabla PLAYERS
        # Seleccionamos nombres únicos por pj_id
        f.write("-- Inserciones para PLAYERS\n")
        players = df[['player_name', 'pj_id', 'country_name']].dropna(subset=['country_name']).drop_duplicates()
        for _, row in players.iterrows():
            f.write(f"INSERT INTO PLAYERS (player_name, pj_id, country_name) VALUES ('{row['player_name']}', {row['pj_id']}, '{row['country_name']}');\n")

        # 2. Tabla PJ
        f.write("\n-- Inserciones para PJ\n")
        pjs = df[['player_name', 'pj_id', 'pj_name', 'pj_genre', 'pj_level', 'pj_experience', 'pj_race', 'pj_class']].dropna(subset=['pj_class']).drop_duplicates()
        for _, row in pjs.iterrows():
            pj_name = f"'{row['pj_name']}'" if pd.notnull(row['pj_name']) else "NULL"
            f.write(f"INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ('{row['player_name']}', {row['pj_id']}, {pj_name}, '{row['pj_genre']}', {row['pj_level']}, {row['pj_experience']}, '{row['pj_race']}', '{row['pj_class']}');\n")

        # 3. Tabla SPA (Special Abilities)
        f.write("\n-- Inserciones para SPA\n")
        spas = df[['player_name', 'pj_id', 'ability_cant', 'special_ability_name', 'special_ability_description']].dropna(subset=['special_ability_name'])
        for _, row in spas.iterrows():
            # Limpiamos las descripciones de saltos de línea que rompen el SQL
            desc = str(row['special_ability_description']).replace("'", "''").replace("\n", " ")
            f.write(f"INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ('{row['player_name']}', {row['pj_id']}, {row['ability_cant']}, '{row['special_ability_name']}', '{desc}');\n")

        # 4. Tabla STATS
        f.write("\n-- Inserciones para STATS\n")
        stats = df[['player_name', 'pj_id', 'strength', 'strength_mod', 'dexterity', 'dexterity_mod', 'constitution', 'constitution_mod', 'intelligence', 'intelligence_mod', 'wisdom', 'wisdom_mod', 'charisma', 'charisma_mod']].dropna(subset=['strength'])
        for _, row in stats.iterrows():
            f.write(f"INSERT INTO STATS (player_name, pj_id, strength, strength_mod, dexterity, dexterity_mod, constitution, constitution_mod, intelligence, intelligence_mod, wisdom, wisdom_mod, charisma, charisma_mod) VALUES ('{row['player_name']}', {row['pj_id']}, {int(row['strength'])}, {int(row['strength_mod'])}, {int(row['dexterity'])}, {int(row['dexterity_mod'])}, {int(row['constitution'])}, {int(row['constitution_mod'])}, {int(row['intelligence'])}, {int(row['intelligence_mod'])}, {int(row['wisdom'])}, {int(row['wisdom_mod'])}, {int(row['charisma'])}, {int(row['charisma_mod'])});\n")

        f.write("\nSET FOREIGN_KEY_CHECKS = 1;")

    print("Archivo IMPORT.sql generado exitosamente.")

if __name__ == "__main__":
    generate_sql()