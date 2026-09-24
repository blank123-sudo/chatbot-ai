/**
 * OmniChat AI - Self-Reading Embeddable Widget
 * Hosted at: https://blank123-sudo.github.io/chatbot-ai/widget.js
 */
(function () {
  if (document.getElementById('omnichat-ai-widget-root')) return;

  const scriptTag = document.currentScript || document.querySelector('script[data-bot-id]');
  if (!scriptTag) return;

  const botId = scriptTag.getAttribute('data-bot-id') || 'default_bot';
  const primaryColor = scriptTag.getAttribute('data-primary-color') || '#2563eb';

  // Automatically harvest text content from the host website where this script is embedded
  function getHostWebsiteContext() {
    // Extract main text content, headers, and meta descriptions from the host page
    const title = document.title || '';
    const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
    const bodyText = document.body ? document.body.innerText.substring(0, 3000) : ''; // First 3000 chars of page text
    return `Page Title: ${title}\nDescription: ${metaDesc}\nContent Preview: ${bodyText}`;
  }

  // Inject Tailwind CSS for styling
  if (!document.getElementById('omnichat-tailwind-cdn')) {
    const tw = document.createElement('script');
    tw.id = 'omnichat-tailwind-cdn';
    tw.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tw);
  }

  // Create Widget Container
  const container = document.createElement('div');
  container.id = 'omnichat-ai-widget-root';
  container.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: system-ui, -apple-system, sans-serif;";
  
  container.innerHTML = `
    <div id="omnichat-window" class="hidden w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 mb-4 overflow-hidden flex flex-col transition-all duration-300 transform translate-y-4 opacity-0">
      <div id="omnichat-header" class="p-4 text-white flex items-center justify-between shadow-md" style="background-color: ${primaryColor};">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">🤖</div>
          <div>
            <h4 class="font-bold text-sm leading-tight">Website Assistant</h4>
            <span class="text-[10px] text-emerald-200 flex items-center gap-1 font-medium mt-0.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Reading this page live
            </span>
          </div>
        </div>
        <button id="omnichat-close-btn" class="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">✕</button>
      </div>

      <div id="omnichat-messages" class="p-4 space-y-3 h-80 overflow-y-auto text-xs bg-slate-50 dark:bg-slate-950 flex flex-col text-slate-800 dark:text-slate-100">
        <div class="flex items-start space-x-2">
          <div class="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0" style="background-color: ${primaryColor};">AI</div>
          <div class="bg-white dark:bg-slate-900 p-3 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-800 max-w-[85%] shadow-sm">
            <p>Hi there! 👋 I've scanned this page. Ask me anything about what you see here!</p>
          </div>
        </div>
      </div>

      <div class="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
        <input type="text" id="omnichat-input" placeholder="Ask about this page..." class="flex-1 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 text-slate-800 dark:text-slate-100">
        <button id="omnichat-send-btn" class="w-9 h-9 rounded-xl text-white flex items-center justify-center shadow-md transition-all cursor-pointer" style="background-color: ${primaryColor};">➤</button>
      </div>
    </div>

    <button id="omnichat-bubble" class="w-14 h-14 rounded-full text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-all duration-300 relative cursor-pointer" style="background-color: ${primaryColor};">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-pulse"></span>
    </button>
  `;

  document.body.appendChild(container);

  const chatWindow = document.getElementById('omnichat-window');
  const bubbleBtn = document.getElementById('omnichat-bubble');
  const closeBtn = document.getElementById('omnichat-close-btn');
  const sendBtn = document.getElementById('omnichat-send-btn');
  const inputField = document.getElementById('omnichat-input');
  const messagesContainer = document.getElementById('omnichat-messages');

  function toggleChat() {
    if (chatWindow.classList.contains('hidden')) {
      chatWindow.classList.remove('hidden');
      setTimeout(() => chatWindow.classList.remove('translate-y-4', 'opacity-0'), 10);
    } else {
      chatWindow.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => chatWindow.classList.add('hidden'), 300);
    }
  }

  bubbleBtn.onclick = toggleChat;
  closeBtn.onclick = toggleChat;

  function handleSend() {
    const text = inputField.value.trim();
    if (!text) return;

    // Grab the host website text dynamically right when the user asks a question
    const pageContext = getHostWebsiteContext();

    // Append User Message
    messagesContainer.innerHTML += `
      <div class="flex items-start justify-end space-x-2">
        <div style="background-color: ${primaryColor}" class="text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
          <p>${escapeHTML(text)}</p>
        </div>
        <div class="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">YOU</div>
      </div>
    `;
    inputField.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate smart answering based on the host website's live text content
    setTimeout(() => {
      let reply = `Based on the content of this page ("${document.title}"), I can confirm that your query relates to the information provided here.`;
      
      const lowerQuery = text.toLowerCase();
      // Simple keyword matcher against the host page text
      if (pageContext.toLowerCase().includes(lowerQuery)) {
        reply = `Yes! I found that on this page: Looking at the text under "${document.title}", it covers your question about "${text}".`;
      } else {
        reply = `I scanned this current page ("${document.title}"), but couldn't find a direct match for "${text}". Feel free to check our main navigation menu or contact support!`;
      }

      messagesContainer.innerHTML += `
        <div class="flex items-start space-x-2">
          <div style="background-color: ${primaryColor}" class="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">AI</div>
          <div class="bg-white dark:bg-slate-900 p-3 rounded-2xl rounded-tl-sm border border-slate-200 dark:border-slate-800 max-w-[85%] shadow-sm">
            <p>${reply}</p>
          </div>
        </div>
      `;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 800);
  }

  sendBtn.onclick = handleSend;
  inputField.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
  }
})();
