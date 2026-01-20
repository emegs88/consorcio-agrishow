# 🚜 Consórcio Agro Prospere - Site Interativo

Site web moderno e interativo focado em consórcio para o agronegócio, desenvolvido para a **Prospere Agro**.

## 📋 Descrição

Plataforma completa para produtores rurais, pecuaristas e empresários do agro, com foco em:

1. **🚜 Máquinas e Implementos Agrícolas**
2. **🚁 Drones e Tecnologias para o Agro**
3. **🐄 Estratégias Financeiras para Compra de Gado**

## ✨ Funcionalidades

### Hero Section
- Contador regressivo para a Agrishow
- Formulário rápido de captura de leads
- Design impactante com call-to-actions claros

### Simuladores Interativos
- **Simulador de Drones**: Calcula plano de aquisição tecnológica
- **Simulador Pecuário**: Estratégia para compra de gado (cabeças, rebanho, crescimento)
- **Simulador Master**: Plano completo para máquinas, drones e gado

### Seções Especiais
- Cards interativos de máquinas agrícolas
- Casos de uso e storytelling
- Seção Agrishow Experience com pré-cadastro
- Área de contato com múltiplos canais

### Conversão
- Formulários integrados com WhatsApp
- Agendamento de consultas
- Download de material educativo
- Botão flutuante de WhatsApp

## 🎨 Identidade Visual

- **Verde Escuro**: #1a5f3f (principal)
- **Dourado**: #d4af37 (destaque)
- **Preto**: #0a0a0a (texto)
- **Branco**: #ffffff (fundo)

Estilo premium rural com visual tecnológico e referências à natureza.

## 🛠️ Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript (Vanilla)
- Google Fonts (Poppins)

## 📁 Estrutura de Arquivos

```
agrishow/
├── index.html      # Estrutura principal
├── styles.css      # Estilos e design
├── script.js       # Funcionalidades interativas
└── README.md       # Documentação
```

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um navegador moderno
2. Todas as funcionalidades funcionam localmente
3. Para produção, faça upload dos arquivos para um servidor web

## ⚙️ Configurações

### Contador Agrishow
Ajuste a data no arquivo `script.js`, função `initCountdown()`:
```javascript
const agrishowDate = new Date('2024-04-29T09:00:00').getTime();
```

### WhatsApp
Substitua o número de WhatsApp nos seguintes locais:
- Linha 153 em `index.html` (botão WhatsApp float)
- Linha 155 em `index.html` (link WhatsApp footer)
- Funções `sendToWhatsApp()` e `solicitarPlano()` em `script.js`

Exemplo:
```javascript
const whatsappNumber = '5511999999999'; // Substituir pelo número real
```

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎯 Conversão

Todos os formulários estão configurados para:
1. Validar campos obrigatórios
2. Enviar dados via WhatsApp
3. Mostrar resultados de simulações
4. Capturar leads qualificados

## 🔧 Personalização

### Cores
Edite as variáveis CSS em `styles.css`:
```css
:root {
    --verde-escuro: #1a5f3f;
    --dourado: #d4af37;
    /* ... */
}
```

### Conteúdo de Máquinas
Edite o objeto `machineData` em `script.js` para personalizar informações de cada máquina.

### Casos de Uso
Edite a seção `#casos` em `index.html` para incluir casos reais.

## 📊 Simuladores

### Lógica de Cálculo
Os simuladores usam uma fórmula simplificada:
```
Parcela = (Valor / Prazo) * (1 + Taxa Administração * Prazo)
```

**Nota**: Ajuste a `taxaAdministracao` conforme regra de negócio real.

## 🔐 Segurança

- Validação de formulários no cliente
- Sanitização de dados antes do envio
- HTTPS recomendado para produção

## 📞 Suporte

Para dúvidas ou ajustes:
- WhatsApp: (11) 99999-9999
- E-mail: contato@prospereagro.com.br

## 📄 Licença

Projeto desenvolvido exclusivamente para Prospere Agro / BidCon.

---

**Frase-chave do projeto**: *"Prospere Agro não vende consórcio. Ela estrutura patrimônio rural."*
