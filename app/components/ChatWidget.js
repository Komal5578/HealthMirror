'use client';

import { useState, useRef, useEffect } from 'react';
import useStore from '../store/useStore';
import { 
  X, 
  Send, 
  Loader2, 
  FileText, 
  Mail,
  Cloud,
  Sparkles,
  AlertCircle,
  Bot
} from 'lucide-react';
import VoiceRecognition from './VoiceRecognition';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const messagesEndRef = useRef(null);

  const { 
    healthGoal, 
    selectedPlan, 
    userAge, 
    guiderName,
    guiderEmail,
    dailyTasks,
    streak,
    level,
    currentDay
  } = useStore();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          role: 'assistant',
          content: `Hello! I'm TwinX, your personal AI health advisor.\n\nI'm here to guide you on your ${healthGoal?.name || 'health'} journey. Think of me as your knowledgeable friend who's always ready to help!\n\n**I can help you with:**\n• Understanding your daily tasks\n• Health tips for ${healthGoal?.name || 'your goals'}\n• Motivation when you need it\n• Preparing questions for your doctor\n\n*Remember: I'm an AI advisor—for medical decisions, please consult your healthcare provider.*`
        }]);
        setShowIntro(false);
      }, 500);
    }
  }, [isOpen, healthGoal]);

  const buildContext = () => ({
    healthGoal: healthGoal?.name || 'general fitness',
    planName: selectedPlan?.name || 'your health plan',
    userAge: userAge || 'adult',
    guiderName: guiderName || 'your Guider',
    currentDay: currentDay || 1,
    totalDays: selectedPlan?.days || 30,
    completedTasks: dailyTasks?.filter(t => t.completed).length || 0,
    totalTasks: dailyTasks?.length || 0,
    streak: streak || 0,
    level: level || 1,
    recentTasks: dailyTasks?.slice(0, 5).map(t => ({
      name: t.name,
      completed: t.completed
    })) || []
  });

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          context: buildContext()
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Add assistant response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response 
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. If you're experiencing a medical emergency, please call emergency services immediately." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating TwinX Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 group z-50"
          aria-label="Open TwinX Advisor"
        >
          {/* Cloud-like background */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Cloud className="w-5 h-5" />
              <span className="font-semibold">TwinX</span>
            </div>
          </div>
          
          {/* Floating hint */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
              Your AI Health Advisor
            </div>
          </div>
        </button>
      )}

      {/* Chat Panel with Cloud-like design */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden">
          {/* Header with cloud gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">TwinX</h3>
                  <p className="text-xs text-blue-100">AI Health Advisor</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowReportModal(true)}
                  className="p-2.5 hover:bg-white/20 rounded-xl transition-colors"
                  title="Prepare Doctor Report"
                >
                  <FileText className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Status bar */}
            <div className="mt-3 flex items-center gap-2 text-xs text-blue-100">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Online and ready to help</span>
            </div>
          </div>

          {/* Messages with cloud-like bubbles */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/50 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <Cloud className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 shadow-md border border-gray-100 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                      <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">TwinX</span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content.split('\n').map((line, i) => {
                      // Handle bold text
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="font-semibold mt-2">{line.replace(/\*\*/g, '')}</p>;
                      }
                      // Handle bullet points
                      if (line.startsWith('•')) {
                        return <p key={i} className="ml-2">{line}</p>;
                      }
                      // Handle italic
                      if (line.startsWith('*') && line.endsWith('*')) {
                        return <p key={i} className="italic text-gray-500 text-xs mt-2">{line.replace(/\*/g, '')}</p>;
                      }
                      return <p key={i}>{line}</p>;
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-2 flex-shrink-0">
                  <Cloud className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-100 rounded-bl-md">
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                    </div>
                    <span className="text-sm">TwinX is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input with modern design */}
         <div className="flex items-end gap-3">
  <div className="flex-1 relative">
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder="Ask TwinX anything about your health journey..."
      className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 pr-20 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 max-h-32 bg-gray-50"
      rows={1}
      disabled={isLoading}
    />

    {/* 🎤 MIC BUTTON */}
    <div className="absolute right-3 bottom-3">
      <VoiceRecognition
        onResult={(text) =>
          setInput(prev => prev ? prev + ' ' + text : text)
        }
      />
    </div>
  </div>

  <button
    onClick={sendMessage}
    disabled={!input.trim() || isLoading}
    className="p-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
  >
    <Send className="w-5 h-5" />
  </button>
</div>


            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Health Advisor • Not a substitute for medical advice</span>
            </div>
          </div>
        
      )}

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal 
          messages={messages}
          context={buildContext()}
          guiderEmail={guiderEmail}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </>
  );
}

