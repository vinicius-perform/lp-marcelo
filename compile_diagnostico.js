const fs = require('fs');
const path = require('path');

const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8'));

const htmlContent = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#10110f">
  <title>Diagnóstico de Momento Profissional | Mentoria Dr. Marcelo</title>
  <meta name="description" content="Avalie seu momento profissional e identifique o próximo nível de crescimento da sua carreira ou negócio na saúde com o Dr. Marcelo Vasconcelos.">
  <meta name="author" content="Marcelo Vasconcelos">

  <!-- Fontes Google -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Meta Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '2909422656109372');
    fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=2909422656109372&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->

  <style>
    :root {
      --bg: #10110f;
      --bg-soft: #161713;
      --card: #151712;
      --card-hover: #1c1f17;
      --border: #282c20;
      --border-light: rgba(224, 217, 197, 0.14);
      --border-gold: rgba(210, 180, 124, 0.4);
      --ink: #f4f2ea;
      --muted: #a8af98;
      --muted-dark: #656c59;
      --gold: #d2b47c;
      --gold-light: #e8d4ac;
      --gold-dark: #8c784d;
      --danger: #e06c75;
      --serif: 'Fraunces', Georgia, serif;
      --sans: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --ease: cubic-bezier(.22, 1, .36, 1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html {
      background: var(--bg);
      color: var(--ink);
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
      scroll-behavior: smooth;
    }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.6;
      position: relative;
      overflow-x: hidden;
    }

    /* Ambient top glow */
    .ambient-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 380px;
      pointer-events: none;
      background: radial-gradient(55% 100% at 50% 0%, rgba(210, 180, 124, 0.14), transparent 70%);
      z-index: 0;
    }

    .container {
      width: 100%;
      max-width: 680px;
      margin: 0 auto;
      padding: 32px 20px 80px;
      position: relative;
      z-index: 1;
    }

    /* Top Nav Bar */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-light);
    }
    .back-link {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.8125rem;
      letter-spacing: 0.04em;
      transition: color .2s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .back-link:hover { color: var(--gold); }
    .brand-top {
      font-size: 0.6875rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted-dark);
      font-weight: 500;
    }

    /* Center Header */
    .brand-header {
      text-align: center;
      margin-bottom: 36px;
    }
    .brand-title {
      font-size: 0.8125rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--gold);
      font-weight: 600;
    }
    .brand-divider {
      width: 44px;
      height: 1px;
      background: var(--gold);
      margin: 12px auto 0;
      opacity: 0.8;
    }

    /* Progress Header */
    .progress-section {
      margin-bottom: 28px;
    }
    .progress-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 12px;
      font-weight: 500;
    }
    .progress-row .pct {
      color: var(--gold);
      font-weight: 600;
    }
    .progress-track {
      width: 100%;
      height: 2px;
      background: var(--border);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--gold);
      width: 10%;
      transition: width 0.35s var(--ease);
    }

    /* Pills bar (Scrollable horizontally) */
    .step-pills {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 14px;
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 4px;
    }
    .step-pills::-webkit-scrollbar { display: none; }
    .step-pill {
      white-space: nowrap;
      font-size: 0.75rem;
      color: var(--muted-dark);
      transition: color .2s;
    }
    .step-pill.active {
      color: var(--gold);
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 6px;
      text-decoration-color: var(--gold);
    }
    .step-pill.passed {
      color: var(--muted);
    }

    /* Card */
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 38px 32px;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
      position: relative;
    }
    @media (max-width: 600px) {
      .card { padding: 26px 20px; }
      .container { padding: 20px 16px 60px; }
    }

    /* Step Heading inside Card */
    .step-index {
      font-size: 0.75rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      font-weight: 600;
      margin-bottom: 8px;
    }
    .step-title {
      font-family: var(--serif);
      font-size: clamp(1.75rem, 4.5vw, 2.25rem);
      line-height: 1.15;
      letter-spacing: -0.025em;
      margin-bottom: 8px;
      color: var(--ink);
      font-weight: 500;
    }
    .step-desc {
      font-size: 0.9375rem;
      color: var(--muted);
      margin-bottom: 24px;
      line-height: 1.55;
    }
    .step-divider {
      height: 1px;
      background: var(--border);
      margin-bottom: 30px;
    }

    /* Question blocks */
    .question-block {
      margin-bottom: 28px;
    }
    .question-block:last-child {
      margin-bottom: 12px;
    }
    .question-label {
      display: block;
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--ink);
      margin-bottom: 8px;
      line-height: 1.45;
    }
    .req {
      color: var(--gold);
      margin-left: 2px;
      font-weight: 600;
    }
    .question-hint {
      font-size: 0.8125rem;
      color: var(--muted);
      margin-bottom: 12px;
      line-height: 1.5;
    }

    /* Form Fields */
    .form-input, .form-textarea {
      width: 100%;
      background: #0f100e;
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 14px 16px;
      font-family: var(--sans);
      font-size: 0.9375rem;
      color: var(--ink);
      outline: none;
      transition: border-color .2s, box-shadow .2s;
    }
    .form-input::placeholder, .form-textarea::placeholder {
      color: rgba(168, 175, 152, 0.4);
    }
    .form-input:focus, .form-textarea:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 1px var(--gold);
    }
    .form-input.has-error, .form-textarea.has-error {
      border-color: var(--danger);
    }
    .form-textarea {
      resize: vertical;
      min-height: 88px;
      line-height: 1.55;
    }

    /* Options buttons (Single / Multi) */
    .options-grid {
      display: grid;
      gap: 10px;
    }
    .option-btn {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      text-align: left;
      background: rgba(16, 17, 15, 0.6);
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 14px 16px;
      font-family: var(--sans);
      font-size: 0.875rem;
      color: var(--muted);
      cursor: pointer;
      transition: all .2s var(--ease);
      line-height: 1.45;
    }
    .option-btn:hover {
      border-color: var(--border-gold);
      color: var(--ink);
      background: var(--card-hover);
    }
    .option-btn.selected {
      border-color: var(--gold);
      background: rgba(210, 180, 124, 0.08);
      color: var(--ink);
    }
    .opt-circle, .opt-box {
      width: 18px;
      height: 18px;
      min-width: 18px;
      border: 1px solid var(--border);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .2s;
      background: #0f100e;
    }
    .opt-box { border-radius: 3px; }
    .option-btn.selected .opt-circle,
    .option-btn.selected .opt-box {
      border-color: var(--gold);
      background: var(--gold);
    }
    .opt-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10110f;
      display: none;
    }
    .option-btn.selected .opt-dot { display: block; }
    .opt-check {
      color: #10110f;
      font-size: 11px;
      font-weight: 700;
      display: none;
    }
    .option-btn.selected .opt-check { display: block; }

    /* Scale (0 to 10) */
    .scale-grid {
      display: grid;
      grid-template-columns: repeat(11, 1fr);
      gap: 6px;
    }
    @media (max-width: 560px) {
      .scale-grid { grid-template-columns: repeat(6, 1fr); }
    }
    .scale-btn {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(16, 17, 15, 0.7);
      border: 1px solid var(--border);
      border-radius: 3px;
      font-family: var(--sans);
      font-size: 0.875rem;
      color: var(--muted);
      cursor: pointer;
      transition: all .2s;
    }
    .scale-btn:hover {
      border-color: var(--gold);
      color: var(--ink);
    }
    .scale-btn.selected {
      border-color: var(--gold);
      background: var(--gold);
      color: #10110f;
      font-weight: 700;
    }

    /* Actions Bottom */
    .actions-row {
      display: flex;
      gap: 12px;
      margin-top: 32px;
    }
    .actions-row.single-action .btn-next {
      width: 100%;
    }
    .btn-gold {
      flex: 1;
      background: linear-gradient(135deg, #d2b47c 0%, #be9c5a 100%);
      color: #10110f;
      border: 0;
      border-radius: 3px;
      padding: 16px 28px;
      font-family: var(--sans);
      font-size: 0.8125rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-weight: 700;
      cursor: pointer;
      transition: filter .2s, transform .2s;
      text-align: center;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-gold:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }
    .btn-gold:active {
      transform: translateY(0);
    }
    .btn-outline {
      background: transparent;
      color: var(--muted);
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 16px 24px;
      font-family: var(--sans);
      font-size: 0.8125rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      font-weight: 600;
      cursor: pointer;
      transition: all .2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 120px;
    }
    .btn-outline:hover {
      border-color: var(--gold);
      color: var(--ink);
    }

    .error-banner {
      margin-top: 18px;
      padding: 12px 14px;
      border-radius: 3px;
      background: rgba(224, 108, 117, 0.12);
      border: 1px solid rgba(224, 108, 117, 0.4);
      color: #f8a5ad;
      font-size: 0.8125rem;
      display: none;
      line-height: 1.45;
    }

    /* Success screen */
    .success-card {
      text-align: center;
      padding: 48px 24px;
    }
    .success-badge {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      background: rgba(210, 180, 124, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      color: var(--gold);
      margin: 0 auto 24px;
    }
    .success-title {
      font-family: var(--serif);
      font-size: clamp(2rem, 5vw, 2.5rem);
      margin-bottom: 16px;
      color: var(--ink);
      line-height: 1.2;
    }
    .success-desc {
      font-size: 1rem;
      line-height: 1.7;
      color: var(--muted);
      max-width: 480px;
      margin: 0 auto 36px;
    }
    .success-actions {
      display: flex;
      flex-direction: column;
      gap: 14px;
      max-width: 360px;
      margin: 0 auto;
    }

    .footer-note {
      text-align: center;
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted-dark);
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="ambient-glow"></div>

  <main class="container">
    <div class="top-bar">
      <a href="/" class="back-link">← Voltar ao site</a>
      <span class="brand-top">Dr. Marcelo Vasconcelos</span>
    </div>

    <div class="brand-header">
      <p class="brand-title">Mentoria Dr. Marcelo</p>
      <div class="brand-divider"></div>
    </div>

    <!-- TELA DE DIAGNÓSTICO -->
    <div id="diagnostic-app">
      <div class="progress-section">
        <div class="progress-row">
          <span id="step-counter">ETAPA 1 DE 10</span>
          <span class="pct" id="step-pct">10%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" id="progress-bar"></div>
        </div>
        <div class="step-pills" id="step-pills"></div>
      </div>

      <div class="card" id="step-card">
        <div class="step-index" id="current-step-index">00</div>
        <h1 class="step-title" id="current-step-title">Identificação</h1>
        <p class="step-desc" id="current-step-desc">Para que possamos preparar o seu diagnóstico antes da conversa.</p>
        <div class="step-divider"></div>

        <form id="step-form" onsubmit="return false;">
          <div id="questions-container"></div>
          <div class="error-banner" id="validation-error">Preencha os campos obrigatórios para continuar.</div>

          <div class="actions-row single-action" id="actions-row">
            <button type="button" class="btn-outline" id="btn-prev" style="display: none;">← Voltar</button>
            <button type="button" class="btn-gold btn-next" id="btn-next">Continuar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- TELA DE SUCESSO -->
    <div id="screen-success" class="card success-card" style="display: none;">
      <div class="success-badge">✓</div>
      <h2 class="success-title">Diagnóstico Concluído!</h2>
      <p class="success-desc">
        Suas respostas foram registradas com sucesso. Nossa equipe já possui as informações necessárias para orientar seus próximos passos com precisão.
      </p>

      <div class="success-actions">
        <a href="#" id="btn-whatsapp-finish" target="_blank" rel="noopener" class="btn-gold">
          Confirmar no WhatsApp →
        </a>
        <a href="/" class="btn-outline" style="text-align: center; text-decoration: none;">
          Voltar para a página inicial
        </a>
      </div>
    </div>

    <p class="footer-note">Confidencial · Uso exclusivo para o seu diagnóstico</p>
  </main>

  <script>
  (() => {
    'use strict';

    // 1. ESTRUTURA DE ETAPAS E PERGUNTAS (10 ETAPAS ORIGINAIS)
    const steps = ${JSON.stringify(questions, null, 2)};

    // 2. CONFIGURAÇÃO FUTURA DO GOOGLE SHEETS (WEBHOOK)
    // Para conectar à planilha (Google Apps Script, Make ou n8n), basta colar a URL aqui:
    const GOOGLE_SHEETS_WEBHOOK_URL = '';

    async function sendDataToWebhook(payload) {
      if (!GOOGLE_SHEETS_WEBHOOK_URL) {
        console.log('[Diagnóstico MVX] Webhook pronto. Dados registrados:', payload);
        return;
      }
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log('[Diagnóstico MVX] Dados enviados com sucesso ao Webhook!');
      } catch (err) {
        console.error('[Diagnóstico MVX] Erro ao enviar webhook:', err);
      }
    }

    // 3. CAPTURA DE PARÂMETROS DE RASTREIO (UTMs / FBCLID)
    const incomingParams = new URLSearchParams(window.location.search);
    const attributionData = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'cta', 'metodo'].forEach(key => {
      const val = incomingParams.get(key);
      if (val) attributionData[key] = val;
    });

    // 4. ESTADO DA APLICAÇÃO
    let currentStepIndex = 0;
    const answers = JSON.parse(localStorage.getItem('mvx_diag_answers') || '{}');
    let leadFired = (localStorage.getItem('mvx_diag_lead_fired') === 'true');

    // 5. SELETORES DO DOM
    const diagnosticApp = document.getElementById('diagnostic-app');
    const screenSuccess = document.getElementById('screen-success');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const actionsRow = document.getElementById('actions-row');
    const stepCounter = document.getElementById('step-counter');
    const stepPct = document.getElementById('step-pct');
    const progressBar = document.getElementById('progress-bar');
    const stepPillsContainer = document.getElementById('step-pills');
    const currentStepIndexEl = document.getElementById('current-step-index');
    const currentStepTitleEl = document.getElementById('current-step-title');
    const currentStepDescEl = document.getElementById('current-step-desc');
    const questionsContainer = document.getElementById('questions-container');
    const validationError = document.getElementById('validation-error');
    const btnWhatsappFinish = document.getElementById('btn-whatsapp-finish');

    // 6. RENDERIZAÇÃO DAS ETAPAS NO TOPO (PILLS)
    function renderStepPills() {
      stepPillsContainer.innerHTML = '';
      steps.forEach((s, idx) => {
        const span = document.createElement('span');
        span.className = 'step-pill' + (idx === currentStepIndex ? ' active' : idx < currentStepIndex ? ' passed' : '');
        span.textContent = s.title;
        stepPillsContainer.appendChild(span);
      });
      // Mantém o pill ativo visível na rolagem horizontal
      const activeEl = stepPillsContainer.querySelector('.step-pill.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }

    // 7. MÁSCARA AUTOMÁTICA DE WHATSAPP
    function maskPhone(val) {
      const digits = val.replace(/\\D/g, '').slice(0, 11);
      if (!digits) return '';
      if (digits.length <= 2) return '(' + digits;
      if (digits.length <= 6) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
      if (digits.length <= 10) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
      return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7, 11);
    }

    // 8. RENDERIZAÇÃO DA ETAPA ATUAL
    function renderStep(index) {
      const step = steps[index];
      const totalSteps = steps.length;
      const pct = Math.round(((index + 1) / totalSteps) * 100);

      // Cabeçalho e progresso
      stepCounter.textContent = 'ETAPA ' + (index + 1) + ' DE ' + totalSteps;
      stepPct.textContent = pct + '%';
      progressBar.style.width = pct + '%';
      renderStepPills();

      // Textos da etapa
      currentStepIndexEl.textContent = step.index;
      currentStepTitleEl.textContent = step.title;
      currentStepDescEl.textContent = step.description || '';
      currentStepDescEl.style.display = step.description ? 'block' : 'none';

      // Botões de navegação
      if (index === 0) {
        btnPrev.style.display = 'none';
        actionsRow.classList.add('single-action');
        btnNext.textContent = 'Continuar';
      } else {
        btnPrev.style.display = 'inline-flex';
        actionsRow.classList.remove('single-action');
        btnNext.textContent = (index === totalSteps - 1) ? 'Concluir Diagnóstico ✓' : 'Continuar →';
      }

      validationError.style.display = 'none';
      questionsContainer.innerHTML = '';

      // Monta as perguntas da etapa
      step.questions.forEach(q => {
        const block = document.createElement('div');
        block.className = 'question-block';

        const label = document.createElement('label');
        label.className = 'question-label';
        label.textContent = q.label;
        if (q.required) {
          const req = document.createElement('span');
          req.className = 'req';
          req.textContent = ' *';
          label.appendChild(req);
        }
        block.appendChild(label);

        if (q.hint) {
          const hint = document.createElement('p');
          hint.className = 'question-hint';
          hint.textContent = q.hint;
          block.appendChild(hint);
        }

        const currentVal = answers[q.id];

        // TIPO: TEXT / TEXTAREA
        if (q.kind === 'text') {
          const isLong = (q.hint || (q.label && q.label.length > 55) || q.id.startsWith('q'));
          let input;
          if (isLong) {
            input = document.createElement('textarea');
            input.className = 'form-textarea';
            input.rows = 3;
          } else {
            input = document.createElement('input');
            input.type = q.id === 'email' ? 'email' : (q.id === 'whatsapp' ? 'tel' : 'text');
            input.className = 'form-input';
          }
          input.placeholder = q.placeholder || 'Escreva aqui...';
          input.value = currentVal || '';
          input.id = 'input-' + q.id;

          if (q.id === 'whatsapp') {
            input.addEventListener('input', e => {
              input.value = maskPhone(e.target.value);
              answers[q.id] = input.value;
            });
          } else {
            input.addEventListener('input', e => {
              answers[q.id] = e.target.value;
            });
          }
          block.appendChild(input);
        }

        // TIPO: SINGLE (Escolha única)
        else if (q.kind === 'single' && q.options) {
          const grid = document.createElement('div');
          grid.className = 'options-grid';
          q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'option-btn' + (currentVal === opt ? ' selected' : '');
            btn.innerHTML = \`
              <span class="opt-circle"><span class="opt-dot"></span></span>
              <span>\${opt}</span>
            \`;
            btn.addEventListener('click', () => {
              grid.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
              btn.classList.add('selected');
              answers[q.id] = opt;
            });
            grid.appendChild(btn);
          });
          block.appendChild(grid);
        }

        // TIPO: MULTI (Múltipla escolha)
        else if (q.kind === 'multi' && q.options) {
          const grid = document.createElement('div');
          grid.className = 'options-grid';
          const selectedList = Array.isArray(currentVal) ? [...currentVal] : [];

          q.options.forEach(opt => {
            const isSelected = selectedList.includes(opt);
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'option-btn' + (isSelected ? ' selected' : '');
            btn.innerHTML = \`
              <span class="opt-box"><span class="opt-check">✓</span></span>
              <span>\${opt}</span>
            \`;
            btn.addEventListener('click', () => {
              const idx = selectedList.indexOf(opt);
              if (idx > -1) {
                selectedList.splice(idx, 1);
                btn.classList.remove('selected');
              } else {
                selectedList.push(opt);
                btn.classList.add('selected');
              }
              answers[q.id] = selectedList;
            });
            grid.appendChild(btn);
          });
          block.appendChild(grid);
        }

        // TIPO: SCALE (0 a 10)
        else if (q.kind === 'scale') {
          const grid = document.createElement('div');
          grid.className = 'scale-grid';
          for (let i = 0; i <= 10; i++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'scale-btn' + (String(currentVal) === String(i) ? ' selected' : '');
            btn.textContent = String(i);
            btn.addEventListener('click', () => {
              grid.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('selected'));
              btn.classList.add('selected');
              answers[q.id] = String(i);
            });
            grid.appendChild(btn);
          }
          block.appendChild(grid);
        }

        questionsContainer.appendChild(block);
      });
    }

    // 9. VALIDAÇÃO DA ETAPA
    function validateStep() {
      const step = steps[currentStepIndex];
      for (const q of step.questions) {
        if (!q.required) continue;
        const val = answers[q.id];

        // Campo vazio
        if (!val || (typeof val === 'string' && !val.trim()) || (Array.isArray(val) && val.length === 0)) {
          validationError.textContent = 'Por favor, preencha o campo obrigatório: "' + q.label + '".';
          validationError.style.display = 'block';
          const el = document.getElementById('input-' + q.id);
          if (el) el.focus();
          return false;
        }

        // Validação específica de e-mail
        if (q.id === 'email' && typeof val === 'string') {
          const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
          if (!emailRegex.test(val.trim())) {
            validationError.textContent = 'Por favor, informe um endereço de e-mail válido.';
            validationError.style.display = 'block';
            const el = document.getElementById('input-' + q.id);
            if (el) el.focus();
            return false;
          }
        }

        // Validação específica de WhatsApp
        if (q.id === 'whatsapp' && typeof val === 'string') {
          const digits = val.replace(/\\D/g, '');
          if (digits.length < 10) {
            validationError.textContent = 'Por favor, informe um WhatsApp válido com DDD.';
            validationError.style.display = 'block';
            const el = document.getElementById('input-' + q.id);
            if (el) el.focus();
            return false;
          }
        }
      }
      return true;
    }

    // 10. AVANÇAR ETAPA E DISPARAR LEAD
    function handleNext() {
      if (!validateStep()) return;
      validationError.style.display = 'none';

      // Persiste no navegador para não perder em recarregamentos
      localStorage.setItem('mvx_diag_answers', JSON.stringify(answers));

      // >>> EVENTO DE CONVERSÃO META: LEAD NA ETAPA 1 <<<
      if (currentStepIndex === 0 && !leadFired) {
        leadFired = true;
        localStorage.setItem('mvx_diag_lead_fired', 'true');

        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', {
            content_name: 'Diagnóstico Dr. Marcelo - Etapa 1',
            currency: 'BRL',
            value: 0
          });
          console.log('[Meta Pixel] Evento "Lead" disparado com sucesso na Etapa 1.');
        }

        // Registra lead preparado para posterior envio ao Google Sheets
        sendDataToWebhook({
          tipo_evento: 'lead_etapa_1',
          timestamp: new Date().toISOString(),
          data_hora_brasil: new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' }),
          nome: answers.nome || '',
          email: answers.email || '',
          whatsapp: answers.whatsapp || '',
          cidade: answers.cidade || '',
          ...attributionData
        });
      }

      // Se for a última etapa, finaliza
      if (currentStepIndex === steps.length - 1) {
        finishDiagnostic();
        return;
      }

      // Próxima etapa
      currentStepIndex++;
      renderStep(currentStepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 11. VOLTAR ETAPA
    function handlePrev() {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStep(currentStepIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // 12. FINALIZAR DIAGNÓSTICO
    function finishDiagnostic() {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'CompleteRegistration', {
          content_name: 'Diagnóstico Dr. Marcelo - Concluído',
          currency: 'BRL',
          value: 0
        });
      }

      // Envia respostas completas para a futura integração com Google Sheets
      sendDataToWebhook({
        tipo_evento: 'diagnostico_completo',
        timestamp: new Date().toISOString(),
        data_hora_brasil: new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' }),
        nome: answers.nome || '',
        email: answers.email || '',
        whatsapp: answers.whatsapp || '',
        cidade: answers.cidade || '',
        respostas: answers,
        ...attributionData
      });

      // Configura WhatsApp de contato final
      const firstName = (answers.nome || '').trim().split(' ')[0] || '';
      const textMsg = encodeURIComponent(
        'Olá Dr. Marcelo! Acabei de concluir meu diagnóstico de momento profissional pelo site' +
        (firstName ? ' (me chamo ' + firstName + ')' : '') +
        '. Gostaria de entender os próximos passos da mentoria.'
      );
      btnWhatsappFinish.href = 'https://wa.me/5585999999999?text=' + textMsg;

      // Exibe tela de sucesso
      diagnosticApp.style.display = 'none';
      screenSuccess.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 13. INICIALIZAÇÃO IMEDIATA NA ETAPA 1
    btnNext.addEventListener('click', handleNext);
    btnPrev.addEventListener('click', handlePrev);

    // Inicia renderizando a primeira etapa
    renderStep(0);

  })();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'diagnostico.html'), htmlContent, 'utf8');
console.log('diagnostico.html gerado com sucesso!');
