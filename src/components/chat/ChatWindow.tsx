import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Shield } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Message } from '../../types';
import { formatTime } from '../../utils/dateUtils';

const ChatWindow: React.FC = () => {
  const { selectedChat, currentUser } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock messages for demonstration
  useEffect(() => {
    if (selectedChat) {
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: selectedChat.type === 'direct' ? '4' : '2',
          content: selectedChat.type === 'direct' 
            ? 'Hi Sarah! Thanks again for helping with the packages yesterday.'
            : 'Has anyone noticed the new security cameras being installed on Oak Street?',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        },
        {
          id: '2',
          senderId: currentUser?.id || '1',
          content: selectedChat.type === 'direct'
            ? 'No problem at all! Happy to help neighbors out.'
            : 'Yes, I saw them this morning. Great addition for our safety!',
          timestamp: new Date(Date.now() - 3300000),
          type: 'text'
        },
        {
          id: '3',
          senderId: selectedChat.type === 'direct' ? '4' : '3',
          content: selectedChat.type === 'direct'
            ? 'Would you like to grab coffee sometime this week?'
            : 'The security company said they\'ll be fully operational by Friday.',
          timestamp: new Date(Date.now() - 1800000),
          type: 'text'
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedChat, currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat || !currentUser) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  const getChatAvatar = () => {
    if (selectedChat.type === 'direct') {
      return 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop';
    }
    return null;
  };

  const getChatIcon = () => {
    if (selectedChat.isEmergency) return Shield;
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getChatAvatar() ? (
              <img
                src={getChatAvatar()!}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedChat.isEmergency 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {getChatIcon() ? <Shield size={20} /> : <Send size={20} />}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center">
                {selectedChat.name}
                {selectedChat.isEmergency && (
                  <Shield size={16} className="ml-2 text-red-500" />
                )}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedChat.type === 'direct' ? 'Online' : `${selectedChat.participants.length} members`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedChat.type === 'direct' && (
              <>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Video size={20} />
                </button>
              </>
            )}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.senderId === currentUser?.id;
          
          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                {!isOwn && (
                  <div className="flex items-center space-x-2 mb-1">
                    <img
                      src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&fit=crop"
                      alt="Sender"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-gray-700">
                      {selectedChat.type === 'direct' ? selectedChat.name : 'Mike Chen'}
                    </span>
                  </div>
                )}
                
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    isOwn
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                
                <p className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <Paperclip size={16} />
                </button>
                <button
                  type="button"
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <Smile size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              newMessage.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;