export type UserRole = 'Admin' | 'Editor' | 'User' | 'Moderator';
export type UserStatus = 'Active' | 'Suspended' | 'Pending';

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  location: string;
  joinedDate: string;
  sessions: number;
  emailVerified: boolean;
  phoneVerified: boolean;
  fraudScore: number;
  spamRisk: number;
};

export type SortField = 'name' | 'role' | 'status' | 'lastActive' | 'location' | 'joinedDate';
export type SortDirection = 'asc' | 'desc';
