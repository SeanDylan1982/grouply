import React from 'react';
import { BarChart3, Users, MessageSquare, Shield, Settings, AlertTriangle, Home, LogOut } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminSidebar: React.FC = () => {
  const { selectedAdminView, setSelectedAdminView, currentAdmin, moderationQueue } = useAdmin();

  const navigationItems = [
    {
      id: 'dashboard' as const,
      icon: Home,
      label: 'Dashboard',
      badge: 0
    },
    {
      id: 'users' as const,
      icon: Users,
      label: 'User Management',
      badge: 0
    },
    {
      id: 'groups' as const,
      icon: MessageSquare,
      label: 'Group Management',
      badge: 0
    },
    {
      id: 'moderation' as const,
      icon: Shield,
      label: 'Content Moderation',
      badge: moderationQueue.filter(item => item.status === 'pending').length
    },
    {
      id: 'analytics' as const,
      icon: BarChart3,
      label: 'Analytics',
      badge: 0
    },
    {
      id: 'settings' as const,
      icon: Settings,
      label: 'System Settings',
      badge: 0
    }
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-400">NeighborWatch</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedAdminView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setSelectedAdminView(item.id)}
                className={`relative w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                  isSelected
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
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

        {/* Alert Section */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle size={16} className="text-red-400" />
              <span className="text-sm font-medium text-red-400">Pending Actions</span>
            </div>
            <p className="text-xs text-red-300">
              {moderationQueue.filter(item => item.status === 'pending').length} items need review
            </p>
          </div>
        </div>
      </nav>

      {/* Admin Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 cursor-pointer">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <Users size={20} className="text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentAdmin?.name}</p>
            <p className="text-xs text-gray-400 truncate">{currentAdmin?.role.replace('_', ' ')}</p>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center space-x-2 mt-3 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200">
          <LogOut size={16} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;