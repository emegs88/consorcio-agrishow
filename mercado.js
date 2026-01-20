// API de Commodities e Notícias do Agro
// Integração com APIs públicas e estrutura para análise de mercado

// Configuração de APIs
const API_CONFIG = {
    // API alternativa: usar dados do CEPEA via scraping ou API paga
    // Para demonstração, vamos usar dados simulados e estrutura para API real
    CEPEA_BASE: 'https://www.cepea.esalq.usp.br/br/api',
    
    // API de notícias - usando NewsAPI ou similar
    NEWS_API_KEY: 'YOUR_NEWS_API_KEY', // Substituir por chave real
    NEWS_API: 'https://newsapi.org/v2/everything',
    
    // Alternativa: RSS feeds de sites do agro
    RSS_FEEDS: [
        'https://www.canalrural.com.br/feed/',
        'https://www.agrolink.com.br/noticias/feed',
        'https://www.noticiasagricolas.com.br/feed'
    ]
};

// Dados simulados de commodities (substituir por API real)
const COMMODITIES_DATA = {
    'arroba-boi': {
        nome: 'Arroba do Boi (@)',
        preco: 285.50,
        variacao: 2.3,
        historico: generateHistoricData(285.50, 30),
        fonte: 'CEPEA/ESALQ',
        unidade: 'R$/@'
    },
    'cafe': {
        nome: 'Café (sc/60kg)',
        preco: 1250.80,
        variacao: -1.2,
        historico: generateHistoricData(1250.80, 30),
        fonte: 'CEPEA',
        unidade: 'R$/sc'
    },
    'soja': {
        nome: 'Soja (sc/60kg)',
        preco: 145.30,
        variacao: 0.8,
        historico: generateHistoricData(145.30, 30),
        fonte: 'CEPEA',
        unidade: 'R$/sc'
    },
    'milho': {
        nome: 'Milho (sc/60kg)',
        preco: 78.50,
        variacao: -0.5,
        historico: generateHistoricData(78.50, 30),
        fonte: 'CEPEA',
        unidade: 'R$/sc'
    },
    'algodao': {
        nome: 'Algodão (sc/60kg)',
        preco: 485.20,
        variacao: 1.5,
        historico: generateHistoricData(485.20, 30),
        fonte: 'CEPEA',
        unidade: 'R$/sc'
    },
    'acucar': {
        nome: 'Açúcar Cristal (sc/50kg)',
        preco: 165.80,
        variacao: 0.3,
        historico: generateHistoricData(165.80, 30),
        fonte: 'CEPEA',
        unidade: 'R$/sc'
    }
};

// Gerar dados históricos simulados
function generateHistoricData(price, days) {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const variation = (Math.random() - 0.5) * 0.05; // ±2.5% variação
        const value = price * (1 + variation * (days - i) / days);
        data.push({
            date: date.toISOString().split('T')[0],
            value: parseFloat(value.toFixed(2))
        });
    }
    return data;
}

// Inicializar cotações de commodities
function initCommodities() {
    Object.keys(COMMODITIES_DATA).forEach(commodityKey => {
        const commodity = COMMODITIES_DATA[commodityKey];
        updateCommodityCard(commodityKey, commodity);
        createCommodityChart(commodityKey, commodity);
    });
    
    createComparativeChart();
    
    // Atualizar preços a cada 5 minutos
    setInterval(updateCommoditiesPrices, 300000);
}

// Atualizar card de commodity
function updateCommodityCard(key, data) {
    const priceElement = document.getElementById(`price${capitalizeFirst(key)}`);
    const changeElement = document.getElementById(`change${capitalizeFirst(key)}`);
    const updateElement = document.getElementById(`update${capitalizeFirst(key)}`);
    
    if (priceElement) {
        priceElement.textContent = formatCurrency(data.preco);
    }
    
    if (changeElement) {
        const isPositive = data.variacao >= 0;
        changeElement.textContent = `${isPositive ? '+' : ''}${data.variacao.toFixed(2)}%`;
        changeElement.className = `price-change ${isPositive ? 'positive' : 'negative'}`;
    }
    
    if (updateElement) {
        const now = new Date();
        updateElement.textContent = formatTime(now);
    }
}

