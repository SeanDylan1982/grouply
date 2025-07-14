import React from 'react';
import { MessageCircle, Users, User, AlertTriangle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const BottomNavigation: React.FC = () => {
  const { activeView, setActiveView, chatRooms } = useApp();

  const getTotalUnreadCount = () => {
    return chatRooms.reduce((total, room) => total + room.unreadCount, 0);
  };

  const navigationItems = [
    {
      id: 'chats' as const,
      icon: MessageCircle,
      label: 'Chats',
      badge: getTotalUnreadCount()
    },
    {
      id: 'community' as const,
      icon: Users,
      label: 'Community',
      badge: 0
    },
    {
      id: 'emergency' as const,
      icon: AlertTriangle,
      label: 'Emergency',
      badge: 0
    },
    {
      id: 'profile' as const,
      icon: User,
      label: 'Profile',
      badge: 0
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb md:hidden">
      <div className="flex justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`relative flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Icon size={24} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                {item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;