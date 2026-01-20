// Simuladores Premium - Prospere Agro Credit
// Versão intuitiva e interativa com feedback visual em tempo real

document.addEventListener('DOMContentLoaded', function() {
    initPremiumSimulators();
});

function initPremiumSimulators() {
    initDroneSimulatorPremium();
    initPecuariaSimulatorPremium();
    initMasterSimulatorPremium();
}

// Simulador de Drones Premium
function initDroneSimulatorPremium() {
    const form = document.getElementById('droneSimulador');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select');
    
    // Feedback visual em tempo real
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            updateDronePreview();
        });
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateDrone();
    });
}

function updateDronePreview() {
    const tipo = document.getElementById('droneTipo')?.value;
    const valor = parseFloat(document.getElementById('droneValor')?.value) || 0;
    const prazo = parseInt(document.getElementById('dronePrazo')?.value) || 12;
    
    if (valor > 0 && prazo > 0) {
        const parcela = (valor / prazo) * 1.02;
        const preview = document.querySelector('.drone-preview');
        if (preview) {
            preview.innerHTML = `
                <div class="preview-value">Parcela estimada: <strong>${formatCurrency(parcela)}</strong></div>
            `;
        }
    }
}

function calculateDrone() {
    const tipo = document.getElementById('droneTipo')?.value;
    const valor = parseFloat(document.getElementById('droneValor')?.value);
    const prazo = parseInt(document.getElementById('dronePrazo')?.value);
    const objetivo = document.getElementById('droneObjetivo')?.value;

    if (!tipo || !valor || !prazo || !objetivo) {
        showError('Por favor, preencha todos os campos.');
        return;
    }

    // Cálculo
    const taxaAdmin = 0.02;
    const parcela = (valor / prazo) * (1 + taxaAdmin * prazo);
    const credito = valor;

    // Mostrar resultado com animação
    const resultado = document.getElementById('droneResultado');
    if (resultado) {
        document.getElementById('droneCredito').textContent = formatCurrency(credito);
        document.getElementById('droneParcela').textContent = formatCurrency(parcela);
        
        let roi = '40% economia';
        if (objetivo === 'economia') {
            roi = '30-50% redução em defensivos';
        } else if (objetivo === 'produtividade') {
            roi = '15-25% aumento de produtividade';
        }
        document.getElementById('droneROI').textContent = roi;

        resultado.style.display = 'block';
        resultado.classList.add('fade-in');
        
        // Criar gráfico se Chart.js estiver disponível
        if (typeof Chart !== 'undefined') {
            createDroneChart(valor, parcela, prazo);
        }
        
        resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Simulador Pecuário Premium
function initPecuariaSimulatorPremium() {
    const form = document.getElementById('pecuariaSimulador');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            updatePecuariaPreview();
        });
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculatePecuaria();
    });
}

function updatePecuariaPreview() {
    const credito = parseFloat(document.getElementById('pecuariaCredito')?.value) || 0;
    const preco = parseFloat(document.getElementById('pecuariaPreco')?.value) || 0;
    const quantidade = parseInt(document.getElementById('pecuariaQuantidade')?.value) || 0;
    
    if (credito > 0 && preco > 0) {
        const cabecas = Math.floor(credito / preco);
        const preview = document.querySelector('.pecuaria-preview');
        if (preview) {
            preview.innerHTML = `
                <div class="preview-value">Cabeças possíveis: <strong>${cabecas.toLocaleString('pt-BR')}</strong></div>
            `;
        }
    }
}

