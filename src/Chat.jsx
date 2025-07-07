import React, { useState } from 'react';

export default function Chat() {
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;

    const newMessages = [...msgs, { from: 'user', text }];
    setMsgs(newMessages);
    setText('');
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
         'Authorization': 'Bearer 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',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free', // ✅ Using OpenAI's model
          messages: [
            { role: 'system', content: 'You are GenAI, a helpful and wise assistant.' },
            { role: 'user', content: text }
          ]
        })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Error: No valid response';
      setMsgs(prev => [...prev, { from: 'genai', text: reply }]);
    } catch (err) {
      setMsgs(prev => [...prev, { from: 'genai', text: 'API Error: ' + err.message }]);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col min-h-[70vh]">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-3 bg-gray-900 rounded">
        {msgs.map((msg, i) => (
          <div key={i} className={`text-sm ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-gray-400 text-left text-sm">GenAI is typing...</p>}
      </div>

      <div className="flex mt-auto">
        <input
          className="flex-1 px-4 py-2 rounded-l bg-gray-200 text-black focus:outline-none"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask GenAI anything..."
        />
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-r"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
