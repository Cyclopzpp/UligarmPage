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

        // Dentro de registrar(usuario, password, country) en app.js:
        this.usuarios.push(nuevoUsuario);
        localStorage.setItem('uligarm_usuarios', JSON.stringify(this.usuarios)); // <--- ESTA LÍNEA ES VITAL
        return { success: true, user: nuevoUsuario };
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
        const usuarioSesion = this.obtenerUsuarioActual();
        if (!usuarioSesion) return false;

        // Buscamos en la lista maestra por nombre (que es único)
        const index = this.usuarios.findIndex(u => u.player_name === usuarioSesion.player_name);

        if (index !== -1 && nuevaPassword.length >= 4) {
            // 1. Actualizamos la lista maestra
            this.usuarios[index].player_passwd = nuevaPassword;
            
            // 2. IMPORTANTE: Guardamos la lista en LocalStorage
            localStorage.setItem('uligarm_usuarios', JSON.stringify(this.usuarios));
            
            // 3. OPCIONAL: Actualizar la sesión activa para que los datos coincidan
            // Esto evita errores si el sistema vuelve a leer la sesión antes de recargar
            this.sesionActiva.player_passwd = nuevaPassword; 
            localStorage.setItem('uligarm_sesion', JSON.stringify(this.sesionActiva));

            console.log("Contraseña actualizada con éxito en LocalStorage");
            return true;
        }
        return false;
    }
}