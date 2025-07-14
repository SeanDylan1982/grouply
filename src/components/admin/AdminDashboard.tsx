import React from 'react';
import { Users, MessageSquare, AlertTriangle, TrendingUp, Activity, Shield } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminDashboard: React.FC = () => {
  const { analytics, users, groups, moderationQueue } = useAdmin();

  const stats = [
    {
      title: 'Total Users',
      value: analytics?.totalUsers || 0,
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: analytics?.activeUsers || 0,
      change: '+8%',
      changeType: 'positive' as const,
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      title: 'Total Messages',
      value: analytics?.totalMessages || 0,
      change: '+24%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Reports',
      value: moderationQueue.filter(item => item.status === 'pending').length,
      change: '-15%',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'user_joined',
      description: 'Emma Wilson joined Oak Hill District',
      timestamp: new Date(Date.now() - 3600000),
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'report_submitted',
      description: 'New content report submitted',
      timestamp: new Date(Date.now() - 7200000),
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      id: '3',
      type: 'group_created',
      description: 'New group "Pet Owners" created',
      timestamp: new Date(Date.now() - 10800000),
      icon: MessageSquare,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your neighborhood watch platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'text-green-700 bg-green-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className={activity.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.floor((Date.now() - activity.timestamp.getTime()) / 3600000)}h ago
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Users</p>
                <p className="text-sm text-gray-500">View and manage user accounts</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield size={16} className="text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Review Reports</p>
                <p className="text-sm text-gray-500">Moderate flagged content</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">View Analytics</p>
                <p className="text-sm text-gray-500">Check platform performance</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity size={24} className="text-green-600" />
            </div>
            <p className="font-medium text-gray-900">Server Status</p>
            <p className="text-sm text-green-600">Operational</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <MessageSquare size={24} className="text-blue-600" />
            </div>
            <p className="font-medium text-gray-900">Message Queue</p>
            <p className="text-sm text-blue-600">Normal</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield size={24} className="text-purple-600" />
            </div>
            <p className="font-medium text-gray-900">Security</p>
            <p className="text-sm text-purple-600">Protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;