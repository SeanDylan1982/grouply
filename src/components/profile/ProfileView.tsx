import React, { useState } from 'react';
import { User, MapPin, Shield, Bell, Settings, LogOut, Edit, Check, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ProfileView: React.FC = () => {
  const { currentUser, currentNeighborhood } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);

  const handleSave = () => {
    // In real app, this would update the user profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(currentUser);
    setIsEditing(false);
  };

  const profileSections = [
    {
      title: 'Account Settings',
      items: [
        { icon: Bell, label: 'Notifications', description: 'Manage your alert preferences' },
        { icon: Shield, label: 'Privacy & Security', description: 'Control your privacy settings' },
        { icon: Settings, label: 'App Settings', description: 'Customize your experience' }
      ]
    },
    {
      title: 'Neighborhood',
      items: [
        { icon: MapPin, label: 'Change Location', description: 'Update your neighborhood' },
        { icon: User, label: 'Verification Status', description: 'Manage your verification' }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Profile</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* User Info */}
        <div className="p-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={currentUser?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'}
                  alt={currentUser?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser?.name || ''}
                      onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                      className="text-xl font-bold bg-transparent border-b border-white/50 focus:border-white outline-none text-white placeholder-white/70"
                    />
                  ) : (
                    <h3 className="text-xl font-bold">{currentUser?.name}</h3>
                  )}
                  <p className="text-blue-100">{currentUser?.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${currentUser?.isOnline ? 'bg-green-400' : 'bg-gray-400'}`} />
                    <span className="text-sm text-blue-100">
                      {currentUser?.isOnline ? 'Online' : 'Offline'}
                    </span>
                    {currentUser?.verified && (
                      <div className="flex items-center space-x-1">
                        <Shield size={14} className="text-green-400" />
                        <span className="text-sm text-green-400">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                  >
                    <Edit size={18} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin size={16} className="text-blue-200" />
                <span className="text-sm font-medium text-blue-100">Current Neighborhood</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={currentNeighborhood?.name || ''}
                  className="w-full bg-transparent border-b border-white/50 focus:border-white outline-none text-white placeholder-white/70"
                  placeholder="Neighborhood name"
                />
              ) : (
                <p className="font-semibold">{currentNeighborhood?.name}</p>
              )}
              <p className="text-sm text-blue-200 mt-1">
                {currentNeighborhood?.memberCount} active members
              </p>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="space-y-6">
            {profileSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h4>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={itemIndex}
                        className="w-full flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-left"
                      >
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Icon size={20} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="w-full flex items-center justify-center space-x-2 p-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;