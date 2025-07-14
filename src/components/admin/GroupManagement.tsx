import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Users, MessageSquare, Shield, AlertTriangle } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const GroupManagement: React.FC = () => {
  const { groups } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'direct' | 'group' | 'neighborhood'>('all');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || group.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'neighborhood': return 'bg-green-100 text-green-800';
      case 'group': return 'bg-blue-100 text-blue-800';
      case 'direct': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'neighborhood': return Users;
      case 'group': return MessageSquare;
      case 'direct': return Users;
      default: return MessageSquare;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Group Management</h1>
            <p className="text-gray-600">Manage chat groups and channels</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus size={16} />
            <span>Create Group</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="neighborhood">Neighborhood</option>
            <option value="group">Group</option>
            <option value="direct">Direct</option>
          </select>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => {
          const TypeIcon = getTypeIcon(group.type);
          return (
            <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    group.type === 'neighborhood' ? 'bg-green-100' :
                    group.type === 'group' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <TypeIcon size={20} className={
                      group.type === 'neighborhood' ? 'text-green-600' :
                      group.type === 'group' ? 'text-blue-600' : 'text-purple-600'
                    } />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{group.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(group.type)}`}>
                      {group.type.charAt(0).toUpperCase() + group.type.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {group.reportCount > 0 && (
                    <span className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      <AlertTriangle size={12} />
                      <span>{group.reportCount}</span>
                    </span>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Description */}
              {group.description && (
                <p className="text-sm text-gray-600 mb-4">{group.description}</p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{group.memberCount}</p>
                  <p className="text-xs text-gray-500">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{group.messageCount}</p>
                  <p className="text-xs text-gray-500">Messages</p>
                </div>
              </div>

              {/* Moderators */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Moderators</p>
                <div className="flex items-center space-x-2">
                  {group.moderators.slice(0, 3).map((moderatorId, index) => (
                    <img
                      key={moderatorId}
                      src={`https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&fit=crop`}
                      alt="Moderator"
                      className="w-6 h-6 rounded-full object-cover border border-gray-200"
                    />
                  ))}
                  {group.moderators.length > 3 && (
                    <span className="text-xs text-gray-500">+{group.moderators.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${group.isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
                  <span className="text-sm text-gray-600">
                    {group.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {Math.floor((Date.now() - group.lastActivity.getTime()) / 3600000)}h ago
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                  Manage
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default GroupManagement;