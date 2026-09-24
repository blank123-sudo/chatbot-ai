(function () {
  const scriptTag = document.currentScript || document.querySelector('script[data-bot-id]');
  if (!scriptTag) return;

  const botId = scriptTag.getAttribute('data-bot-id') || 'default_bot';
  const primaryColor = scriptTag.getAttribute('data-primary-color') || '#2563eb';

  // Create chat widget container elements
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="ai-chatbot-widget-root" style="position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: system-ui, sans-serif;">
      <button id="ai-chat-toggle-btn" style="background: ${primaryColor}; color: white; border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>
      <div id="ai-chat-window" style="display: none; position: absolute; bottom: 75px; right: 0; width: 360px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); flex-direction: column; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: ${primaryColor}; color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600;">AI Assistant (${botId})</h3>
          <button id="ai-chat-close-btn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">&times;</button>
        </div>
        <div id="ai-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; background: #f9fafb; display: flex; flex-direction: column; gap: 10px; font-size: 14px;">
          <div style="background: white; padding: 10px 14px; border-radius: 8px; border: 1px solid #e5e7eb; align-self: flex-start; max-width: 80%;">Hello! How can I help you with our website today?</div>
        </div>
        <div style="padding: 12px; background: white; border-top: 1px solid #e5e7eb; display: flex; gap: 8px;">
          <input type="text" id="ai-chat-input" placeholder="Ask a question..." style="flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; outline: none; font-size: 14px;">
          <button id="ai-chat-send-btn" style="background: ${primaryColor}; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: 500;">Send</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Toggle open/close logic
  const toggleBtn = document.getElementById('ai-chat-toggle-btn');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const chatWindow = document.getElementById('ai-chat-window');
  const sendBtn = document.getElementById('ai-chat-send-btn');
  const inputField = document.getElementById('ai-chat-input');
  const messagesContainer = document.getElementById('ai-chat-messages');

  function toggleChat() {
    const isVisible = chatWindow.style.display === 'flex';
    chatWindow.style.display = isVisible ? 'none' : 'flex';
  }

  toggleBtn.onclick = toggleChat;
  closeBtn.onclick = toggleChat;

  function handleSend() {
    const text = inputField.value.trim();
    if (!text) return;

    // Append user message
    messagesContainer.innerHTML += `<div style="background: ${primaryColor}; color: white; padding: 10px 14px; border-radius: 8px; align-self: flex-end; max-width: 80%;">${text}</div>`;
    inputField.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
      messagesContainer.innerHTML += `<div style="background: white; padding: 10px 14px; border-radius: 8px; border: 1px solid #e5e7eb; align-self: flex-start; max-width: 80%;">This is a simulated reply based on your crawled website content for bot: <b>${botId}</b>.</div>`;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
  }

  sendBtn.onclick = handleSend;
  inputField.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };
})();
