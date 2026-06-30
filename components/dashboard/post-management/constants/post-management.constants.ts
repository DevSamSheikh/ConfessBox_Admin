import type {
  CategoryStat,
  HashTagStat,
  HeatmapData,
  PostRecord,
  PostMetrics,
  ReportRecord,
  WorldActivityData,
} from '../types/post-management.types';

export const POST_CATEGORIES: CategoryStat[] = [
  { name: 'Love', totalPosts: 12450, percentage: 28, growth: 12.5, color: 'var(--db-accent-pink)' },
  { name: 'University', totalPosts: 8920, percentage: 20, growth: 8.3, color: 'var(--db-accent-blue)' },
  { name: 'Family', totalPosts: 7580, percentage: 17, growth: -2.1, color: 'var(--db-accent-emerald)' },
  { name: 'Marriage', totalPosts: 6230, percentage: 14, growth: 5.7, color: 'var(--db-accent-orange)' },
  { name: 'Career', totalPosts: 5140, percentage: 12, growth: 15.2, color: 'var(--db-accent-purple)' },
  { name: 'Confession', totalPosts: 4180, percentage: 9, growth: 3.8, color: 'var(--db-primary)' },
];

export const POST_HASHTAGS: HashTagStat[] = [
  { tag: '#love', usageCount: 8920, percentage: 22, trending: true, color: 'var(--db-accent-pink)' },
  { tag: '#secret', usageCount: 7240, percentage: 18, trending: true, color: 'var(--db-accent-blue)' },
  { tag: '#college', usageCount: 5890, percentage: 15, trending: false, color: 'var(--db-accent-emerald)' },
  { tag: '#family', usageCount: 5120, percentage: 13, trending: false, color: 'var(--db-accent-orange)' },
  { tag: '#crush', usageCount: 4230, percentage: 11, trending: true, color: 'var(--db-accent-purple)' },
  { tag: '#career', usageCount: 3600, percentage: 9, trending: false, color: 'var(--db-primary)' },
];

export const POST_METRICS: PostMetrics = {
  totalPosts: 44500,
  growthPercentage: 14.7,
  postsCreated: 187,
  toggle: 'Today',
  reportedPosts: 342,
  needsReviewPercentage: 23,
  deletedPosts: 128,
};

export const POST_RECORDS: PostRecord[] = [
  {
    id: 'POST-001',
    anonymousUserId: 'anon_8f3k2',
    preview: 'I finally told my best friend that I have feelings for them...',
    category: 'Love',
    hashTags: ['#love', '#crush', '#confession'],
    likes: 1247,
    comments: 342,
    reports: 5,
    createdTime: '2 hours ago',
    visibilityStatus: 'Published',
    scanned: true,
  },
  {
    id: 'POST-002',
    anonymousUserId: 'anon_2k9j4',
    preview: 'My professor failed me because I refused to date their child...',
    category: 'University',
    hashTags: ['#college', '#unfair', '#needhelp'],
    likes: 892,
    comments: 156,
    reports: 12,
    createdTime: '4 hours ago',
    visibilityStatus: 'Published',
    scanned: true,
  },
  {
    id: 'POST-003',
    anonymousUserId: 'anon_7m3n1',
    preview: 'I have been married for 10 years but I still think about my ex...',
    category: 'Marriage',
    hashTags: ['#marriage', '#regret', '#secret'],
    likes: 2341,
    comments: 487,
    reports: 3,
    createdTime: '6 hours ago',
    visibilityStatus: 'Published',
    scanned: true,
  },
  {
    id: 'POST-004',
    anonymousUserId: 'anon_5p8q2',
    preview: 'I got my dream job but I hate every minute of it...',
    category: 'Career',
    hashTags: ['#career', '#burnout', '#work'],
    likes: 567,
    comments: 89,
    reports: 0,
    createdTime: '8 hours ago',
    visibilityStatus: 'Published',
    scanned: false,
  },
  {
    id: 'POST-005',
    anonymousUserId: 'anon_9r4s3',
    preview: 'My parents disowned me for choosing my own path...',
    category: 'Family',
    hashTags: ['#family', '#rejection', '#healing'],
    likes: 1823,
    comments: 298,
    reports: 8,
    createdTime: '10 hours ago',
    visibilityStatus: 'Hidden',
    scanned: false,
  },
  {
    id: 'POST-006',
    anonymousUserId: 'anon_1t6u5',
    preview: 'I cheated on my partner and they will never know...',
    category: 'Confession',
    hashTags: ['#confession', '#guilt', '#secret'],
    likes: 3421,
    comments: 612,
    reports: 24,
    createdTime: '12 hours ago',
    visibilityStatus: 'Pending',
    scanned: false,
  },
  {
    id: 'POST-007',
    anonymousUserId: 'anon_3v7w8',
    preview: 'I am secretly planning to leave my country next month...',
    category: 'Career',
    hashTags: ['#career', '#migration', '#newbeginning'],
    likes: 945,
    comments: 167,
    reports: 2,
    createdTime: '14 hours ago',
    visibilityStatus: 'Published',
    scanned: true,
  },
  {
    id: 'POST-008',
    anonymousUserId: 'anon_4x9y1',
    preview: 'My sibling stole my identity and ruined my credit score...',
    category: 'Family',
    hashTags: ['#family', '#betrayal', '#legal'],
    likes: 2156,
    comments: 389,
    reports: 15,
    createdTime: '16 hours ago',
    visibilityStatus: 'Published',
    scanned: false,
  },
];

