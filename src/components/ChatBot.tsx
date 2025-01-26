import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  error?: boolean;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your DJ assistant. Ask me anything about music, playlists, or event planning!",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm still in development, but I'll be able to help you with music recommendations and event planning soon!",
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't process your request. Please try again.",
        sender: 'bot',
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
      setError('Failed to get response from the chatbot');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto flex flex-col h-[500px] p-4 gap-4" role="complementary" aria-label="DJ Assistant Chat">
      <div className="flex items-center gap-2 pb-2 border-b">
        <Bot className="w-6 h-6 text-primary" aria-hidden="true" />
        <h2 className="text-lg font-semibold">DJ Assistant</h2>
      </div>

      <ScrollArea className="flex-1 pr-4" aria-live="polite">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2 items-start",
                message.sender === 'user' && "justify-end"
              )}
            >
              {message.sender === 'bot' && (
                <Bot 
                  className="w-6 h-6 mt-2 text-primary shrink-0" 
                  aria-hidden="true"
                />
              )}
              <div
                className={cn(
                  "rounded-lg p-3 max-w-[80%]",
                  message.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-muted",
                  message.error && "bg-destructive/10 text-destructive"
                )}
                role={message.sender === 'bot' ? 'status' : 'none'}
              >
                {message.error && (
                  <AlertCircle 
                    className="w-4 h-4 inline-block mr-2 text-destructive" 
                    aria-label="Error"
                  />
                )}
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {error && (
        <div 
          className="text-sm text-destructive bg-destructive/10 p-2 rounded" 
          role="alert"
        >
          {error}
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        className="flex gap-2"
        aria-label="Chat message form"
      >
        <Input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          aria-label="Message input"
          aria-disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="w-4 h-4" aria-hidden="true" />
          )}
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </Card>
  );
};

export default ChatBot;