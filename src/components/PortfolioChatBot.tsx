import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SYSTEM_PROMPT = `
You are Shobhit Singh’s AI Portfolio Assistant.

Your job is to represent Shobhit professionally and accurately.
You ONLY answer using the verified information provided below.
If something is not listed, say: 
"I don’t have that information yet. You can connect with Shobhit on LinkedIn for more details."

-----------------------------------
CORE IDENTITY
-----------------------------------
Name: Shobhit Singh
Role: Full-Stack Web Developer | Computer Science Undergraduate
Location: Roorkee, Uttarakhand, India
Education: B.Tech in Computer Science & Engineering (2023–Present), Quantum University
CGPA: 8.04 / 10

Career Objective:
Seeking an entry-level Software Engineering role to apply strong foundations in Data Structures, Algorithms, Programming, and Computer Networks to build scalable systems.

-----------------------------------
TECHNICAL SKILLS
-----------------------------------
Programming: C, C++, Python
Web: HTML, CSS, JavaScript, React, Node.js
Databases: MySQL
Tools: Git, GitHub
OS: Windows, Linux

-----------------------------------
KEY PROJECTS
-----------------------------------
1. Dawai Saathi  
   AI-powered medicine information platform  
   Tech: React, Node.js, Gemini API  
   Focus: Multilingual explanations, medicine search, AI reasoning

2. Vakeel AI  
   Legal assistant for Indian laws  
   Tech: Streamlit, Python, TF-IDF, Gemini API, Tavily Search  
   Features: PDF Q&A, AI reasoning, document retrieval

3. HOWOLD.AI  
   Age & Gender prediction app  
   Tech: Streamlit, TensorFlow, Keras, OpenCV  
   Features: Face detection + CNN prediction

-----------------------------------
ACHIEVEMENTS
-----------------------------------
- 180+ LeetCode problems solved
- 90+ problems on Code360
- Secretary at CodeX Club (organized technical sessions & hackathons)
- 7+ technical events conducted
- Top 5 finalist – HackIndia Hackathon
- Runner-up – intra-college hackathon
- Conducted programming sessions for juniors (1 year)

-----------------------------------
LINKS (Always format as Markdown)
-----------------------------------
Portfolio: https://shobhit115.vercel.app/
LinkedIn: https://www.linkedin.com/in/shobhit-singh-34a745249/
GitHub: https://github.com/shobhit115
LeetCode: https://leetcode.com/u/shobhit115/
Resume: https://drive.google.com/file/d/1OY1k3voPVyk9_MD0W6q9FDhnONSzXAj3/view
Email: shobhitsinghsingh.2019@gmail.com

-----------------------------------
STRICT RESPONSE RULES
-----------------------------------
- Keep responses concise (3–6 sentences unless explanation is requested).
- Be confident, clear, and professional.
- Do NOT invent technologies, experience, or internships.
- If asked about hiring or collaboration → Direct to LinkedIn.
- If asked about code or repositories → Direct to GitHub.
- If asked for resume → Provide Markdown resume link.
- Always format links like: [LinkedIn](URL)
- Stay in character as Shobhit’s AI assistant.
- No emojis.
- No fluff.
- add links according to questions.
`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! 👋 I'm Shobhit's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && window.innerWidth >= 640) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!textOverride) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}` 
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', 
          temperature: 0.7,
          max_tokens: 1024,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            userMessage
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "I couldn't get a response right now.";
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error: any) {
      console.error("Chat Error:", error.message);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Oops! Something went wrong. Reach Shobhit on [LinkedIn](https://www.linkedin.com/in/shobhit-singh-34a745249/)." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What's Shobhit's tech stack?",
    "Tell me about Dawai Saathi",
    "How to hire Shobhit?",
  ];

  const chatWindow = (
    <div
      className={`fixed z-[9999] flex flex-col overflow-hidden transition-all duration-300 sm:origin-bottom-right shadow-2xl
        ${
          isOpen 
            ? 'inset-0 opacity-100 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[520px] sm:scale-100 sm:rounded-2xl pointer-events-auto' 
            : 'inset-0 opacity-0 translate-y-full sm:translate-y-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[520px] sm:scale-90 sm:rounded-2xl pointer-events-none'
        }
      `}
      style={{
        background: 'hsl(var(--background))',
        border: '1px solid hsl(var(--primary) / 0.2)',
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ 
          background: 'hsl(var(--primary) / 0.05)',
          borderColor: 'hsl(var(--primary) / 0.1)' 
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
          >
            AI
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: 'hsl(var(--foreground))' }}>Shobhit's Assistant</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs opacity-70" style={{ color: 'hsl(var(--foreground))' }}>Online</span>
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="sm:hidden p-2 opacity-70 hover:opacity-100" style={{ color: 'hsl(var(--foreground))' }}>✕</button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
              }`}
              style={
                msg.role === 'user'
                  ? { background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }
                  : { background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--foreground))' }
              }
            >
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="underline font-bold hover:opacity-70 break-all">
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center" style={{ background: 'hsl(var(--primary) / 0.1)' }}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'hsl(var(--primary) / 0.5)', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions - Arrows and Scroll Area */}
      <div className="flex items-center gap-1 px-2 pb-4">
        {/* Left Arrow Button */}
        <button 
          onClick={() => scrollRef.current?.scrollBy({ left: -150, behavior: 'smooth' })}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
          aria-label="Scroll left"
        >
          <span className="text-primary text-2xl font-bold leading-none select-none">‹</span>
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar scroll-smooth touch-pan-x py-1"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
          `}</style>
          
          {[
            "What's Shobhit's tech stack?",
            "Tell me about Dawai Saathi",
            "What is Vakeel AI?",
            "LeetCode & achievements?",
            "How to hire Shobhit?",
            "Education & CGPA?",
            "CodeX Club experience?"
          ].map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="text-[12px] px-4 py-2 rounded-full border whitespace-nowrap flex-shrink-0 transition-all hover:bg-primary/5 active:scale-95"
              style={{ 
                borderColor: 'hsl(var(--primary) / 0.4)', 
                color: 'hsl(var(--foreground))',
                background: 'hsl(var(--background))'
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={() => scrollRef.current?.scrollBy({ left: 150, behavior: 'smooth' })}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
          aria-label="Scroll right"
        >
          <span className="text-primary text-2xl font-bold leading-none select-none">›</span>
        </button>
      </div>
      

      {/* Input Area */}
      <div className="flex items-center gap-2 px-3 py-3 border-t" style={{ borderColor: 'hsl(var(--primary) / 0.1)' }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Shobhit..."
          className="flex-1 bg-transparent text-sm outline-none px-2"
          style={{ color: 'hsl(var(--foreground))' }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 flex-shrink-0"
          style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9990] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 ${isOpen ? 'hidden sm:flex' : 'flex'}`}
        style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
      >
        <span className="text-lg font-bold">{isOpen ? '✕' : 'AI'}</span>
      </button>

      {mounted && typeof document !== 'undefined' && createPortal(chatWindow, document.body)}
    </>
  );
};

export default PortfolioChatbot;