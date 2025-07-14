import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser, UserManagement, GroupManagement, ContentModeration, AdminAnalytics, SystemSettings } from '../types/admin';

interface AdminContextType {
  currentAdmin: AdminUser | null;
  setCurrentAdmin: (admin: AdminUser | null) => void;
  users: UserManagement[];
  setUsers: (users: UserManagement[]) => void;
  groups: GroupManagement[];
  setGroups: (groups: GroupManagement[]) => void;
  moderationQueue: ContentModeration[];
  setModerationQueue: (queue: ContentModeration[]) => void;
  analytics: AdminAnalytics | null;
  setAnalytics: (analytics: AdminAnalytics | null) => void;
  systemSettings: SystemSettings[];
  setSystemSettings: (settings: SystemSettings[]) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (authenticated: boolean) => void;
  selectedAdminView: 'dashboard' | 'users' | 'groups' | 'moderation' | 'analytics' | 'settings';
  setSelectedAdminView: (view: 'dashboard' | 'users' | 'groups' | 'moderation' | 'analytics' | 'settings') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [users, setUsers] = useState<UserManagement[]>([]);
  const [groups, setGroups] = useState<GroupManagement[]>([]);
  const [moderationQueue, setModerationQueue] = useState<ContentModeration[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [systemSettings, setSystemSettings] = useState<SystemSettings[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedAdminView, setSelectedAdminView] = useState<'dashboard' | 'users' | 'groups' | 'moderation' | 'analytics' | 'settings'>('dashboard');

  // Initialize with mock admin data
  useEffect(() => {
    // Mock admin user
    const mockAdmin: AdminUser = {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@neighborwatch.com',
      role: 'super_admin',
      permissions: [
        { id: '1', name: 'User Management', description: 'Manage user accounts', category: 'users' },
        { id: '2', name: 'Content Moderation', description: 'Moderate posts and messages', category: 'content' },
        { id: '3', name: 'Group Management', description: 'Manage groups and channels', category: 'groups' },
        { id: '4', name: 'Analytics Access', description: 'View analytics and reports', category: 'analytics' },
        { id: '5', name: 'System Settings', description: 'Configure system settings', category: 'system' }
      ],
      lastLogin: new Date(),
      createdAt: new Date(Date.now() - 86400000 * 30)
    };

    // Mock users
    const mockUsers: UserManagement[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        neighborhood: 'Maple Grove Community',
        verified: true,
        status: 'active',
        joinDate: new Date(Date.now() - 86400000 * 15),
        lastActivity: new Date(Date.now() - 3600000),
        reportCount: 0,
        groupCount: 3,
        postCount: 12
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        neighborhood: 'Maple Grove Community',
        verified: true,
        status: 'active',
        joinDate: new Date(Date.now() - 86400000 * 20),
        lastActivity: new Date(Date.now() - 7200000),
        reportCount: 1,
        groupCount: 2,
        postCount: 8
      },
      {
        id: '3',
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        neighborhood: 'Oak Hill District',
        verified: false,
        status: 'pending',
        joinDate: new Date(Date.now() - 86400000 * 2),
        lastActivity: new Date(Date.now() - 86400000),
        reportCount: 0,
        groupCount: 1,
        postCount: 2
      }
    ];

    // Mock groups
    const mockGroups: GroupManagement[] = [
      {
        id: '1',
        name: 'General Discussion',
        type: 'neighborhood',
        memberCount: 247,
        messageCount: 1543,
        createdAt: new Date(Date.now() - 86400000 * 60),
        lastActivity: new Date(Date.now() - 300000),
        isActive: true,
        moderators: ['admin-1', '1'],
        reportCount: 2,
        description: 'Main neighborhood discussion channel'
      },
      {
        id: '2',
        name: 'Safety Alerts',
        type: 'group',
        memberCount: 189,
        messageCount: 234,
        createdAt: new Date(Date.now() - 86400000 * 45),
        lastActivity: new Date(Date.now() - 3600000),
        isActive: true,
        moderators: ['admin-1'],
        reportCount: 0,
        description: 'Emergency and safety notifications'
      }
    ];

    // Mock moderation queue
    const mockModerationQueue: ContentModeration[] = [
      {
        id: '1',
        type: 'post',
        content: 'Selling my old furniture, great condition! Contact me for details.',
        authorId: '2',
        authorName: 'Mike Chen',
        timestamp: new Date(Date.now() - 3600000),
        status: 'pending',
        reportCount: 1,
        reports: [
          {
            id: '1',
            reporterId: '3',
            reporterName: 'Emma Wilson',
            reason: 'spam',
            description: 'This looks like commercial advertising',
            timestamp: new Date(Date.now() - 1800000),
            status: 'open'
          }
        ]
      }
    ];

    // Mock analytics
    const mockAnalytics: AdminAnalytics = {
      totalUsers: 247,
      activeUsers: 189,
      totalGroups: 12,
      totalMessages: 3456,
      totalPosts: 89,
      pendingReports: 3,
      userGrowth: [
        { date: '2024-01-01', value: 200 },
        { date: '2024-01-02', value: 210 },
        { date: '2024-01-03', value: 225 },
        { date: '2024-01-04', value: 240 },
        { date: '2024-01-05', value: 247 }
      ],
      messageActivity: [
        { date: '2024-01-01', value: 150 },
        { date: '2024-01-02', value: 180 },
        { date: '2024-01-03', value: 220 },
        { date: '2024-01-04', value: 190 },
        { date: '2024-01-05', value: 250 }
      ],
      groupActivity: [
        { date: '2024-01-01', value: 8 },
        { date: '2024-01-02', value: 10 },
        { date: '2024-01-03', value: 11 },
        { date: '2024-01-04', value: 12 },
        { date: '2024-01-05', value: 12 }
      ],
      reportTrends: [
        { date: '2024-01-01', value: 2 },
        { date: '2024-01-02', value: 1 },
        { date: '2024-01-03', value: 3 },
        { date: '2024-01-04', value: 2 },
        { date: '2024-01-05', value: 3 }
      ]
    };

    // Mock system settings
    const mockSettings: SystemSettings[] = [
      {
        id: '1',
        category: 'general',
        name: 'Site Name',
        value: 'NeighborWatch',
        description: 'The name of the application',
        lastModified: new Date(),
        modifiedBy: 'admin-1'
      },
      {
        id: '2',
        category: 'security',
        name: 'Require Email Verification',
        value: true,
        description: 'Require users to verify their email before joining',
        lastModified: new Date(),
        modifiedBy: 'admin-1'
      },
      {
        id: '3',
        category: 'moderation',
        name: 'Auto-moderate Posts',
        value: false,
        description: 'Automatically moderate posts using AI',
        lastModified: new Date(),
        modifiedBy: 'admin-1'
      }
    ];

    setCurrentAdmin(mockAdmin);
    setUsers(mockUsers);
    setGroups(mockGroups);
    setModerationQueue(mockModerationQueue);
    setAnalytics(mockAnalytics);
    setSystemSettings(mockSettings);
    setIsAdminAuthenticated(true);
  }, []);

  const value = {
    currentAdmin,
    setCurrentAdmin,
    users,
    setUsers,
    groups,
    setGroups,
    moderationQueue,
    setModerationQueue,
    analytics,
    setAnalytics,
    systemSettings,
    setSystemSettings,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    selectedAdminView,
    setSelectedAdminView,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};