// Criar gráfico de commodity
function createCommodityChart(key, data) {
    const canvasId = `chart${capitalizeFirst(key)}`;
    const canvas = document.getElementById(canvasId);
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const labels = data.historico.map(d => formatDateShort(d.date));
    const values = data.historico.map(d => d.value);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: data.nome,
                data: values,
                borderColor: data.variacao >= 0 ? '#4caf70' : '#ff5252',
                backgroundColor: data.variacao >= 0 ? 'rgba(76, 175, 112, 0.1)' : 'rgba(255, 82, 82, 0.1)',
                borderWidth: 2.5,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 14,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    borderColor: data.variacao >= 0 ? '#4caf70' : '#ff5252',
                    borderWidth: 2,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Criar gráfico comparativo
function createComparativeChart() {
    const canvas = document.getElementById('comparativoChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const commodities = Object.keys(COMMODITIES_DATA);
    const labels = commodities.map(k => COMMODITIES_DATA[k].nome);
    const data = commodities.map(k => COMMODITIES_DATA[k].preco);
    const colors = ['#4caf70', '#d4af37', '#ff9800', '#2196f3', '#9c27b0', '#f44336'];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Preço Atual',
                data: data,
                backgroundColor: colors,
                borderColor: colors.map(c => c + 'dd'),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const key = commodities[context.dataIndex];
                            const commodity = COMMODITIES_DATA[key];
                            return `${commodity.unidade}: ${formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(2);
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Atualizar preços (simulado - substituir por API real)
function updateCommoditiesPrices() {
    Object.keys(COMMODITIES_DATA).forEach(key => {
        const commodity = COMMODITIES_DATA[key];
        // Simular pequena variação
        const variation = (Math.random() - 0.5) * 0.02;
        commodity.preco = commodity.preco * (1 + variation);
        commodity.variacao = variation * 100;
        
        // Adicionar novo ponto ao histórico
        const today = new Date().toISOString().split('T')[0];
        commodity.historico.push({
            date: today,
            value: parseFloat(commodity.preco.toFixed(2))
        });
        if (commodity.historico.length > 30) {
            commodity.historico.shift();
        }
        
        updateCommodityCard(key, commodity);
    });
}

// Carregar notícias do agro
async function loadAgroNews() {
    const grid = document.getElementById('noticiasGrid');
    if (!grid) return;
    
    // Notícias simuladas (substituir por API real)
    const noticias = [
        {
            titulo: 'Arroba do boi atinge recorde histórico em 2024',
            resumo: 'Preço da arroba do boi registra alta de 15% no primeiro trimestre, impulsionado por demanda externa.',
            categoria: 'pecuaria',
            data: '2024-03-15',
            fonte: 'Canal Rural',
            link: '#'
        },
        {
            titulo: 'Tecnologia no campo: drones aumentam produtividade em 30%',
            resumo: 'Estudo mostra que uso de drones na agricultura de precisão reduz custos e aumenta eficiência.',
            categoria: 'tecnologia',
            data: '2024-03-14',
            fonte: 'Agrolink',
            link: '#'
        },
        {
            titulo: 'Café brasileiro mantém liderança mundial em exportação',
            resumo: 'Brasil continua maior exportador global de café, com safra 2024/2025 projetada em 65 milhões de sacas.',
            categoria: 'cafe',
            data: '2024-03-13',
            fonte: 'Notícias Agrícolas',
            link: '#'
        },
        {
            titulo: 'Soja: mercado internacional mantém expectativa positiva',
            resumo: 'Preços da soja seguem firmes com demanda chinesa aquecida e dólar favorável.',
            categoria: 'graos',
            data: '2024-03-12',
            fonte: 'Canal Rural',
            link: '#'
        },
        {
            titulo: 'Agrishow 2024: maior feira agro da América Latina',
            resumo: 'Evento em Ribeirão Preto espera receber mais de 200 mil visitantes e R$ 10 bilhões em negócios.',
            categoria: 'mercado',
            data: '2024-03-11',
            fonte: 'Agrolink',
            link: '#'
        },
        {
            titulo: 'Milho: safra de verão supera expectativas',
            resumo: 'Produção de milho no Brasil deve atingir 120 milhões de toneladas na safra 2023/2024.',
            categoria: 'graos',
            data: '2024-03-10',
            fonte: 'Notícias Agrícolas',
            link: '#'
        }
    ];
    
    renderNoticias(noticias);
    setupNewsFilters();
}

// Renderizar notícias
function renderNoticias(noticias) {
    const grid = document.getElementById('noticiasGrid');
    if (!grid) return;
    
    grid.innerHTML = noticias.map(noticia => `
        <div class="noticia-card glass-card" data-categoria="${noticia.categoria}">
            <div class="noticia-categoria">${getCategoryIcon(noticia.categoria)} ${noticia.categoria}</div>
            <h3 class="noticia-titulo">${noticia.titulo}</h3>
            <p class="noticia-resumo">${noticia.resumo}</p>
            <div class="noticia-footer">
                <span class="noticia-fonte">${noticia.fonte}</span>
                <span class="noticia-data">${formatDate(noticia.data)}</span>
            </div>
            <a href="${noticia.link}" target="_blank" class="noticia-link">Ler mais →</a>
        </div>
    `).join('');
}

// Configurar filtros de notícias
function setupNewsFilters() {
    const filtros = document.querySelectorAll('.filtro-btn');
    filtros.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.dataset.filtro;
            
            // Atualizar botões ativos
            filtros.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar notícias
            const cards = document.querySelectorAll('.noticia-card');
            cards.forEach(card => {
                if (categoria === 'todas' || card.dataset.categoria === categoria) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Atualizar alertas
function updateAlertas() {
    // Alertas simulados (substituir por análise real)
    const alertas = [
        {
            tipo: 'importante',
            titulo: 'Alerta de Mercado',
            texto: 'Arroba do boi registra alta de 2.3% hoje. Mantenha atenção às cotações para estratégias de compra de gado.',
            time: new Date()
        },
        {
            tipo: 'insight',
            titulo: 'Insight de Mercado',
            texto: 'Preço do café está 5% abaixo da média histórica. Momento estratégico para planejamento de safra 2024/2025.',
            time: new Date()
        }
    ];
    
    if (alertas[0]) {
        document.getElementById('alertaTexto').textContent = alertas[0].texto;
        document.getElementById('alertaTime').textContent = 'Atualizado ' + formatTime(alertas[0].time);
    }
    
    if (alertas[1]) {
        document.getElementById('insightTexto').textContent = alertas[1].texto;
        document.getElementById('insightTime').textContent = 'Atualizado ' + formatTime(alertas[1].time);
    }
}

// Funções auxiliares
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, '');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);
}

function formatDateShort(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    }).format(date);
}

function formatTime(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function getCategoryIcon(categoria) {
    const icons = {
        'pecuaria': '🐄',
        'graos': '🌾',
        'cafe': '☕',
        'mercado': '📊',
        'tecnologia': '🚁'
    };
    return icons[categoria] || '📰';
}

// Integração com API real (exemplo usando fetch)
async function fetchCEPEAData(commodity) {
    try {
        // Exemplo de chamada API (ajustar conforme API real)
        const response = await fetch(`${API_CONFIG.CEPEA_BASE}/${commodity}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados CEPEA:', error);
        return null;
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initCommodities();
    loadAgroNews();
    updateAlertas();
    
    // Atualizar alertas a cada hora
    setInterval(updateAlertas, 3600000);
});

// Exportar para uso global
window.mercadoAPI = {
    initCommodities,
    updateCommoditiesPrices,
    loadAgroNews,
    updateAlertas
};
