import pandas as pd
import numpy as np

# Configuración de archivos
FILE_PATH = 'Uligarm_imports.xlsx'
OUTPUT_SQL = '.\Page_SQL\IMPORT.sql'

def clean_sql_value(val, is_string=True):
    """
    Maneja valores nulos y escapa caracteres especiales para SQL.
    Evita que valores como 'NULL' se escriban entre comillas.
    """
    if pd.isna(val) or val == 'NULL':
        return "NULL"
    if is_string:
        # Escapa comillas simples duplicándolas (estándar SQL)
        cleaned = str(val).replace("'", "''").replace("\n", " ")
        return f"'{cleaned}'"
    return str(val)

def generate_sql():
    try:
        # Cargar el archivo Excel
        df = pd.read_excel(FILE_PATH)
        
        with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
            f.write("-- Script de Importación Optimizado\n")
            f.write("SET FOREIGN_KEY_CHECKS = 0;\n\n")

            # --- 1. PLAYERS ---
            f.write("-- Inserciones para PLAYERS\n")
            # Agrupamos por player_name y pj_id para asegurar unicidad antes de insertar
            players = df[['player_name', 'player_passwd', 'pj_id', 'country_name']].dropna(subset=['country_name']).drop_duplicates()
            for _, row in players.iterrows():
                f.write(f"INSERT INTO PLAYERS (player_name, player_passwd, pj_id, country_name) VALUES ({clean_sql_value(row['player_name'])}, '12ab', {row['pj_id']}, {clean_sql_value(row['country_name'])});\n")

            # --- 2. PJ ---
            f.write("\n-- Inserciones para PJ\n")
            # Filtramos por pj_class para evitar filas vacías
            pjs = df[['player_name', 'pj_id', 'pj_name', 'pj_genre', 'pj_level', 'pj_experience', 'pj_race', 'pj_class']].dropna(subset=['pj_class']).drop_duplicates()
            for _, row in pjs.iterrows():
                f.write(f"INSERT INTO PJ (player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class) VALUES ("
                        f"{clean_sql_value(row['player_name'])}, {row['pj_id']}, {clean_sql_value(row['pj_name'])}, "
                        f"{clean_sql_value(row['pj_genre'])}, {int(row['pj_level'])}, {int(row['pj_experience'])}, "
                        f"{clean_sql_value(row['pj_race'])}, {clean_sql_value(row['pj_class'])});\n")

            # --- 3. SPA (Special Abilities) ---
            f.write("\n-- Inserciones para SPA\n")
            spas = df[['player_name', 'pj_id', 'ability_cant', 'special_ability_name', 'special_ability_description']].dropna(subset=['special_ability_name'])
            for _, row in spas.iterrows():
                f.write(f"INSERT INTO SPA (player_name, pj_id, ability_cant, special_ability_name, special_ability_description) VALUES ("
                        f"{clean_sql_value(row['player_name'])}, {row['pj_id']}, {int(row['ability_cant'])}, "
                        f"{clean_sql_value(row['special_ability_name'])}, {clean_sql_value(row['special_ability_description'])});\n")

            # --- 4. STATS ---
            f.write("\n-- Inserciones para STATS\n")
            # Solo procesamos filas que tengan fuerza definida
            stats = df[['player_name', 'pj_id', 'strength', 'strength_mod', 'dexterity', 'dexterity_mod', 
                        'constitution', 'constitution_mod', 'intelligence', 'intelligence_mod', 
                        'wisdom', 'wisdom_mod', 'charisma', 'charisma_mod']].dropna(subset=['strength'])
            
            for _, row in stats.iterrows():
                # Convertimos a int para evitar el formato .0 en los números del SQL
                vals = [clean_sql_value(row['player_name']), row['pj_id']] + [int(row[c]) for c in stats.columns[2:]]
                f.write(f"INSERT INTO STATS VALUES ({', '.join(map(str, vals))});\n")

            f.write("\nSET FOREIGN_KEY_CHECKS = 1;")

        print(f"Éxito: {OUTPUT_SQL} generado correctamente.")

    except Exception as e:
        print(f"Error durante la generación: {e}")

if __name__ == "__main__":
    generate_sql()