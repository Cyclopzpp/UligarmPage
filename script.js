// 📄 script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Script inicializando...');
    
    // Verificar que los datos se cargaron
    if (typeof usuariosEjemplo === 'undefined') {
        console.error('❌ usuariosEjemplo no definido');
    } else {
        console.log('✅ Datos cargados:', usuariosEjemplo.length, 'usuarios');
    }
    
    if (typeof paises === 'undefined') {
        console.error('❌ paises no definido');
    } else {
        console.log('✅ Países cargados:', paises.length, 'países');
    }
    
    // Inicializar aplicación globalmente
    window.app = new UligarmApp();
    console.log('✅ Aplicación inicializada:', window.app);
});