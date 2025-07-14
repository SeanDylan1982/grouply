import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, ChatRoom, CommunityPost, Neighborhood } from '../types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  selectedChat: ChatRoom | null;
  setSelectedChat: (chat: ChatRoom | null) => void;
  chatRooms: ChatRoom[];
  setChatRooms: (rooms: ChatRoom[]) => void;
  communityPosts: CommunityPost[];
  setCommunityPosts: (posts: CommunityPost[]) => void;
  currentNeighborhood: Neighborhood | null;
  setCurrentNeighborhood: (neighborhood: Neighborhood | null) => void;
  activeView: 'chats' | 'community' | 'profile' | 'emergency';
  setActiveView: (view: 'chats' | 'community' | 'profile' | 'emergency') => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [currentNeighborhood, setCurrentNeighborhood] = useState<Neighborhood | null>(null);
  const [activeView, setActiveView] = useState<'chats' | 'community' | 'profile' | 'emergency'>('chats');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize with mock data
  useEffect(() => {
    // Mock user
    const mockUser: User = {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      neighborhood: 'Maple Grove Community',
      address: '123 Maple Street',
      verified: true,
      isOnline: true,
    };

    // Mock neighborhood
    const mockNeighborhood: Neighborhood = {
      id: '1',
      name: 'Maple Grove Community',
      description: 'A safe and friendly neighborhood committed to looking out for one another.',
      memberCount: 247,
      emergencyContacts: [
        { name: 'Emergency Services', role: 'Emergency', phone: '911' },
        { name: 'Neighborhood Watch Captain', role: 'Watch Captain', phone: '(555) 123-4567', email: 'captain@maplegroovewatch.com' },
        { name: 'Community Manager', role: 'Manager', phone: '(555) 234-5678', email: 'manager@maplegrovecommunity.com' }
      ],
      guidelines: [
        'Keep conversations respectful and helpful',
        'Report suspicious activity immediately',
        'Verify information before sharing',
        'Use emergency contacts for urgent matters'
      ]
    };

    // Mock chat rooms
    const mockChatRooms: ChatRoom[] = [
      {
        id: '1',
        name: 'General Discussion',
        type: 'neighborhood',
        participants: [],
        unreadCount: 3,
        lastMessage: {
          id: '1',
          senderId: '2',
          content: 'Has anyone seen the new security cameras being installed?',
          timestamp: new Date(Date.now() - 300000),
          type: 'text'
        }
      },
      {
        id: '2',
        name: 'Safety Alerts',
        type: 'group',
        participants: [],
        unreadCount: 1,
        isEmergency: true,
        lastMessage: {
          id: '2',
          senderId: '3',
          content: 'Reminder: Street lights maintenance tomorrow 6-8 AM',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text'
        }
      },
      {
        id: '3',
        name: 'Mike Chen',
        type: 'direct',
        participants: [],
        unreadCount: 0,
        lastMessage: {
          id: '3',
          senderId: '4',
          content: 'Thanks for helping with the packages!',
          timestamp: new Date(Date.now() - 7200000),
          type: 'text'
        }
      }
    ];

    // Mock community posts
    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        authorId: '2',
        title: 'Block Party Planning - June 15th',
        content: 'Hi everyone! We\'re organizing our annual block party for June 15th. Looking for volunteers to help with setup, food coordination, and activities. Please comment if you can help!',
        category: 'events',
        timestamp: new Date(Date.now() - 3600000),
        likes: 12,
        comments: [
          {
            id: '1',
            postId: '1',
            authorId: '3',
            content: 'I can help with the BBQ setup!',
            timestamp: new Date(Date.now() - 1800000),
            likes: 3
          }
        ]
      },
      {
        id: '2',
        authorId: '5',
        title: 'Lost Cat - Orange Tabby',
        content: 'Our cat Whiskers went missing yesterday evening around 7 PM. He\'s an orange tabby with white paws and a blue collar. Last seen near Oak Street. Please contact me if you see him!',
        category: 'lost-found',
        timestamp: new Date(Date.now() - 7200000),
        likes: 8,
        comments: [],
        urgent: true
      }
    ];

    setCurrentUser(mockUser);
    setCurrentNeighborhood(mockNeighborhood);
    setChatRooms(mockChatRooms);
    setCommunityPosts(mockPosts);
    setIsAuthenticated(true);
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    selectedChat,
    setSelectedChat,
    chatRooms,
    setChatRooms,
    communityPosts,
    setCommunityPosts,
    currentNeighborhood,
    setCurrentNeighborhood,
    activeView,
    setActiveView,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};