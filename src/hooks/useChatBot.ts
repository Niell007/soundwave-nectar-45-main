import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { useNavigate } from "react-router-dom";

export type Message = {
  type: 'user' | 'bot';
  content: string;
};

export const useChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleAdminCommand = async (command: string) => {
    if (!isAdmin) {
      setMessages(prev => [...prev, { type: 'bot', content: "Admin access required." }]);
      return true;
    }

    const adminCommands = {
      '/admin stats': () => navigate('/admin/stats'),
      '/admin users': () => navigate('/admin/users'),
      '/admin settings': () => navigate('/admin/settings'),
    };

    const commandFn = adminCommands[command as keyof typeof adminCommands];
    if (commandFn) {
      commandFn();
      return true;
    }

    return false;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { type: 'user', content: message }]);

      if (message.startsWith('/admin')) {
        const isAdminCommand = await handleAdminCommand(message);
        if (isAdminCommand) {
          setMessage("");
          return;
        }
      }

      const { data: settings } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'OPENROUTER_API_KEY')
        .single();

      if (!settings?.value) {
        toast({
          title: "Configuration Required",
          description: "Please configure the OpenRouter API key in settings.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.value}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: "system",
              content: `You are DJ John, a charismatic radio host and sound expert. Keep responses short, engaging, and fun - like a real radio DJ. Include emojis and sound-related terms.`
            },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 100,
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';
      
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
      setMessage("");
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    message,
    messages,
    isLoading,
    setMessage,
    handleSendMessage,
  };
};