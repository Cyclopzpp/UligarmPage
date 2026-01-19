import re

def parse_sql_to_js(sql_content):
    # Países ya definidos
    paises = [
        { 
            'nombre': 'Alta del Este', 
            'descripcion': 'Una región montañosa conocida por sus grandes ciudadelas y guerreros valientes.', 
            'clima': 'Frío/Montañoso', 
            'gobernante': 'Rey Aldric III' 
        },
        { 
            'nombre': 'Pir', 
            'descripcion': 'Archipiélago tropical famoso por sus rutas comerciales y gremios de navegantes.', 
            'clima': 'Tropical', 
            'gobernante': 'Consejo de Capitanes' 
        },
        { 
            'nombre': 'Mezonia', 
            'descripcion': 'Extensas llanuras y bosques densos donde la magia fluye de forma natural.', 
            'clima': 'Templado', 
            'gobernante': 'La Gran Druida' 
        }
    ]
    
    # Diccionarios para almacenar datos
    players = {}
    pjs = {}
    stats = {}
    spas = {}
    
    # Parsear SQL
    lines = sql_content.split('\n')
    
    for line in lines:
        line = line.strip()
        
        # PLAYERS
        if line.startswith('INSERT INTO PLAYERS'):
            match = re.search(r"\('(.+?)', '(.+?)', (\d+), '(.+?)'\)", line)
            if match:
                player_name, player_passwd, pj_id, country_name = match.groups()
                players[player_name] = {
                    'player_name': player_name,
                    'player_passwd': player_passwd,
                    'pj_id': int(pj_id),
                    'country_name': country_name
                }
        
        # PJ
        elif line.startswith('INSERT INTO PJ'):
            match = re.search(r"\('(.+?)', (\d+), '(.+?)', '(.+?)', (\d+), (\d+), '(.+?)', '(.+?)'\)", line)
            if match:
                player_name, pj_id, pj_name, pj_genre, pj_level, pj_experience, pj_race, pj_class = match.groups()
                # Manejar valores NULL
                if pj_name.upper() == 'NULL':
                    pj_name = None
                
                pjs[player_name] = {
                    'pj_name': pj_name,
                    'pj_genre': pj_genre,
                    'pj_level': int(pj_level),
                    'pj_experience': int(pj_experience),
                    'pj_race': pj_race,
                    'pj_class': pj_class
                }
        
        # SPA
        elif line.startswith('INSERT INTO SPA'):
            match = re.search(r"\('(.+?)', (\d+), (\d+), '(.+?)', '(.+?)'\)", line)
            if match:
                player_name, pj_id, ability_cant, special_ability_name, special_ability_description = match.groups()
                
                if player_name not in spas:
                    spas[player_name] = []
                
                spas[player_name].append({
                    'special_ability_name': special_ability_name,
                    'special_ability_description': special_ability_description
                })
        
        # STATS
        elif line.startswith('INSERT INTO STATS VALUES'):
            match = re.search(r"\('(.+?)', (\d+), (\d+), (-?\d+), (\d+), (\d+), (\d+), (\d+), (\d+), (\d+), (-?\d+), (\d+), (-?\d+), (\d+), (-?\d+), (\d+), (-?\d+)\)", line)
            if match:
                player_name, pj_id, str_val, str_mod, dex_val, dex_mod, con_val, con_mod, int_val, int_mod, wis_val, wis_mod, cha_val, cha_mod = match.groups()
                
                stats[player_name] = {
                    'strength': int(str_val),
                    'strength_mod': int(str_mod),
                    'dexterity': int(dex_val),
                    'dexterity_mod': int(dex_mod),
                    'constitution': int(con_val),
                    'constitution_mod': int(con_mod),
                    'intelligence': int(int_val),
                    'intelligence_mod': int(int_mod),
                    'wisdom': int(wis_val),
                    'wisdom_mod': int(wis_mod),
                    'charisma': int(cha_val),
                    'charisma_mod': int(cha_mod)
                }
    
    # Construir usuarios
    usuarios = []
    for player_name in players.keys():
        usuario = {
            'player_name': player_name,
            'player_passwd': players[player_name]['player_passwd'],
            'pj_id': players[player_name]['pj_id'],
            'country_name': players[player_name]['country_name'],
            'pj': pjs.get(player_name, {}),
            'stats': stats.get(player_name, {}),
            'habilidades': spas.get(player_name, [])
        }
        usuarios.append(usuario)
    
    # Generar archivo JS
    js_content = """// 📄 data.js - Base de datos simulada
const paises = [
    { 
        nombre: 'Alta del Este', 
        descripcion: 'Una región montañosa conocida por sus grandes ciudadelas y guerreros valientes.', 
        clima: 'Frío/Montañoso', 
        gobernante: 'Rey Aldric III' 
    },
    { 
        nombre: 'Pir', 
        descripcion: 'Archipiélago tropical famoso por sus rutas comerciales y gremios de navegantes.', 
        clima: 'Tropical', 
        gobernante: 'Consejo de Capitanes' 
    },
    { 
        nombre: 'Mezonia', 
        descripcion: 'Extensas llanuras y bosques densos donde la magia fluye de forma natural.', 
        clima: 'Templado', 
        gobernante: 'La Gran Druida' 
    }
];

// Usuarios de ejemplo (se guardarán en localStorage)
const usuariosEjemplo = [
"""

    for i, usuario in enumerate(usuarios):
        js_content += "    {\n"
        js_content += f"        player_name: '{usuario['player_name']}',\n"
        js_content += f"        player_passwd: '{usuario['player_passwd']}',\n"
        js_content += f"        pj_id: {usuario['pj_id']},\n"
        js_content += f"        country_name: '{usuario['country_name']}',\n"
        
        # PJ
        js_content += "        pj: {\n"
        pj = usuario['pj']
        for key, value in pj.items():
            if value is None:
                js_content += f"            {key}: null,\n"
            elif isinstance(value, str):
                js_content += f"            {key}: '{value}',\n"
            else:
                js_content += f"            {key}: {value},\n"
        js_content = js_content.rstrip(',\n') + "\n        },\n"
        
        # Stats
        js_content += "        stats: {\n"
        stats_data = usuario['stats']
        for key, value in stats_data.items():
            js_content += f"            {key}: {value},\n"
        js_content = js_content.rstrip(',\n') + "\n        },\n"
        
        # Habilidades
        js_content += "        habilidades: [\n"
        for habilidad in usuario['habilidades']:
            js_content += "            {\n"
            js_content += f"                special_ability_name: '{habilidad['special_ability_name']}',\n"
            # Escapar comillas simples en la descripción
            desc = habilidad['special_ability_description'].replace("'", "\\'")
            js_content += f"                special_ability_description: '{desc}'\n"
            js_content += "            },\n"
        if usuario['habilidades']:
            js_content = js_content.rstrip(',\n') + "\n"
        js_content += "        ]\n"
        
        js_content += "    }"
        if i < len(usuarios) - 1:
            js_content += ",\n"
    
    js_content += "\n];\n"
    
    return js_content

# Leer el archivo SQL
with open('IMPORT.sql', 'r', encoding='utf-8') as file:
    sql_content = file.read()

# Convertir a JS
js_result = parse_sql_to_js(sql_content)

# Guardar resultado
with open('data.js', 'w', encoding='utf-8') as file:
    file.write(js_result)

print("✅ Archivo 'data.js' generado exitosamente!")