/* Avia — Scripted AI Bot for €LUMP Lump Sum Token */
(function () {
  'use strict';
  var state = { isOpen: false };
  function el(id) { return document.getElementById(id); }

  var CONTRACT = '8SCxKwd6HcnP26Ee9zU8PEn6We7BajBGYQRY5sQppxuN';
  var POOL = 'AcUowwzwf7CACppm9sr3zFLGQ9ncszkjFkx29MZxoyEP';

  var KB = {
    'what': {
      title: 'What is €LUMP?',
      answer: [
        '**€LUMP (Lump Sum Token)** — the fixed commission layer of AviaTrust on Solana.',
        '',
        '€LUMP protects brokers\' and intermediaries\' commissions in aviation deals.',
        '',
        '**The problem:**',
        '· Broker finds a deal',
        '· Buyer and seller meet',
        '· Deal closes — and the broker gets cut out',
        '',
        '**€LUMP fixes this:**',
        '· Commission fixed in smart contract',
        '· Locked until deal closes',
        '· Auto-released to broker on completion',
        '',
        '**Based on FIDIC Lump Sum contracts** — the global standard used by the World Bank for major infrastructure projects.',
        '',
        '📄 Contract: `' + CONTRACT + '`',
        '⛓ Chain: Solana (Token-2022, 1% transfer fee)'
      ].join('\n')
    },
    'buy': {
      title: 'How to buy €LUMP?',
      answer: [
        '**Buy €LUMP on Solana:**',
        '',
        '**1. Jupiter**',
        '→ https://jup.ag/tokens/' + CONTRACT,
        '',
        '**2. OpenSea**',
        '→ https://opensea.io/token/solana/' + CONTRACT,
        '',
        '**3. Uniswap (Solana)**',
        '→ https://app.uniswap.org/explore/tokens/solana/' + CONTRACT,
        '',
        '**4. Binance Web3**',
        '→ https://app.binance.com/uni-qr/web3-token-details?tokenCA=' + CONTRACT,
        '',
        '💡 Recommend Jupiter for lowest slippage.'
      ].join('\n')
    },
    'contract': {
      title: 'Contract & Pool',
      answer: [
        '**€LUMP Contract (Solana)**',
        '',
        '`' + CONTRACT + '`',
        '',
        '**Meteora Pool**',
        '`' + POOL + '`',
        '',
        '**Verify on:**',
        '· GeckoTerminal: https://www.geckoterminal.com/solana/pools/' + POOL,
        '· OpenSea: https://opensea.io/token/solana/' + CONTRACT,
        '',
        '⚠️ Always verify contract before buying.'
      ].join('\n')
    },
    'price': {
      title: 'Price & Target',
      answer: [
        '**€LUMP Price**',
        '',
        '· Launch price: **€0.01**',
        '· Community target: **×100 → €1.00**',
        '',
        '**Live price:**',
        '· GeckoTerminal: https://www.geckoterminal.com/solana/pools/' + POOL,
        '· Jupiter: https://jup.ag/tokens/' + CONTRACT,
        '',
        '⚠️ The ×100 is a community-stated target, not a promise.'
      ].join('\n')
    },
    'lump': {
      title: 'What is a Lump Sum?',
      answer: [
        '**Lump Sum** — fixed amount, not percentage.',
        '',
        '**Where it comes from:**',
        '· FIDIC Yellow Book — the global standard for construction and engineering contracts',
        '· Used by the World Bank for major infrastructure projects',
        '· Also standard in aviation brokerage (flat commission 1-3%)',
        '· In shipping — lump sum when market is down',
        '',
        '**Why it matters for brokers:**',
        '· Fixed = predictable',
        '· Predictable = protected',
        '· Protected = broker can focus on finding deals',
        '',
        '**€LUMP tokenizes this:**',
        '· Broker registers deal in smart contract',
        '· Commission locked as lump sum',
        '· Auto-released when deal closes'
      ].join('\n')
    },
    'ecosystem': {
      title: 'What is AviaTrust?',
      answer: [
        '**AviaTrust — aviation tokenization ecosystem on Solana.**',
        '',
        '**Financial layer:**',
        '· **€ESCR** — Escrow (trust layer)',
        '· **€DLCT** — Tokenized DLC (trade finance)',
        '· **€SBLCT** — Standby LC Token (guarantees)',
        '· **€LUMP** — Lump Sum Token (you are here)',
        '',
        '**Aircraft layer (10 tokens):**',
        '€B787 · €A350 · €C929 · €A220 · €E195',
        '€737MAX10 · €FAXX · €F22 · €CRJ900 · €IL96',
        '',
        'Built on Solana for speed and low fees.'
      ].join('\n')
    },
    'risk': {
      title: 'Is €LUMP risky?',
      answer: [
        '**Honest answer: YES.**',
        '',
        '**Known risks:**',
        '· Price volatility',
        '· Liquidity risk',
        '· Smart contract risk',
        '',
        '**What reduces risk:**',
        '· Mint Authority disabled',
        '· Freeze Authority disabled',
        '· Utility token of real ecosystem',
        '· Based on FIDIC Lump Sum — recognized global standard',
        '',
        '⚠️ **Not financial advice.** Only invest what you can afford to lose.'
      ].join('\n')
    }
  };

  var SUGGESTIONS = [
    { key: 'what',      label: '💼 What is €LUMP?' },
    { key: 'buy',       label: '🛒 How to buy?' },
    { key: 'contract',  label: '🔗 Contract & Pool' },
    { key: 'price',     label: '💰 Price & Target' },
    { key: 'lump',      label: '📋 What is a Lump Sum?' },
    { key: 'ecosystem', label: '🌍 AviaTrust' },
    { key: 'risk',      label: '⚠️ Is it risky?' }
  ];

  function createUI() {
    var btn = document.createElement('button');
    btn.id = 'avia-btn';
    btn.className = 'avia-btn';
    btn.innerHTML = '<span class="avia-btn-icon">💼</span><span class="avia-btn-label">Avia</span>';
    document.body.appendChild(btn);

    var win = document.createElement('div');
    win.id = 'avia-window';
    win.className = 'avia-window';
    win.innerHTML = [
      '<div class="avia-header">',
      '  <div class="avia-header-left">',
      '    <img src="lump_logo.png" alt="Avia" class="avia-avatar" onerror="this.style.display=\'none\'" />',
      '    <div>',
      '      <div class="avia-name">Avia</div>',
      '      <div class="avia-status">AI assistant · €LUMP</div>',
      '    </div>',
      '  </div>',
      '  <button class="avia-close" id="avia-close">×</button>',
      '</div>',
      '<div class="avia-messages" id="avia-messages"></div>',
      '<div class="avia-suggestions" id="avia-suggestions"></div>',
      '<div class="avia-external">',
      '  <a href="https://jup.ag/tokens/' + CONTRACT + '" target="_blank">🔄 Jupiter</a>',
      '  <a href="https://t.me/aviatrust" target="_blank">📱 TG</a>',
      '  <a href="https://x.com/aviatrust" target="_blank">🐦 X</a>',
      '</div>',
      '<div class="avia-footer">Scripted assistant · Not financial advice</div>'
    ].join('');
    document.body.appendChild(win);

    el('avia-btn').addEventListener('click', toggle);
    el('avia-close').addEventListener('click', toggle);

    addMessage('agent', 'Hi! I am Avia — assistant for €LUMP Lump Sum Token. Pick a topic below.');
    renderSuggestions();
  }

  function renderSuggestions() {
    var box = el('avia-suggestions');
    if (!box) return;
    box.innerHTML = '';
    SUGGESTIONS.forEach(function (item) {
      var b = document.createElement('button');
      b.className = 'avia-suggestion';
      b.textContent = item.label;
      b.addEventListener('click', function () { showAnswer(item.key); });
      box.appendChild(b);
    });
  }

  function addMessage(role, text) {
    var box = el('avia-messages');
    if (!box) return;
    var msg = document.createElement('div');
    msg.className = 'avia-msg avia-msg-' + role;
    var bubble = document.createElement('div');
    bubble.className = 'avia-bubble';
    bubble.innerHTML = formatText(text);
    msg.appendChild(bubble);
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
  }

  function formatText(text) {
    var safe = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\n/g, '<br />');
    safe = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    return safe;
  }

  function showAnswer(key) {
    var item = KB[key];
    if (!item) { addMessage('agent', 'Sorry, no info on that.'); return; }
    addMessage('user', item.title);
    setTimeout(function () { addMessage('agent', item.answer); }, 250);
  }

  function toggle() {
    state.isOpen = !state.isOpen;
    var win = el('avia-window');
    var btn = el('avia-btn');
    if (state.isOpen) { win.classList.add('avia-open'); btn.classList.add('avia-btn-hidden'); }
    else { win.classList.remove('avia-open'); btn.classList.remove('avia-btn-hidden'); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createUI);
  else createUI();
})();
