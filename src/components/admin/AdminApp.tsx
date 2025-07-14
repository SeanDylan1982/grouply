import React from 'react';
import { AdminProvider, useAdmin } from '../../contexts/AdminContext';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import GroupManagement from './GroupManagement';
import ContentModeration from './ContentModeration';

const AdminContent: React.FC = () => {
  const { selectedAdminView } = useAdmin();

  const renderAdminContent = () => {
    switch (selectedAdminView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'groups':
        return <GroupManagement />;
      case 'moderation':
        return <ContentModeration />;
      case 'analytics':
        return <div className="p-6"><h1 className="text-2xl font-bold">Analytics (Coming Soon)</h1></div>;
      case 'settings':
        return <div className="p-6"><h1 className="text-2xl font-bold">System Settings (Coming Soon)</h1></div>;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">
          {renderAdminContent()}
        </main>
      </div>
    </div>
  );
};

const AdminApp: React.FC = () => {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
};

export default AdminApp;