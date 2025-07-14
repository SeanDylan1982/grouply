import React from 'react';
import { Search, Plus, MessageCircle, Shield, Users } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

const ChatList: React.FC = () => {
  const { chatRooms, selectedChat, setSelectedChat, currentUser } = useApp();

  const getChatName = (chat: any) => {
    if (chat.type === 'direct') {
      // For direct messages, show the other participant's name
      return chat.name;
    }
    return chat.name;
  };

  const getChatAvatar = (chat: any) => {
    if (chat.type === 'direct') {
      return 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop';
    }
    if (chat.type === 'neighborhood' || chat.isEmergency) {
      return null; // We'll use icons instead
    }
    return 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop';
  };

  const getChatIcon = (chat: any) => {
    if (chat.isEmergency) return Shield;
    if (chat.type === 'neighborhood') return Users;
    if (chat.type === 'group') return MessageCircle;
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Chats</h2>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
            <Plus size={20} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatRooms.map((chat) => {
          const ChatIcon = getChatIcon(chat);
          const avatar = getChatAvatar(chat);
          const isSelected = selectedChat?.id === chat.id;
          
          return (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar or Icon */}
                <div className="relative flex-shrink-0">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={getChatName(chat)}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : ChatIcon ? (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      chat.isEmergency 
                        ? 'bg-red-100 text-red-600' 
                        : chat.type === 'neighborhood'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      <ChatIcon size={20} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <MessageCircle size={20} className="text-gray-500" />
                    </div>
                  )}
                  
                  {chat.type === 'direct' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold truncate ${
                      isSelected ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {getChatName(chat)}
                      {chat.isEmergency && (
                        <Shield size={14} className="inline ml-1 text-red-500" />
                      )}
                    </h3>
                    {chat.lastMessage && (
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {formatDistanceToNow(chat.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  
                  {chat.lastMessage && (
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        chat.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                      }`}>
                        {chat.lastMessage.content}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-2 flex-shrink-0">
                          {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus size={16} className="mr-2" />
            <span className="text-sm font-medium">New Chat</span>
          </button>
          <button className="flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
            <Users size={16} className="mr-2" />
            <span className="text-sm font-medium">New Group</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatList;