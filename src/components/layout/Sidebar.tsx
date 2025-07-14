import React from 'react';
import { MessageCircle, Users, User, AlertTriangle, Settings, Bell } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Sidebar: React.FC = () => {
  const { activeView, setActiveView, chatRooms, currentNeighborhood, currentUser } = useApp();

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
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r md:border-gray-200 md:h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">NeighborWatch</h1>
            <p className="text-sm text-gray-500">{currentNeighborhood?.name}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`relative w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
                {item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-2">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Actions */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Bell size={20} className="mr-3" />
              <span className="font-medium">Notifications</span>
            </button>
            <button className="w-full flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Settings size={20} className="mr-3" />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer">
          <img
            src={currentUser?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'}
            alt={currentUser?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.name}</p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
          </div>
          <div className={`w-3 h-3 rounded-full ${currentUser?.isOnline ? 'bg-green-400' : 'bg-gray-300'}`} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;