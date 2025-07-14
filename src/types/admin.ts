export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'neighborhood_admin' | 'moderator';
  permissions: AdminPermission[];
  lastLogin: Date;
  createdAt: Date;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'content' | 'groups' | 'analytics' | 'system';
}

export interface UserManagement {
  id: string;
  name: string;
  email: string;
  neighborhood: string;
  verified: boolean;
  status: 'active' | 'suspended' | 'pending';
  joinDate: Date;
  lastActivity: Date;
  reportCount: number;
  groupCount: number;
  postCount: number;
}

export interface GroupManagement {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'neighborhood';
  memberCount: number;
  messageCount: number;
  createdAt: Date;
  lastActivity: Date;
  isActive: boolean;
  moderators: string[];
  reportCount: number;
  description?: string;
}

export interface ContentModeration {
  id: string;
  type: 'message' | 'post' | 'comment';
  content: string;
  authorId: string;
  authorName: string;
  groupId?: string;
  groupName?: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  reportCount: number;
  reports: ModerationReport[];
}

export interface ModerationReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reason: 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'other';
  description: string;
  timestamp: Date;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
}

export interface AdminAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalGroups: number;
  totalMessages: number;
  totalPosts: number;
  pendingReports: number;
  userGrowth: AnalyticsDataPoint[];
  messageActivity: AnalyticsDataPoint[];
  groupActivity: AnalyticsDataPoint[];
  reportTrends: AnalyticsDataPoint[];
}

export interface AnalyticsDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface SystemSettings {
  id: string;
  category: 'general' | 'security' | 'notifications' | 'moderation';
  name: string;
  value: string | number | boolean;
  description: string;
  lastModified: Date;
  modifiedBy: string;
}