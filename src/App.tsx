import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import AdminApp from './components/admin/AdminApp';
import Sidebar from './components/layout/Sidebar';
import BottomNavigation from './components/layout/BottomNavigation';
import ChatList from './components/chat/ChatList';
import ChatWindow from './components/chat/ChatWindow';
import CommunityBoard from './components/community/CommunityBoard';
import EmergencyView from './components/emergency/EmergencyView';
import ProfileView from './components/profile/ProfileView';

const AppContent: React.FC = () => {
  const { activeView, selectedChat } = useApp();

  const renderMainContent = () => {
    switch (activeView) {
      case 'chats':
        return (
          <div className="flex h-full">
            <div className="w-full md:w-80 border-r border-gray-200">
              <ChatList />
            </div>
            <div className="hidden md:flex md:flex-1">
              <ChatWindow />
            </div>
          </div>
        );
      case 'community':
        return <CommunityBoard />;
      case 'emergency':
        return <EmergencyView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <ChatList />;
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Chat Window Overlay */}
        {selectedChat && activeView === 'chats' && (
          <div className="md:hidden fixed inset-0 z-50 bg-white">
            <ChatWindow />
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {renderMainContent()}
        </main>
        
        <BottomNavigation />
      </div>
    </div>
  );
};

function App() {
  // Check if we're in admin mode
  const isAdminMode = window.location.pathname.startsWith('/admin');

  if (isAdminMode) {
    return <AdminApp />;
  }

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;