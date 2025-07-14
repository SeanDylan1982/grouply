import React, { useState } from 'react';
import { Plus, Filter, Search, Heart, MessageSquare, AlertCircle, Calendar, ShoppingBag, HelpCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { CommunityPost } from '../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';

const CommunityBoard: React.FC = () => {
  const { communityPosts } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Posts', icon: null },
    { id: 'safety', label: 'Safety', icon: AlertCircle },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'lost-found', label: 'Lost & Found', icon: HelpCircle },
    { id: 'general', label: 'General', icon: MessageSquare }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      safety: 'bg-red-100 text-red-700',
      events: 'bg-green-100 text-green-700',
      marketplace: 'bg-blue-100 text-blue-700',
      'lost-found': 'bg-orange-100 text-orange-700',
      general: 'bg-gray-100 text-gray-700',
      emergency: 'bg-red-200 text-red-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const filteredPosts = communityPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Community Board</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Plus size={16} />
            <span className="hidden sm:inline">New Post</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {Icon && <Icon size={16} />}
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${
                post.urgent ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                    alt="Author"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Mike Chen</p>
                    <p className="text-sm text-gray-500">{formatDistanceToNow(post.timestamp)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {post.urgent && (
                    <span className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      <AlertCircle size={12} />
                      <span>Urgent</span>
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 leading-relaxed">{post.content}</p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200">
                    <Heart size={16} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                    <MessageSquare size={16} />
                    <span className="text-sm">{post.comments.length}</span>
                  </button>
                </div>
                
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  View Details
                </button>
              </div>

              {/* Comments Preview */}
              {post.comments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="space-y-2">
                    {post.comments.slice(0, 2).map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-2">
                        <img
                          src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=24&h=24&fit=crop"
                          alt="Commenter"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Emma Wilson</span> {comment.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{formatDistanceToNow(comment.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                    {post.comments.length > 2 && (
                      <button className="text-sm text-blue-600 hover:text-blue-700 ml-8">
                        View all {post.comments.length} comments
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityBoard;