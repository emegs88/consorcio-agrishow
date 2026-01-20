// Contador Regressivo para Agrishow
function initCountdown() {
    // Definir data da próxima Agrishow (exemplo: 29 de abril de 2024)
    const agrishowDate = new Date('2024-04-29T09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = agrishowDate - now;
        
        if (distance < 0) {
            // Se a data já passou, definir para próximo ano
            const nextYear = new Date();
            nextYear.setFullYear(nextYear.getFullYear() + 1);
            nextYear.setMonth(3); // Abril
            nextYear.setDate(29);
            nextYear.setHours(9, 0, 0, 0);
            return updateCountdownWithDate(nextYear.getTime());
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    function updateCountdownWithDate(targetDate) {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth Scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Navigation Mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
});

// Formulários - Handler genérico
function handleFormSubmit(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Se callback fornecido, executar
            if (callback) {
                callback(data, form);
            } else {
                // Ação padrão: enviar via WhatsApp
                sendToWhatsApp(data, formId);
            }
        });
    }
}

// Enviar para WhatsApp
function sendToWhatsApp(data, formType) {
    let message = 'Olá! Gostaria de receber informações sobre:\n\n';
    
    if (formType === 'heroForm') {
        message += `Nome: ${data.nome || 'N/A'}\n`;
        message += `WhatsApp: ${data.whatsapp || 'N/A'}\n`;
        message += `Cultura: ${data.cultura || 'N/A'}\n`;
        message += `Interesse: ${data.interesse || 'N/A'}\n`;
    } else if (formType === 'agrishowForm') {
        message += `📅 Pré-cadastro Agrishow\n\n`;
        message += `Nome: ${data.nome || 'N/A'}\n`;
        message += `E-mail: ${data.email || 'N/A'}\n`;
        message += `WhatsApp: ${data.whatsapp || 'N/A'}\n`;
        message += `Interesse: ${data.interesse || 'N/A'}\n`;
        message += `Empresa: ${data.empresa || 'N/A'}\n`;
        message += `Área: ${data.area || 'N/A'}\n`;
    } else if (formType === 'agendamentoForm') {
        message += `📅 Agendamento de Consulta\n\n`;
        message += `Nome: ${data.nome || 'N/A'}\n`;
        message += `WhatsApp: ${data.whatsapp || 'N/A'}\n`;
        message += `E-mail: ${data.email || 'N/A'}\n`;
        message += `Data: ${data.data || 'N/A'}\n`;
        message += `Hora: ${data.hora || 'N/A'}\n`;
        message += `Tipo: ${data.tipo || 'N/A'}\n`;
    }
    
    const whatsappNumber = '5511999999999'; // Substituir pelo número real
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Simulador de Drones
function initDroneSimulator() {
    const form = document.getElementById('droneSimulador');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const tipo = document.getElementById('droneTipo').value;
            const valor = parseFloat(document.getElementById('droneValor').value);
            const prazo = parseInt(document.getElementById('dronePrazo').value);
            const objetivo = document.getElementById('droneObjetivo').value;
            
            if (!tipo || !valor || !prazo || !objetivo) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Cálculo simplificado (ajustar conforme regra de negócio real)
            const taxaAdministracao = 0.02; // 2% ao mês (exemplo)
            const parcela = (valor / prazo) * (1 + taxaAdministracao * prazo);
            const credito = valor;
            
            // Mostrar resultado
            document.getElementById('droneCredito').textContent = formatCurrency(credito);
            document.getElementById('droneParcela').textContent = formatCurrency(parcela);
            
            let economia = 'Até 40% em custos operacionais';
            if (objetivo === 'economia') {
                economia = 'Redução de 30-50% em defensivos';
            } else if (objetivo === 'produtividade') {
                economia = 'Aumento de 15-25% na produtividade';
            }
            
            document.getElementById('droneEconomia').textContent = economia;
            document.getElementById('droneResultado').style.display = 'block';
            
            // Scroll para resultado
            document.getElementById('droneResultado').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
}

// Simulador Pecuário
function initPecuariaSimulator() {
    const form = document.getElementById('pecuariaSimulador');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const credito = parseFloat(document.getElementById('pecuariaCredito').value);
            const preco = parseFloat(document.getElementById('pecuariaPreco').value);
            const quantidade = parseInt(document.getElementById('pecuariaQuantidade').value);
            const objetivo = document.getElementById('pecuariaObjetivo').value;
            
            if (!credito || !preco || !quantidade || !objetivo) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Cálculos
            const valorTotal = preco * quantidade;
            const cabecasPossiveis = Math.floor(credito / preco);
            const rebanho = valorTotal > credito ? credito : valorTotal;
            
            // Cálculo de parcela (simplificado)
            const prazo = 120; // 10 anos
            const taxaAdmin = 0.02;
            const parcela = (credito / prazo) * (1 + taxaAdmin * prazo);
            
            // Projeção de crescimento baseada no objetivo
            let crescimento = '0%';
            if (objetivo === 'cria') {
                crescimento = '8-12% ao ano';
            } else if (objetivo === 'engorda') {
                crescimento = '15-20% ao ano';
            } else if (objetivo === 'giro') {
                crescimento = '25-30% ao ano';
            } else if (objetivo === 'patrimonio') {
                crescimento = '10-15% ao ano';
            }
            
            // Atualizar UI
            document.getElementById('pecuariaCabecas').textContent = cabecasPossiveis;
            document.getElementById('pecuariaRebanho').textContent = formatCurrency(rebanho);
            document.getElementById('pecuariaParcela').textContent = formatCurrency(parcela);
            document.getElementById('pecuariaCrescimento').textContent = crescimento;
            
            document.getElementById('pecuariaResultado').style.display = 'block';
            document.getElementById('pecuariaResultado').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
}

// Simulador Master
function initMasterSimulator() {
    const form = document.getElementById('masterSimulador');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const valor = parseFloat(document.getElementById('masterValor').value);
            const prazo = parseInt(document.getElementById('masterPrazo').value);
            
            // Verificar opções selecionadas
            const opcoes = [];
            if (document.getElementById('optMaquinas').checked) opcoes.push('Máquinas');
            if (document.getElementById('optDrones').checked) opcoes.push('Drones');
            if (document.getElementById('optGado').checked) opcoes.push('Gado');
            if (document.getElementById('optMisto').checked) opcoes.push('Projeto Misto');
            
            if (!valor || !prazo || opcoes.length === 0) {
                alert('Por favor, preencha todos os campos e selecione pelo menos uma opção.');
                return;
            }
            
            // Cálculos
            const taxaAdmin = 0.02;
            const parcela = (valor / prazo) * (1 + taxaAdmin * prazo);
            const credito = valor;
            
            // Estratégia baseada nas opções
            let estrategia = '';
            if (opcoes.includes('Projeto Misto')) {
                estrategia = 'Aquisição estratégica: Máquinas (ano 1-2), Drones (ano 2-3), Gado (ano 3-4)';
            } else if (opcoes.length === 1) {
                estrategia = `Foco em ${opcoes[0]}: Planejamento anual por 10 anos`;
            } else {
                estrategia = `Plano misto: ${opcoes.join(', ')} - Distribuição estratégica`;
            }
            
            // Timeline
            const timeline = generateTimeline(opcoes, prazo);
            
            // Atualizar UI
            document.getElementById('masterCredito').textContent = formatCurrency(credito);
            document.getElementById('masterParcela').textContent = formatCurrency(parcela);
            document.getElementById('masterEstrategia').textContent = estrategia;
            document.getElementById('masterTimeline').innerHTML = timeline;
            
            document.getElementById('masterResultado').style.display = 'block';
            document.getElementById('masterResultado').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
}

// Gerar Timeline
function generateTimeline(opcoes, prazo) {
    const timeline = [];
    const anos = prazo / 12;
    
    if (opcoes.includes('Projeto Misto') || opcoes.length > 1) {
        const step = Math.ceil(anos / opcoes.length);
        opcoes.forEach((opcao, index) => {
            const ano = index * step + 1;
            timeline.push(`<div class="timeline-item"><strong>Ano ${ano}:</strong> ${opcao}</div>`);
        });
    } else {
        const intervalo = Math.ceil(anos / 5);
        for (let i = 1; i <= 5; i++) {
            const ano = i * intervalo;
            if (ano <= anos) {
                timeline.push(`<div class="timeline-item"><strong>Ano ${ano}:</strong> Aquisição planejada de ${opcoes[0]}</div>`);
            }
        }
    }
    
    return timeline.join('');
}

// Modal de Máquinas
const machineData = {
    trator: {
        titulo: 'Tratores',
        beneficios: [
            'Base fundamental de toda operação agrícola',
            'Versatilidade para múltiplas culturas',
            'Valorização ao longo do tempo',
            'Alta demanda no mercado rural'
        ],
        estrategia: 'Considere adquirir tratores em diferentes potências: um para plantio e outro para manejo geral.',
        icon: '🚜'
    },
    colheitadeira: {
        titulo: 'Colheitadeiras',
        beneficios: [
            'Máxima eficiência na colheita',
            'Redução de perdas de grãos',
            'Ganho de tempo operacional',
            'Tecnologia de precisão integrada'
        ],
        estrategia: 'Planeje a aquisição para a entressafra, quando os preços são mais negociáveis.',
        icon: '🌾'
    },
    pulverizador: {
        titulo: 'Pulverizadores',
        beneficios: [
            'Aplicação precisa de defensivos',
            'Economia de insumos',
            'Redução de contaminação',
            'Melhor controle de pragas e doenças'
        ],
        estrategia: 'Considere pulverizadores autopropelidos para maior eficiência em grandes áreas.',
        icon: '💨'
    },
    plantadeira: {
        titulo: 'Plantadeiras',
        beneficios: [
            'Precisão na semeadura',
            'Uniformidade de plantio',
            'Melhor distribuição de sementes',
            'Aumento de produtividade'
        ],
        estrategia: 'Investir em plantadeiras de precisão gera ROI rápido através do aumento de produtividade.',
        icon: '🌱'
    },
    implementos: {
        titulo: 'Implementos Agrícolas',
        beneficios: [
            'Complementam operações agrícolas',
            'Versatilidade na propriedade',
            'Menor investimento inicial',
            'Alta utilização'
        ],
        estrategia: 'Comece com implementos essenciais e expanda conforme a necessidade.',
        icon: '⚙️'
    },
    caminhao: {
        titulo: 'Caminhões e Utilitários Rurais',
        beneficios: [
            'Logística eficiente',
            'Transporte de produção',
            'Mobilidade na propriedade',
            'Múltiplos usos'
        ],
        estrategia: 'Caminhões são essenciais para completar a operação agrícola eficiente.',
        icon: '🚛'
    }
};

function openMachineModal(type) {
    const data = machineData[type];
    if (!data) return;
    
    const modal = document.getElementById('machineModal');
    const content = document.getElementById('machineModalContent');
    
    content.innerHTML = `
        <h2>${data.icon} ${data.titulo}</h2>
        <div class="modal-beneficios">
            <h3>✅ Benefícios:</h3>
            <ul>
                ${data.beneficios.map(b => `<li>${b}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-estrategia">
            <h3>🎯 Estratégia de Compra:</h3>
            <p>${data.estrategia}</p>
        </div>
        <div class="modal-cta">
            <button class="btn btn-primary" onclick="openSimulador('${type}')">Simular aquisição</button>
            <button class="btn btn-secondary" onclick="solicitarPlano('${type}')">Quero planejar essa máquina</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeMachineModal() {
    document.getElementById('machineModal').style.display = 'none';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const machineModal = document.getElementById('machineModal');
    const agendamentoModal = document.getElementById('agendamentoModal');
    
    if (event.target == machineModal) {
        machineModal.style.display = 'none';
    }
    if (event.target == agendamentoModal) {
        agendamentoModal.style.display = 'none';
    }
}

// Abrir Simulador
function openSimulador(tipo) {
    closeMachineModal();
    scrollToSection('simulador');
    
    // Pré-selecionar opção baseada no tipo
    if (tipo === 'master') {
        // Já está na seção
    } else if (tipo.includes('trator') || tipo.includes('colheitadeira') || tipo.includes('pulverizador') || 
               tipo.includes('plantadeira') || tipo.includes('implementos') || tipo.includes('caminhao')) {
        document.getElementById('optMaquinas').checked = true;
        scrollToSection('simulador');
    }
}

// Solicitar Plano
function solicitarPlano(tipo) {
    let mensagem = 'Olá! Gostaria de receber um plano personalizado para:\n\n';
    
    if (tipo === 'drone') {
        mensagem += '🚁 Drones e Tecnologia Agro\n\n';
        const tipoTech = document.getElementById('droneTipo')?.value || 'Tecnologia Agro';
        const valor = document.getElementById('droneValor')?.value || 'A consultar';
        mensagem += `Tipo: ${tipoTech}\n`;
        mensagem += `Valor estimado: R$ ${valor}\n`;
    } else if (tipo === 'pecuaria') {
        mensagem += '🐄 Pecuária e Formação de Rebanho\n\n';
        const objetivo = document.getElementById('pecuariaObjetivo')?.value || 'Formação de rebanho';
        const cabecas = document.getElementById('pecuariaCabecas')?.textContent || 'A consultar';
        mensagem += `Objetivo: ${objetivo}\n`;
        mensagem += `Quantidade de cabeças: ${cabecas}\n`;
    } else if (tipo === 'master') {
        mensagem += '🏡 Plano Completo Agro\n\n';
        const opcoes = [];
        if (document.getElementById('optMaquinas')?.checked) opcoes.push('Máquinas');
        if (document.getElementById('optDrones')?.checked) opcoes.push('Drones');
        if (document.getElementById('optGado')?.checked) opcoes.push('Gado');
        mensagem += `Projeto: ${opcoes.join(', ')}\n`;
        const valor = document.getElementById('masterValor')?.value || 'A consultar';
        mensagem += `Valor total: R$ ${valor}\n`;
    } else {
        mensagem += `🚜 ${machineData[tipo]?.titulo || 'Máquinas Agrícolas'}\n\n`;
    }
    
    mensagem += '\nAguardando seu contato para mais informações!';
    
    const whatsappNumber = '5511999999999';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Agendamento
function abrirAgendamento() {
    document.getElementById('agendamentoModal').style.display = 'block';
}

function closeAgendamentoModal() {
    document.getElementById('agendamentoModal').style.display = 'none';
}

// Download Guia
function downloadGuia() {
    // Simular download (substituir por arquivo real)
    const link = document.createElement('a');
    link.href = '#'; // URL do arquivo PDF real
    link.download = 'Guia_Consorcio_Inteligente_Agro.pdf';
    link.click();
    
    // Como não temos o arquivo real, enviar mensagem no WhatsApp
    const mensagem = 'Olá! Gostaria de receber o "Guia do Consórcio Inteligente no Agro" por e-mail.';
    const whatsappNumber = '5511999999999';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Format Currency
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Inicializar tudo quando DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initDroneSimulator();
    initPecuariaSimulator();
    initMasterSimulator();
    
    // Formulários
    handleFormSubmit('heroForm');
    handleFormSubmit('agrishowForm');
    handleFormSubmit('agendamentoForm', function(data) {
        sendToWhatsApp(data, 'agendamentoForm');
        setTimeout(() => {
            closeAgendamentoModal();
            alert('Agendamento enviado! Entraremos em contato para confirmar.');
        }, 500);
    });
});

// Scroll suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
