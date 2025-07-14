import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, AlertTriangle, Eye, MessageSquare, FileText } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const ContentModeration: React.FC = () => {
  const { moderationQueue } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'flagged'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'message' | 'post' | 'comment'>('all');

  const filteredQueue = moderationQueue.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'post': return FileText;
      case 'comment': return MessageSquare;
      default: return FileText;
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'spam': return 'bg-red-100 text-red-800';
      case 'harassment': return 'bg-purple-100 text-purple-800';
      case 'inappropriate': return 'bg-orange-100 text-orange-800';
      case 'misinformation': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Moderation</h1>
        <p className="text-gray-600">Review and moderate reported content</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="flagged">Flagged</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="message">Messages</option>
              <option value="post">Posts</option>
              <option value="comment">Comments</option>
            </select>
          </div>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="space-y-4">
        {filteredQueue.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TypeIcon size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-gray-900">{item.authorName}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                      {item.groupName && (
                        <>
                          <span>•</span>
                          <span>{item.groupName}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{Math.floor((Date.now() - item.timestamp.getTime()) / 3600000)}h ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {item.reportCount > 0 && (
                    <span className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      <AlertTriangle size={12} />
                      <span>{item.reportCount} reports</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                  <p className="text-gray-800">{item.content}</p>
                </div>
              </div>

              {/* Reports */}
              {item.reports.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Reports ({item.reports.length})</h4>
                  <div className="space-y-2">
                    {item.reports.slice(0, 2).map((report) => (
                      <div key={report.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-red-900">{report.reporterName}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getReasonColor(report.reason)}`}>
                              {report.reason.replace('-', ' ')}
                            </span>
                          </div>
                          <span className="text-xs text-red-600">
                            {Math.floor((Date.now() - report.timestamp.getTime()) / 3600000)}h ago
                          </span>
                        </div>
                        <p className="text-sm text-red-800">{report.description}</p>
                      </div>
                    ))}
                    {item.reports.length > 2 && (
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        View all {item.reports.length} reports
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Eye size={16} />
                  <span>View Full Context</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    <CheckCircle size={16} />
                    <span>Approve</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                    <XCircle size={16} />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredQueue.length === 0 && (
        <div className="text-center py-12">
          <Shield size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content to moderate</h3>
          <p className="text-gray-500">All content has been reviewed or no reports match your filters</p>
        </div>
      )}
    </div>
  );
};

export default ContentModeration;