export const REPORT_RECORDS: ReportRecord[] = [
  {
    id: 'RPT-001',
    postPreview: 'I cheated on my partner and they will never know...',
    reportReason: 'Inappropriate content',
    reportCount: 24,
    category: 'Confession',
    reportedBy: 'user_123',
    createdAt: '2 hours ago',
    priority: 'Critical',
    status: 'Pending',
  },
  {
    id: 'RPT-002',
    postPreview: 'My professor failed me because I refused to date their child...',
    reportReason: 'Harassment',
    reportCount: 12,
    category: 'University',
    reportedBy: 'user_456',
    createdAt: '4 hours ago',
    priority: 'High',
    status: 'Reviewing',
  },
  {
    id: 'RPT-003',
    postPreview: 'My sibling stole my identity and ruined my credit score...',
    reportReason: 'False information',
    reportCount: 15,
    category: 'Family',
    reportedBy: 'user_789',
    createdAt: '6 hours ago',
    priority: 'High',
    status: 'Pending',
  },
  {
    id: 'RPT-004',
    postPreview: 'I finally told my best friend that I have feelings for them...',
    reportReason: 'Spam',
    reportCount: 5,
    category: 'Love',
    reportedBy: 'user_012',
    createdAt: '8 hours ago',
    priority: 'Medium',
    status: 'Resolved',
  },
  {
    id: 'RPT-005',
    postPreview: 'My parents disowned me for choosing my own path...',
    reportReason: 'Inappropriate content',
    reportCount: 8,
    category: 'Family',
    reportedBy: 'user_345',
    createdAt: '10 hours ago',
    priority: 'Medium',
    status: 'Reviewing',
  },
];

export const HEATMAP_DATA: HeatmapData[] = Array.from({ length: 168 }, (_, i) => {
  const hour = i % 24;
  const day = Math.floor(i / 24);
  const basePosts = Math.floor(Math.random() * 50) + 10;
  const isPeak = hour >= 19 && hour <= 23 && day < 5;
  return {
    hour,
    day,
    posts: isPeak ? basePosts * 3 : basePosts,
    engagement: Math.floor(Math.random() * 100) + 20,
    peakPercentage: isPeak ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40),
  };
});

export const WORLD_ACTIVITY_DATA: WorldActivityData[] = [
  { country: 'United States', city: 'New York', 
posts: 5420, percentage: 28, topCategory: 'Love', lat: 40.7128, lng: -74.0060 },
  { country: 'United States', city: 'Los Angeles', posts: 3890, percentage: 20, topCategory: 'Career', lat: 34.0522, lng: -118.2437 },
  { country: 'United Kingdom', city: 'London', posts: 3120, percentage: 16, topCategory: 'Family', lat: 51.5074, lng: -0.1278 },
  { country: 'India', city: 'Mumbai', posts: 2450, percentage: 13, topCategory: 'University', lat: 19.0760, lng: 72.8777 },
  { country: 'Canada', city: 'Toronto', posts: 1980, percentage: 10, topCategory: 'Marriage', lat: 43.6532, lng: -79.3832 },
  { country: 'Australia', city: 'Sydney', posts: 1560, percentage: 8, topCategory: 'Love', lat: -33.8688, lng: 151.2093 },
  { country: 'Germany', city: 'Berlin', posts: 1120, percentage: 5, topCategory: 'Career', lat: 52.5200, lng: 13.4050 },
];

export const PRIORITY_CLASS: Record<string, string> = {
  Critical: 'border-[#EF4444] bg-[#1E1E2E] text-[#EF4444]',
  High: 'border-[#F97316] bg-[#1E1E2E] text-[#F97316]',
  Medium: 'border-[#EAB308] bg-[#1E1E2E] text-[#EAB308]',
  Low: 'border-[#6B7280] bg-[#1E1E2E] text-[#6B7280]',
};

export const STATUS_CLASS: Record<string, string> = {
  Published: 'border-[#10B981] bg-[#1E1E2E] text-[#10B981]',
  Hidden: 'border-[#6B7280] bg-[#1E1E2E] text-[#6B7280]',
  Pending: 'border-[#F97316] bg-[#1E1E2E] text-[#F97316]',
  Deleted: 'border-[#EF4444] bg-[#1E1E2E] text-[#EF4444]',
  Featured: 'border-[#6366F1] bg-[#1E1E2E] text-[#6366F1]',
};

export const REPORT_STATUS_CLASS: Record<string, string> = {
  Pending: 'border-[#F97316] bg-[#1E1E2E] text-[#F97316]',
  Reviewing: 'border-[#06B6D4] bg-[#1E1E2E] text-[#06B6D4]',
  Resolved: 'border-[#10B981] bg-[#1E1E2E] text-[#10B981]',
  Dismissed: 'border-[#6B7280] bg-[#1E1E2E] text-[#6B7280]',
};