function calculatePecuaria() {
    const credito = parseFloat(document.getElementById('pecuariaCredito')?.value);
    const preco = parseFloat(document.getElementById('pecuariaPreco')?.value);
    const quantidade = parseInt(document.getElementById('pecuariaQuantidade')?.value);
    const objetivo = document.getElementById('pecuariaObjetivo')?.value;

    if (!credito || !preco || !quantidade || !objetivo) {
        showError('Por favor, preencha todos os campos.');
        return;
    }

    // Cálculos
    const valorTotal = preco * quantidade;
    const cabecasPossiveis = Math.floor(credito / preco);
    const rebanho = valorTotal > credito ? credito : valorTotal;

    // Cálculo de parcela
    const prazo = 120;
    const taxaAdmin = 0.02;
    const parcela = (credito / prazo) * (1 + taxaAdmin * prazo);

    // Projeção de crescimento
    let crescimento = '+0%';
    if (objetivo === 'cria') {
        crescimento = '+8-12% ao ano';
    } else if (objetivo === 'engorda') {
        crescimento = '+15-20% ao ano';
    } else if (objetivo === 'giro') {
        crescimento = '+25-30% ao ano';
    } else if (objetivo === 'patrimonio') {
        crescimento = '+10-15% ao ano';
    }

    // Atualizar UI com animação
    const resultado = document.getElementById('pecuariaResultado');
    if (resultado) {
        animateValue('pecuariaCabecas', 0, cabecasPossiveis, 1000);
        animateValue('pecuariaRebanho', 0, rebanho, 1000, true);
        animateValue('pecuariaParcela', 0, parcela, 1000, true);
        document.getElementById('pecuariaCrescimento').textContent = crescimento;

        resultado.style.display = 'block';
        resultado.classList.add('fade-in');

        // Criar gráfico se Chart.js estiver disponível
        if (typeof Chart !== 'undefined') {
            createPecuariaChart(cabecasPossiveis, rebanho, objetivo);
        }

        resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Simulador Master Premium
function initMasterSimulatorPremium() {
    const form = document.getElementById('masterSimulador');
    if (!form) return;

    const inputs = form.querySelectorAll('input');
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    
    // Feedback visual em tempo real
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            updateMasterPreview();
        });
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateMasterPreview();
            // Animar checkbox
            const label = this.closest('label');
            label.classList.toggle('checked', this.checked);
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateMaster();
    });
}

function updateMasterPreview() {
    const valor = parseFloat(document.getElementById('masterValor')?.value) || 0;
    const prazo = parseInt(document.getElementById('masterPrazo')?.value) || 120;
    
    if (valor > 0 && prazo > 0) {
        const parcela = (valor / prazo) * 1.02;
        const preview = document.querySelector('.master-preview');
        if (preview) {
            preview.innerHTML = `
                <div class="preview-value">Parcela estimada: <strong>${formatCurrency(parcela)}</strong>/mês</div>
            `;
        }
    }
}

