// Charts.js - Inicialização de Gráficos da Plataforma Prospere Agro Credit
// Chart.js já está incluído via CDN no HTML

document.addEventListener('DOMContentLoaded', function() {
    // Aguardar Chart.js carregar
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js não carregou. Verifique a conexão com CDN.');
        return;
    }

    // Configuração global dos gráficos
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#333';
    Chart.defaults.plugins.legend.display = false;
    
    // Gráficos serão criados dinamicamente por outros scripts
    console.log('Charts.js inicializado - Chart.js versão:', Chart.version);
});
