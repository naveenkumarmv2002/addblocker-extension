// Pop-up controls
const toggleBtn = document.getElementById('toggleBtn');
const statusSpan = document.getElementById('status');
const logList = document.getElementById('logList');

// Landing controls
const shareBtn = document.querySelector('.share-btn');
const installBtn = document.querySelector('.install-btn');

let enabled = false;

toggleBtn?.addEventListener('click', () => {
  enabled = !enabled;
  statusSpan.textContent = enabled ? 'Enabled' : 'Disabled';
  toggleBtn.textContent = enabled ? 'Disable' : 'Enable';

  chrome.runtime.sendMessage({ type: 'TOGGLE_ADBLOCK', enabled });
  addLog(`Ad Blocker ${enabled ? 'enabled' : 'disabled'}`);
  sendLog('info', `Ad Blocker ${enabled ? 'enabled' : 'disabled'}`);
});

function addLog(msg) {
  if (!logList) return;
  const li = document.createElement('li');
  li.textContent = msg;
  logList.prepend(li);
}

function sendLog(type, msg) {
  fetch('http://localhost:3000/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, message: msg, timestamp: new Date().toLocaleTimeString() })
  }).catch(console.error);
}

shareBtn?.addEventListener('click', () =>
  navigator.clipboard.writeText(location.href).then(() => alert('🔗 Link copied!'))
);

installBtn?.addEventListener('click', () =>
  alert('✅ This demo cannot install itself — real Add-on works via Chrome Web Store.')
);
