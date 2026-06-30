export type PostPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type PostStatus = 'Published' | 'Hidden' | 'Pending' | 'Deleted' | 'Featured';
export type ReportStatus = 'Pending' | 'Reviewing' | 'Resolved' | 'Dismissed';
export type TimeToggle = 'Today' | 'This Hour' | 'This Week' | 'This Month' | 'This Year';

export interface PostRecord {
  id: string;
  anonymousUserId: string;
  preview: string;
  category: string;
  hashTags: string[];
  likes: number;
  comments: number;
  reports: number;
  createdTime: string;
  visibilityStatus: PostStatus;
  scanned: boolean;
}

export interface ReportRecord {
  id: string;
  postPreview: string;
  reportReason: string;
  reportCount: number;
  category: string;
  reportedBy: string;
  createdAt: string;
  priority: PostPriority;
  status: ReportStatus;
}

export interface CategoryStat {
  name: string;
  totalPosts: number;
  percentage: number;
  growth: number;
  color: string;
}

export interface HashTagStat {
  tag: string;
  usageCount: number;
  percentage: number;
  trending: boolean;
  color: string;
}

export interface HeatmapData {
  hour: number;
  day: number;
  posts: number;
  engagement: number;
  peakPercentage: number;
}

export interface WorldActivityData {
  country: string;
  city: string;
  posts: number;
  percentage: number;
  topCategory: string;
  lat?: number;
  lng?: number;
}

export interface PostMetrics {
  totalPosts: number;
  growthPercentage: number;
  postsCreated: number;
  toggle: TimeToggle;
  reportedPosts: number;
  needsReviewPercentage: number;
  deletedPosts: number;
}