function calculateMaster() {
    const valor = parseFloat(document.getElementById('masterValor')?.value);
    const prazo = parseInt(document.getElementById('masterPrazo')?.value);

    // Verificar opções selecionadas
    const opcoes = [];
    if (document.getElementById('optMaquinas')?.checked) opcoes.push('Máquinas');
    if (document.getElementById('optDrones')?.checked) opcoes.push('Drones');
    if (document.getElementById('optGado')?.checked) opcoes.push('Gado');
    if (document.getElementById('optMisto')?.checked) opcoes.push('Projeto Misto');

    if (!valor || !prazo || opcoes.length === 0) {
        showError('Por favor, preencha todos os campos e selecione pelo menos uma opção.');
        return;
    }

    // Cálculos
    const taxaAdmin = 0.02;
    const parcela = (valor / prazo) * (1 + taxaAdmin * prazo);
    const credito = valor;

    // Estratégia
    let estrategia = '';
    if (opcoes.includes('Projeto Misto')) {
        estrategia = 'Aquisição estratégica: Máquinas (ano 1-2), Drones (ano 2-3), Gado (ano 3-4)';
    } else if (opcoes.length === 1) {
        estrategia = `Foco em ${opcoes[0]}: Planejamento anual por ${Math.ceil(prazo/12)} anos`;
    } else {
        estrategia = `Plano misto: ${opcoes.join(', ')} - Distribuição estratégica`;
    }

    // Timeline
    const timeline = generateTimeline(opcoes, prazo);

    // Atualizar UI com animação
    const resultado = document.getElementById('masterResultado');
    if (resultado) {
        animateValue('masterCredito', 0, credito, 1500, true);
        animateValue('masterParcela', 0, parcela, 1500, true);
        document.getElementById('masterEstrategia').textContent = estrategia;
        document.getElementById('masterTimeline').innerHTML = timeline;

        resultado.style.display = 'block';
        resultado.classList.add('fade-in');

        // Criar gráficos se Chart.js estiver disponível
        if (typeof Chart !== 'undefined') {
            createMasterCharts(valor, parcela, prazo, opcoes);
        }

        resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Animar valores
function animateValue(elementId, start, end, duration, isCurrency = false) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        if (isCurrency) {
            element.textContent = formatCurrency(current);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

// Criar gráficos
function createDroneChart(valor, parcela, prazo) {
    const canvas = document.getElementById('droneChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const labels = Array.from({length: prazo/12}, (_, i) => `Ano ${i+1}`);
    const valores = Array(prazo/12).fill(parcela);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Investimento Mensal',
                data: valores,
                borderColor: '#4caf70',
                backgroundColor: 'rgba(76, 175, 112, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    });
}

function createPecuariaChart(cabecas, rebanho, objetivo) {
    const canvas = document.getElementById('pecuariaChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const crescimento = objetivo === 'giro' ? 30 : objetivo === 'engorda' ? 20 : objetivo === 'cria' ? 12 : 15;
    const labels = Array.from({length: 5}, (_, i) => `Ano ${i+1}`);
    const data = labels.map((_, i) => rebanho * Math.pow(1 + crescimento/100, i));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valor do Rebanho',
                data: data,
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    });
}

function createMasterCharts(valor, parcela, prazo, opcoes) {
    // Gráfico de patrimônio
    const patrimonioCanvas = document.getElementById('masterPatrimonioChart');
    if (patrimonioCanvas && typeof Chart !== 'undefined') {
        const ctx = patrimonioCanvas.getContext('2d');
        const anos = Math.ceil(prazo / 12);
        const labels = Array.from({length: anos}, (_, i) => `Ano ${i+1}`);
        const data = labels.map((_, i) => (valor / anos) * (i + 1));

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Patrimônio Acumulado',
                    data: data,
                    borderColor: '#4caf70',
                    backgroundColor: 'rgba(76, 175, 112, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Gráfico de timeline
    const timelineCanvas = document.getElementById('masterTimelineChart');
    if (timelineCanvas && typeof Chart !== 'undefined') {
        const ctx = timelineCanvas.getContext('2d');
        const labels = opcoes;
        const valores = Array(opcoes.length).fill(valor / opcoes.length);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Investimento',
                    data: valores,
                    backgroundColor: ['#4caf70', '#d4af37', '#2d7a52', '#1a5f3f']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

function generateTimeline(opcoes, prazo) {
    const timeline = [];
    const anos = prazo / 12;
    
    if (opcoes.includes('Projeto Misto') || opcoes.length > 1) {
        const step = Math.ceil(anos / opcoes.length);
        opcoes.forEach((opcao, index) => {
            const ano = index * step + 1;
            timeline.push(`<div class="timeline-item-premium"><strong>Ano ${ano}:</strong> ${opcao}</div>`);
        });
    } else {
        const intervalo = Math.ceil(anos / 5);
        for (let i = 1; i <= 5; i++) {
            const ano = i * intervalo;
            if (ano <= anos) {
                timeline.push(`<div class="timeline-item-premium"><strong>Ano ${ano}:</strong> Aquisição de ${opcoes[0]}</div>`);
            }
        }
    }
    
    return timeline.join('');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function showError(message) {
    // Criar notificação de erro elegante
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        errorDiv.classList.remove('show');
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}
