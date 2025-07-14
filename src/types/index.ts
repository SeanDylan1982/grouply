export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  neighborhood: string;
  address?: string;
  verified: boolean;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  edited?: boolean;
  reactions?: MessageReaction[];
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'neighborhood';
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  avatar?: string;
  description?: string;
  isEmergency?: boolean;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
  category: 'general' | 'safety' | 'events' | 'marketplace' | 'lost-found' | 'emergency';
  timestamp: Date;
  likes: number;
  comments: Comment[];
  images?: string[];
  urgent?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  emergencyContacts: EmergencyContact[];
  guidelines: string[];
}

export interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
  email?: string;
}