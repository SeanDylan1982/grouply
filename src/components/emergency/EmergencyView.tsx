import React from 'react';
import { Phone, AlertTriangle, Shield, Users, MapPin, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const EmergencyView: React.FC = () => {
  const { currentNeighborhood } = useApp();

  const emergencyActions = [
    {
      title: 'Call 911',
      description: 'For immediate emergency assistance',
      icon: Phone,
      action: () => window.open('tel:911'),
      color: 'bg-red-600 hover:bg-red-700',
      urgent: true
    },
    {
      title: 'Security Alert',
      description: 'Report suspicious activity to neighbors',
      icon: Shield,
      action: () => {},
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: 'Community Alert',
      description: 'Send non-urgent alert to neighborhood',
      icon: Users,
      action: () => {},
      color: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  const recentAlerts = [
    {
      id: '1',
      type: 'security',
      title: 'Suspicious Vehicle Reported',
      description: 'Unknown van parked on Oak Street for 2+ hours',
      timestamp: new Date(Date.now() - 3600000),
      location: 'Oak Street & 3rd Ave',
      status: 'resolved'
    },
    {
      id: '2',
      type: 'safety',
      title: 'Street Light Outage',
      description: 'Multiple street lights out on Maple Drive',
      timestamp: new Date(Date.now() - 7200000),
      location: 'Maple Drive',
      status: 'pending'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'security': return Shield;
      case 'safety': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-red-50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Emergency & Safety</h2>
            <p className="text-sm text-gray-600">{currentNeighborhood?.name}</p>
          </div>
        </div>
        <div className="bg-red-100 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">
            <strong>Emergency Notice:</strong> For life-threatening emergencies, always call 911 first.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Emergency Actions */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {emergencyActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`p-4 rounded-lg text-white transition-all duration-200 transform hover:scale-105 ${action.color} ${
                    action.urgent ? 'ring-2 ring-red-300 animate-pulse' : ''
                  }`}
                >
                  <Icon size={24} className="mx-auto mb-2" />
                  <div className="text-center">
                    <p className="font-semibold text-sm">{action.title}</p>
                    <p className="text-xs opacity-90 mt-1">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="px-4 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
          <div className="space-y-3">
            {currentNeighborhood?.emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                    {contact.email && (
                      <p className="text-sm text-gray-500">{contact.email}</p>
                    )}
                  </div>
                  <button
                    onClick={() => window.open(`tel:${contact.phone}`)}
                    className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Phone size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="px-4 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
                <div key={alert.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertIcon size={20} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{Math.floor((Date.now() - alert.timestamp.getTime()) / 3600000)}h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety Guidelines */}
        <div className="px-4 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Guidelines</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-blue-800">
              {currentNeighborhood?.guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyView;