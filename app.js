// 📄 app.js - Lógica principal CORREGIDA
class UligarmApp {
    constructor() {
    // Intenta cargar de localStorage primero
        const usuariosGuardados = localStorage.getItem('uligarm_usuarios');
        
        if(usuariosGuardados){
            this.usuarios = JSON.parse(usuariosGuardados);
        } else {
            // SIEMPRE carga los datos de ejemplo si no hay nada
            this.usuarios = usuariosEjemplo || [];
            localStorage.setItem('uligarm_usuarios', JSON.stringify(this.usuarios));
            localStorage.setItem('uligarm_paises', JSON.stringify(paises));
        }
        
        this.sesionActiva = JSON.parse(localStorage.getItem('uligarm_sesion')) || null;
        this.paises = paises || [];
    }

    // ========== MÉTODOS DE AUTENTICACIÓN ==========
    login(usuario, password) {
        const user = this.usuarios.find(u => 
            u.player_name === usuario && u.player_passwd === password
        );
        
        if (user) {
            this.sesionActiva = {
                usuario: user.player_name,
                pj_id: user.pj_id
            };
            localStorage.setItem('uligarm_sesion', JSON.stringify(this.sesionActiva));
            return { success: true, user };
        }
        return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    logout() {
        this.sesionActiva = null;
        localStorage.removeItem('uligarm_sesion');
    }

    registrar(usuario, password, pais) {
        // Validaciones
        if (!usuario || !password || !pais) {
            return { success: false, message: 'Todos los campos son obligatorios' };
        }
        
        if (password.length < 6) {
            return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
        }
        
        // Verificar si usuario existe
        if (this.usuarios.find(u => u.player_name === usuario)) {
            return { success: false, message: 'El usuario ya existe' };
        }

        // Calcular nuevo pj_id
        const usuariosMismoNombre = this.usuarios.filter(u => u.player_name === usuario);
        const nuevoPjId = usuariosMismoNombre.length + 1;
        
        // Crear nuevo usuario
        const nuevoUsuario = {
            player_name: usuario,
            player_passwd: password,
            pj_id: nuevoPjId,
            country_name: pais,
            pj: {
                pj_name: null,
                pj_genre: 'M',
                pj_level: 1,
                pj_experience: 0,
                pj_race: 'Humano',
                pj_class: 'Guerrero'
            },
            stats: {
                strength: 10,
                strength_mod: 0,
                dexterity: 10,
                dexterity_mod: 0,
                constitution: 10,
                constitution_mod: 0,
                intelligence: 10,
                intelligence_mod: 0,
                wisdom: 10,
                wisdom_mod: 0,
                charisma: 10,
                charisma_mod: 0
            },
            habilidades: []
        };

        // Agregar usuario
        this.usuarios.push(nuevoUsuario);
        localStorage.setItem('uligarm_usuarios', JSON.stringify(this.usuarios));

        // Iniciar sesión automáticamente
        return this.login(usuario, password);
    }

    // ========== MÉTODOS DE USUARIO ==========
    obtenerUsuarioActual() {
        if (!this.sesionActiva) return null;
        
        return this.usuarios.find(u => 
            u.player_name === this.sesionActiva.usuario && 
            u.pj_id === this.sesionActiva.pj_id
        );
    }

    actualizarNombrePj(nuevoNombre) {
        const user = this.obtenerUsuarioActual();
        if (user && nuevoNombre.trim()) {
            user.pj.pj_name = nuevoNombre.trim();
            
            // Actualizar en el array
            const index = this.usuarios.findIndex(u => 
                u.player_name === user.player_name && u.pj_id === user.pj_id
            );
            
            if (index !== -1) {
                this.usuarios[index] = user;
                localStorage.setItem('uligarm_usuarios', JSON.stringify(this.usuarios));
                return true;
            }
        }
        return false;
    }

    obtenerPais(nombre) {
        return this.paises.find(p => p.nombre === nombre) || { 
            nombre: 'Desconocido', 
            descripcion: 'Información no disponible', 
            clima: 'Desconocido', 
            gobernante: 'Desconocido' 
        };
    }

    // ========== MÉTODOS DE DATOS ==========
    obtenerEstadisticas() {
        const user = this.obtenerUsuarioActual();
        return user ? user.stats : null;
    }

    obtenerHabilidades() {
        const user = this.obtenerUsuarioActual();
        return user ? user.habilidades : [];
    }

    // ========== MÉTODOS UTILITARIOS ==========
    verificarSesion() {
        return this.sesionActiva !== null;
    }

    cambiarContrasena(nuevaPassword) {
        const sesion = this.sesionActiva;
        if (!sesion) return false;

        // 1. Buscar al usuario en la lista actual por su ID único
        const index = this.usuarios.findIndex(u => u.pj_id === sesion.pj_id);

        if (index !== -1 && nuevaPassword.length >= 4) {
            // 2. Actualizar la contraseña en el array de la memoria
            this.usuarios[index].player_passwd = nuevaPassword;
            
            // 3. PERSISTENCIA: Guardar el array completo actualizado en localStorage
            // Esto convierte a los "usuarios de ejemplo" en "usuarios locales" editables
            localStorage.setItem('uligarm_usuarios', JSON.stringify(this.usuarios));
            
            console.log("Contraseña actualizada para:", this.usuarios[index].player_name);
            return true;
        }
        return false;
    }
}