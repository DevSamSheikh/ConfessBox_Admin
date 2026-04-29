export type DashboardKpi = {
  key: 'followers' | 'following' | 'likes' | 'comments';
  label: string;
  value: number;
  deltaPercent: number;
};

export type DashboardTrendMetric =
  | 'followers'
  | 'following'
  | 'likes'
  | 'comments';

export type DashboardTrendPoint = {
  month: string;
  followers: number;
  following: number;
  likes: number;
  comments: number;
};

export type DashboardAudienceSegment = {
  key: 'male' | 'female' | 'other';
  label: string;
  value: number;
};

export type DashboardRecentPost = {
  id: string;
  title: string;
  createdAtLabel: string;
  likes: number;
  comments: number;
  shares: number;
  thumbnail: { gradientFrom: string; gradientTo: string };
};

export type DashboardTopPost = {
  id: string;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
};

export type DashboardComment = {
  id: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  message: string;
  createdAtLabel: string;
};

export type DashboardProfile = {
  displayName: string;
  handle: string;
  initials: string;
  stats: Array<{ label: string; value: string }>;
};

export const dashboardKpis: DashboardKpi[] = [
  { key: 'followers', label: 'Weekly Follower', value: 4815, deltaPercent: 14.7 },
  { key: 'following', label: 'Weekly Following', value: 2658, deltaPercent: 56.2 },
  { key: 'likes', label: 'Weekly Like', value: 1235, deltaPercent: -3.6 },
  { key: 'comments', label: 'Weekly Comment', value: 3542, deltaPercent: 12.5 },
];

export const dashboardTrend: DashboardTrendPoint[] = [
  { month: 'Jan', followers: 12000, following: 5400, likes: 2100, comments: 3200 },
  { month: 'Feb', followers: 18000, following: 6200, likes: 2400, comments: 3000 },
  { month: 'Mar', followers: 26000, following: 7100, likes: 2800, comments: 3600 },
  { month: 'Apr', followers: 22000, following: 7600, likes: 3000, comments: 3400 },
  { month: 'May', followers: 31000, following: 8200, likes: 3300, comments: 3900 },
  { month: 'Jun', followers: 28000, following: 8600, likes: 3100, comments: 3700 },
  { month: 'Jul', followers: 36000, following: 9100, likes: 3500, comments: 4200 },
  { month: 'Aug', followers: 42000, following: 9600, likes: 3700, comments: 4600 },
  { month: 'Sep', followers: 39000, following: 9800, likes: 3600, comments: 4400 },
  { month: 'Oct', followers: 45000, following: 10200, likes: 3900, comments: 4800 },
  { month: 'Nov', followers: 47000, following: 10800, likes: 4100, comments: 5200 },
  { month: 'Dec', followers: 51000, following: 11200, likes: 4300, comments: 5400 },
];

export const dashboardAudience: DashboardAudienceSegment[] = [
  { key: 'male', label: 'Male', value: 378000 },
  { key: 'female', label: 'Female', value: 122000 },
  { key: 'other', label: 'Other', value: 35000 },
];

export const dashboardRecentPosts: DashboardRecentPost[] = [
  {
    id: 'post-1',
    title: 'Quiet Confession',
    createdAtLabel: '15 Jun 2024',
    likes: 1578,
    comments: 132,
    shares: 3464,
    thumbnail: { gradientFrom: 'from-primary-500', gradientTo: 'to-secondary-500' },
  },
  {
    id: 'post-2',
    title: 'Late Night Note',
    createdAtLabel: '17 May 2024',
    likes: 1673,
    comments: 253,
    shares: 753,
    thumbnail: { gradientFrom: 'from-secondary-500', gradientTo: 'to-primary-500' },
  },
  {
    id: 'post-3',
    title: 'Unsent Message',
    createdAtLabel: '27 Feb 2024',
    likes: 1245,
    comments: 136,
    shares: 6326,
    thumbnail: { gradientFrom: 'from-cyan-500', gradientTo: 'to-primary-500' },
  },
  {
    id: 'post-4',
    title: 'Small Truth',
    createdAtLabel: '14 Sep 2024',
    likes: 1754,
    comments: 122,
    shares: 3539,
    thumbnail: { gradientFrom: 'from-primary-600', gradientTo: 'to-secondary-500' },
  },
];

export const dashboardTopPosts: DashboardTopPost[] = [
  {
    id: 'top-1',
    title: 'Top Posts',
    subtitle: 'Trending today',
    gradientFrom: 'from-secondary-500',
    gradientTo: 'to-primary-500',
  },
  {
    id: 'top-2',
    title: 'Featured',
    subtitle: 'Highest reach',
    gradientFrom: 'from-primary-500',
    gradientTo: 'to-cyan-500',
  },
];

export const dashboardComments: DashboardComment[] = [
  {
    id: 'c-1',
    author: { name: 'Cody Fisher', role: 'Follower', initials: 'CF' },
    message:
      'The color palette used in this design is visually consistent and calm.',
    createdAtLabel: '2m ago',
  },
  {
    id: 'c-2',
    author: { name: 'Esther Howard', role: 'Follower', initials: 'EH' },
    message:
      'The layout feels intuitive and makes it easy to scan metrics at a glance.',
    createdAtLabel: '14m ago',
  },
  {
    id: 'c-3',
    author: { name: 'Guy Hawkins', role: 'Follower', initials: 'GH' },
    message:
      'The right rail works well as a live feed without competing with the charts.',
    createdAtLabel: '1h ago',
  },
];

export const dashboardProfile: DashboardProfile = {
  displayName: 'Merlin',
  handle: '@GinnyJ',
  initials: 'M',
  stats: [
    { label: 'Follower', value: '4.8K' },
    { label: 'Post', value: '125' },
    { label: 'Tags', value: '168' },
  ],
};