// Report Modal Component
function ReportModal({ messages, context, guiderEmail, onClose }) {
  const [doctorEmail, setDoctorEmail] = useState('');
  const [sendToGuider, setSendToGuider] = useState(false);
  const [sendToDoctor, setSendToDoctor] = useState(false);
  const [customSummary, setCustomSummary] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const { guiderName, healthGoal, selectedPlan, streak, level, currentDay, dailyTasks } = useStore();

  // Generate summary from chat
  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Please generate a brief, professional summary of our conversation that I can share with my doctor. Include any health concerns I mentioned, questions I should ask, and relevant context about my ${context.healthGoal} journey. Format it clearly and concisely.`,
          context
        })
      });

      const data = await response.json();
      if (data.response) {
        setCustomSummary(data.response);
      }
    } catch (error) {
      console.error('Failed to generate summary:', error);
      // Create a basic summary from messages
      const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
      setCustomSummary(`Conversation topics discussed:\n• ${userMessages.join('\n• ')}`);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const sendReport = async () => {
    if (!sendToGuider && !sendToDoctor) {
      setResult({ error: 'Please select at least one recipient' });
      return;
    }

    if (sendToDoctor && !doctorEmail) {
      setResult({ error: 'Please enter doctor\'s email' });
      return;
    }

    if (sendToGuider && !guiderEmail) {
      setResult({ error: 'Guider email not set. Please update in settings.' });
      return;
    }

    setIsSending(true);
    setResult(null);

    const progress = {
      currentDay: currentDay || 1,
      totalDays: selectedPlan?.days || 30,
      completionRate: dailyTasks?.length > 0 
        ? Math.round((dailyTasks.filter(t => t.completed).length / dailyTasks.length) * 100)
        : 0,
      streak: streak || 0
    };

    try {
      const promises = [];

      if (sendToGuider && guiderEmail) {
        promises.push(
          fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              toEmail: guiderEmail,
              recipientName: guiderName,
              recipientType: 'guider',
              userName: 'User',
              summary: customSummary,
              healthGoal: healthGoal?.name,
              planName: selectedPlan?.name,
              progress,
              chatHistory: messages.slice(-10)
            })
          })
        );
      }

      if (sendToDoctor && doctorEmail) {
        promises.push(
          fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              toEmail: doctorEmail,
              recipientName: 'Doctor',
              recipientType: 'doctor',
              userName: 'User',
              summary: customSummary,
              healthGoal: healthGoal?.name,
              planName: selectedPlan?.name,
              progress,
              chatHistory: messages.slice(-10),
              questionsForDoctor: [
                `Is the ${selectedPlan?.name} appropriate for my condition?`,
                'Are there any exercises I should avoid?',
                'What signs should I watch for that would require medical attention?'
              ]
            })
          })
        );
      }

      const results = await Promise.all(promises);
      const responses = await Promise.all(results.map(r => r.json()));
      
      // Check for Resend free tier error
      const freeTerrError = responses.find(r => r.hint);
      if (freeTerrError) {
        setResult({ 
          error: 'Email service limitation: ' + freeTerrError.hint,
          isLimitation: true
        });
        return;
      }
      
      const allSuccessful = responses.every(r => r.success);

      if (allSuccessful) {
        setResult({ success: 'Report sent successfully!' });
      } else {
        const errorMsg = responses.find(r => r.error)?.details || 'Please try again.';
        setResult({ error: 'Failed: ' + errorMsg });
      }

    } catch (error) {
      console.error('Send report error:', error);
      setResult({ error: 'Failed to send report. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Prepare Report</h2>
                <p className="text-sm text-gray-500">Share your health summary via TwinX</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/80 rounded-xl transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Summary</label>
              <button
                onClick={generateSummary}
                disabled={isGeneratingSummary}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full"
              >
                {isGeneratingSummary ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Auto-generate with TwinX
                  </>
                )}
              </button>
            </div>
            <textarea
              value={customSummary}
              onChange={(e) => setCustomSummary(e.target.value)}
              placeholder="Enter a summary of your health journey, concerns, and questions for your doctor..."
              className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          {/* Recipients */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Send to</label>
            
            {/* Free tier notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs text-amber-700">
                <strong>Note:</strong> Currently using Resend free tier - emails can only be sent to your registered email (leheldsilva2006@gmail.com). 
                For testing, use this email as the recipient.
              </p>
            </div>
            
            {/* Guider */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <input
                type="checkbox"
                id="sendToGuider"
                checked={sendToGuider}
                onChange={(e) => setSendToGuider(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor="sendToGuider" className="font-medium text-gray-900 cursor-pointer">
                  {guiderName || 'Guider'}
                </label>
                <p className="text-sm text-gray-500">
                  {guiderEmail || 'No email set - add during setup'}
                </p>
              </div>
            </div>

            {/* Doctor */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="sendToDoctor"
                  checked={sendToDoctor}
                  onChange={(e) => setSendToDoctor(e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <label htmlFor="sendToDoctor" className="font-medium text-gray-900 cursor-pointer">
                    My Doctor
                  </label>
                  <p className="text-sm text-gray-500">
                    Send a professional health summary
                  </p>
                </div>
              </div>
              
              {sendToDoctor && (
                <input
                  type="email"
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              )}
            </div>
          </div>

          {/* Result Message */}
          {result && (
            <div className={`p-4 rounded-xl flex items-center gap-2 ${
              result.success 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {result.success ? (
                <Mail className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="text-sm">{result.success || result.error}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={sendReport}
            disabled={isSending || (!sendToGuider && !sendToDoctor) || !customSummary}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {isSending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Send Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
