// Inicialização de Gráficos Premium - Prospere Agro Credit
// Aguarda Chart.js e DOM estarem prontos

document.addEventListener('DOMContentLoaded', function() {
    // Aguardar Chart.js carregar
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js não carregou. Aguardando...');
        setTimeout(arguments.callee, 100);
        return;
    }

    // Configuração global premium
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#333';
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.elements.line.borderWidth = 2.5;
    Chart.defaults.elements.line.tension = 0.4;
    Chart.defaults.elements.point.radius = 0;
    Chart.defaults.elements.point.hoverRadius = 5;

    // Criar gráficos do dashboard principal
    initDashboardCharts();
    
    console.log('Gráficos premium inicializados');
});

function initDashboardCharts() {
    // Gráfico de Patrimônio
    createPatrimonioChart();
    
    // Gráfico de Frota
    createFrotaChart();
    
    // Gráfico de Rebanho
    createRebanhoChart();
    
    // Gráfico de Produtividade
    createProdutividadeChart();
    
    // Gráficos Master (serão criados quando necessário)
    // Estão nos simuladores
}

function createPatrimonioChart() {
    const canvas = document.getElementById('patrimonioChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const data = [6.2, 6.5, 6.8, 7.1, 7.4, 7.6, 7.8, 8.0, 8.2, 8.1, 8.0, 8.2];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Patrimônio (R$ Bi)',
                data: data,
                borderColor: '#4caf70',
                backgroundColor: 'rgba(76, 175, 112, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    callbacks: {
                        label: function(context) {
                            return 'R$ ' + context.parsed.y.toFixed(1) + ' Bi';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { size: 11 }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 6,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: { size: 11 },
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(1) + ' Bi';
                        }
                    }
                }
            }
        }
    });
}

function createFrotaChart() {
    const canvas = document.getElementById('frotaChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const labels = ['Tratores', 'Colheitadeiras', 'Pulverizadores', 'Plantadeiras', 'Implementos', 'Caminhões'];
    const data = [2840, 1520, 3120, 2450, 5280, 1850];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Unidades',
                data: data,
                backgroundColor: [
                    '#4caf70',
                    '#d4af37',
                    '#2d7a52',
                    '#1a5f3f',
                    '#4caf70',
                    '#d4af37'
                ],
                borderColor: [
                    '#4caf70',
                    '#d4af37',
                    '#2d7a52',
                    '#1a5f3f',
                    '#4caf70',
                    '#d4af37'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toLocaleString('pt-BR') + ' unidades';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: { size: 11 },
                        callback: function(value) {
                            return value.toLocaleString('pt-BR');
                        }
                    }
                }
            }
        }
    });
}

function createRebanhoChart() {
    const canvas = document.getElementById('rebanhoChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const labels = ['2020', '2021', '2022', '2023', '2024'];
    const data = [650, 720, 780, 820, 850];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cabeças (mil)',
                data: data,
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toLocaleString('pt-BR') + ' mil cabeças';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { size: 11 }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 600,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: { size: 11 },
                        callback: function(value) {
                            return value + 'k';
                        }
                    }
                }
            }
        }
    });
}

function createProdutividadeChart() {
    const canvas = document.getElementById('produtividadeChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    const data = [25, 30, 35, 40];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ganho (%)',
                data: data,
                borderColor: '#1a5f3f',
                backgroundColor: 'rgba(26, 95, 63, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return '+' + context.parsed.y + '% produtividade';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { size: 11 }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 50,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: { size: 11 },
                        callback: function(value) {
                            return '+' + value + '%';
                        }
                    }
                }
            }
        }
    });
}
