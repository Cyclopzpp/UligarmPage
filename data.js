const paises = [
    { 
        nombre: 'Alta del Este', 
        descripcion: 'Una región arenosa, tierra de nadie', 
        clima: 'Arido', 
        gobernante: 'No Existe' 
    },
    { 
        nombre: 'Pir', 
        descripcion: 'Archipiélago tropical famoso por sus rutas comerciales y gremios de navegantes.', 
        clima: 'Tropical', 
        gobernante: 'Reina Gladia' 
    },
    { 
        nombre: 'Mezonia', 
        descripcion: 'Un gran bosque con una gran precencia de magia.', 
        clima: 'Templado', 
        gobernante: 'La Gran Druida' 
    }
];

const usuariosEjemplo = [
    {
        player_name: 'AntonioE',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Alta del Este',
        pj: {
            pj_name: 'Ibro Hamok',
            pj_genre: 'M',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Humano',
            pj_class: 'Brujo'
        },
        stats: {
            strength: 5,
            strength_mod: -3,
            dexterity: 12,
            dexterity_mod: 1,
            constitution: 13,
            constitution_mod: 1,
            intelligence: 10,
            intelligence_mod: 0,
            wisdom: 13,
            wisdom_mod: 1,
            charisma: 15,
            charisma_mod: 2
        },
        habilidades: [
            {
                special_ability_name: 'Swap',
                special_ability_description: 'Realiza un cambio de almas entre el usuario y su contratante que dura 1 minuto (fuera de combate) o 2 turnos (dentro de combate). El alma del usuario vuelve una vez pasado el tiempo, todo el daño recibido es compartido. Si el contratante es derrotado antes de que se acabe el tiempo, el usuario vuelve sin rasjuños.'
            }
        ]
    },
    {
        player_name: 'BastianP',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Alta del Este',
        pj: {
            pj_name: 'Raychin Gueña',
            pj_genre: 'M',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Minotauro',
            pj_class: 'Barbaro'
        },
        stats: {
            strength: 14,
            strength_mod: 2,
            dexterity: 10,
            dexterity_mod: 0,
            constitution: 15,
            constitution_mod: 2,
            intelligence: 12,
            intelligence_mod: 1,
            wisdom: 7,
            wisdom_mod: -2,
            charisma: 14,
            charisma_mod: 2
        },
        habilidades: [
            {
                special_ability_name: 'Dopamina',
                special_ability_description: 'El usuario acumula todo el daño inflingido, recibido y curado en el turno, para liberarlo en un golpe devastador en su siguiente ataque. Este golpe equivale a 1D12 + acumulado. En caso que no pueda acumular nada, el objetivo obtendra un estado negativo elegido por el usuario: Stun (20 segundos / 1 turno), Sangrado (30 segundos / 2 turnos) o Confusion (40 segundos / 3 Turnos)'
            }
        ]
    },
    {
        player_name: 'CristobalJ',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Alta del Este',
        pj: {
            pj_name: 'Sento Hasegawa',
            pj_genre: 'M',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Tieffling',
            pj_class: 'Paladin'
        },
        stats: {
            strength: 9,
            strength_mod: -1,
            dexterity: 15,
            dexterity_mod: 2,
            constitution: 18,
            constitution_mod: 4,
            intelligence: 5,
            intelligence_mod: -3,
            wisdom: 15,
            wisdom_mod: 2,
            charisma: 11,
            charisma_mod: 0
        },
        habilidades: [
            {
                special_ability_name: 'Black Celebration',
                special_ability_description: 'Convierte aliados en un liquido a eleccion, saltandose el siguiente turno de sus aliados, a cambio, los cura levemente y son inmunes al daño, efectos cualquieras, etc. Cualquier efecto aplicado antes de la liquidificacion es eliminado al final del efecto. 1 uso por descanso.'
            }
        ]
    },
    {
        player_name: 'JavieraP',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Alta del Este',
        pj: {
            pj_name: 'Phoebe Nix',
            pj_genre: 'F',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Mediano',
            pj_class: 'Monje'
        },
        stats: {
            strength: 10,
            strength_mod: 0,
            dexterity: 16,
            dexterity_mod: 3,
            constitution: 13,
            constitution_mod: 1,
            intelligence: 7,
            intelligence_mod: -2,
            wisdom: 15,
            wisdom_mod: 2,
            charisma: 9,
            charisma_mod: -1
        },
        habilidades: [
            {
                special_ability_name: 'Truman',
                special_ability_description: 'Hace un campo gigante de 25 metros a su alrededor (en forma de cubo de 15625 metros^3 con el centro en el usuario) en el cual se curara cualquier ser conciderado aliado mientras dure este efecto. Cada cura es 1D6.'
            }
        ]
    },
    {
        player_name: 'MauricioB',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Alta del Este',
        pj: {
            pj_name: 'Lucanar Tarknus',
            pj_genre: 'M',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Humano+',
            pj_class: 'Guerrero'
        },
        stats: {
            strength: 11,
            strength_mod: 0,
            dexterity: 13,
            dexterity_mod: 1,
            constitution: 12,
            constitution_mod: 1,
            intelligence: 14,
            intelligence_mod: 2,
            wisdom: 11,
            wisdom_mod: 0,
            charisma: 15,
            charisma_mod: 2
        },
        habilidades: [
            {
                special_ability_name: 'Iron Maiden',
                special_ability_description: 'El usuario es capaz de manipular los metales que lo rodean (hasta 25 metros de distancia), haciendo formas varias de defensas y ataques que benefician a si mismo y a sus aliados.'
            }
        ]
    },
    {
        player_name: 'CamilaP',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Pir',
        pj: {
            pj_name: 'Krivna Jeryn',
            pj_genre: 'F',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Draconido',
            pj_class: 'Guerrero'
        },
        stats: {
            strength: 9,
            strength_mod: -1,
            dexterity: 13,
            dexterity_mod: 1,
            constitution: 13,
            constitution_mod: 1,
            intelligence: 11,
            intelligence_mod: 0,
            wisdom: 12,
            wisdom_mod: 1,
            charisma: 16,
            charisma_mod: 3
        },
        habilidades: [
            {
                special_ability_name: 'Sora',
                special_ability_description: 'Aguila. Stats: 8STR ; 18DEX ; 10CON ; 10INT ; 12WIS ; 14CAR. Puede causar un destello cegante a merced de su usuario (20 segundos / 1 turno), ademas, puede volar por su cuenta (30 metros de altura, alejarse 20 metros del usuario maximo en otra direccion) y el usuario puede ver a traves de los ojos de Sora, quedando limitado a ver lo que este hace (no puede hacer mas que ver a traves de Sora y hablar con su propio cuerpo).'
            }
        ]
    },
    {
        player_name: 'CarlaB',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Pir',
        pj: {
            pj_name: 'Latte Ectrie',
            pj_genre: 'F',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Draconido',
            pj_class: 'Hechicero'
        },
        stats: {
            strength: 14,
            strength_mod: 2,
            dexterity: 14,
            dexterity_mod: 2,
            constitution: 14,
            constitution_mod: 2,
            intelligence: 9,
            intelligence_mod: -1,
            wisdom: 8,
            wisdom_mod: -1,
            charisma: 8,
            charisma_mod: -1
        },
        habilidades: [
            {
                special_ability_name: 'Duke',
                special_ability_description: 'Panda Rojo. Stats: 9STR ; 15DEX ; 18CON ; 12INT ; 8WIS ; 9CAR. Defiende al usuario y a sus aliados en base al ataque que el enemigo realice. En caso que sea un ataque fisico, formara una burbuja que absorba parte del dano. Si es un ataque magico generara un ligero campo que se deshara de los ataques magicos mas debiles y debilitara los mas fuertes. Los efectos de los ataques no seran ni absorbidos ni reflejaods de ninguna manera por las barreras anteriormente mencionadas.'
            }
        ]
    },
    {
        player_name: 'RaquelA',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Pir',
        pj: {
            pj_name: 'Sira Strand',
            pj_genre: 'F',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Elfo del Bosque',
            pj_class: 'Bardo'
        },
        stats: {
            strength: 10,
            strength_mod: 0,
            dexterity: 16,
            dexterity_mod: 3,
            constitution: 14,
            constitution_mod: 2,
            intelligence: 9,
            intelligence_mod: -1,
            wisdom: 13,
            wisdom_mod: 1,
            charisma: 16,
            charisma_mod: 3
        },
        habilidades: [
            {
                special_ability_name: 'Princesita',
                special_ability_description: 'OsoBuho. Stats: 18STR ; 14DEX ; 16CON ; 8INT ; 6WIS ; 10CAR. Ataca con sus garras afiladas, haciendo 2d12 de daño + sangrado a partir de "AC_enemigo + 2". Cualquier daño que reciba ella o su usuaria agregara + 1D4 a sus ataques.'
            }
        ]
    },
    {
        player_name: 'FabianG',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Mezonia',
        pj: {
            pj_name: 'Vexillum Viride',
            pj_genre: 'M',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Humano',
            pj_class: 'Picaro'
        },
        stats: {
            strength: 9,
            strength_mod: -1,
            dexterity: 18,
            dexterity_mod: 4,
            constitution: 12,
            constitution_mod: 1,
            intelligence: 15,
            intelligence_mod: 2,
            wisdom: 13,
            wisdom_mod: 1,
            charisma: 15,
            charisma_mod: 2
        },
        habilidades: [
            {
                special_ability_name: 'Suerte++',
                special_ability_description: 'Usa suerte de golpe, siguiente tirada se calcula como: "Suerte ganada / 2" De manera que se redondea a lo mas alto. La suerte se gana con un sistema de karma.'
            },
            {
                special_ability_name: 'Sombras',
                special_ability_description: 'El usuario puede viajar mediante las sombras (hasta 25 metros de distancia), recibiendo 1D4 de daño mediante un chance, calculado como "1/2^(8-n)", siendo n el numero de veces que se usa la habilidad antes de un descanso largo. '
            }
        ]
    },
    {
        player_name: 'FernandaH',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Mezonia',
        pj: {
            pj_name: null,
            pj_genre: 'F',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Elfo',
            pj_class: 'Clerigo'
        },
        stats: {
            strength: 12,
            strength_mod: 1,
            dexterity: 11,
            dexterity_mod: 0,
            constitution: 12,
            constitution_mod: 1,
            intelligence: 6,
            intelligence_mod: -2,
            wisdom: 17,
            wisdom_mod: 3,
            charisma: 10,
            charisma_mod: 0
        },
        habilidades: []
    },
    {
        player_name: 'PalomaO',
        player_passwd: '12ab',
        pj_id: 1,
        country_name: 'Mezonia',
        pj: {
            pj_name: null,
            pj_genre: 'F',
            pj_level: 1,
            pj_experience: 0,
            pj_race: 'Drow',
            pj_class: 'Hechicero'
        },
        stats: {
            strength: 9,
            strength_mod: -1,
            dexterity: 14,
            dexterity_mod: 2,
            constitution: 14,
            constitution_mod: 2,
            intelligence: 10,
            intelligence_mod: 0,
            wisdom: 6,
            wisdom_mod: -2,
            charisma: 16,
            charisma_mod: 3
        },
        habilidades: []
    }
];