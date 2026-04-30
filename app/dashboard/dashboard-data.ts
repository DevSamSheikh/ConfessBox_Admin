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

export type DashboardReportCategory =
  | 'violation'
  | 'false_information'
  | 'other';

export type DashboardReport = {
  id: string;
  /** Display name of the user who was reported */
  reportedUserName: string;
  /** Stable user identifier shown in UI */
  reportedUserId: string;
  category: DashboardReportCategory;
  /** Short description of why the content was flagged */
  cause: string;
  /** Display name of the reporter */
  reportedByName: string;
  /** ISO datetime string */
  reportedAtIso: string;
};

export const DASHBOARD_REPORT_CATEGORY_LABELS: Record<
  DashboardReportCategory,
  string
> = {
  violation: 'Violation',
  false_information: 'False Info',
  other: 'Other',
};

export type DashboardTopPost = {
  id: string;
  authorName: string;
  authorHandle: string;
  postedAtLabel: string;
  heading: string;
  content: string;
  interactions: number;
  comments: number;
  shares: number;
  views: number;
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
  upvotes: number;
  downvotes: number;
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

const reportFirstNames = [
  'Alex',
  'Jordan',
  'Sam',
  'Riley',
  'Casey',
  'Morgan',
  'Quinn',
  'Avery',
  'Jamie',
  'Taylor',
  'Drew',
  'Reese',
];

const reportLastInitials = ['M.', 'K.', 'L.', 'P.', 'S.', 'R.', 'T.', 'W.'];

const reporterNames = [
  'Cody Fisher',
  'Esther Howard',
  'Guy Hawkins',
  'Jenny Wilson',
  'Robert Fox',
  'Leslie Alexander',
  'Devon Lane',
  'Kristin Watson',
];

const causesByCategory: Record<DashboardReportCategory, string[]> = {
  violation: [
    'Targeted harassment in thread replies',
    'Hate speech and slurs in public post',
    'Threatening language toward another user',
    'Bullying a minor in comments',
    'Sharing private contact info without consent',
    'Spam attack on community feed',
  ],
  false_information: [
    'Claims about medical cures without sources',
    'Fabricated screenshot presented as proof',
    'Misleading statistic about voting results',
    'False emergency alert repost',
    'Impersonating official organization',
    'Outdated news framed as breaking',
  ],
  other: [
    'Off-topic spam in discussion',
    'Promotional spam with affiliate links',
    'Duplicate confession posted 6 times',
    'Bot-like posting pattern',
    'NSFW thumbnail on SFW topic',
    'Coordinated brigading suspicion',
  ],
};

function rotate<T>(arr: readonly T[], index: number): T {
  return arr[index % arr.length]!;
}

/** Sample moderation queue for the dashboard (47 rows — enough to exercise pagination). */
export const dashboardReports: DashboardReport[] = Array.from(
  { length: 47 },
  (_, i) => {
    const cat: DashboardReportCategory =
      i % 3 === 0 ? 'violation' : i % 3 === 1 ? 'false_information' : 'other';
    const day = 28 - (i % 24);
    const hour = 8 + (i % 12);
    const minute = (i * 13) % 60;
    const iso = new Date(2026, 3, day, hour, minute, 0).toISOString();
    return {
      id: `report-${i + 1}`,
      reportedUserName: `${rotate(reportFirstNames, i)} ${rotate(reportLastInitials, i + 2)}`,
      reportedUserId: `usr_${(10000 + i).toString(36)}`,
      category: cat,
      cause: rotate(causesByCategory[cat], i + cat.length),
      reportedByName: rotate(reporterNames, i + 3),
      reportedAtIso: iso,
    };
  },
);

export const dashboardTopPosts: DashboardTopPost[] = [
  {
    id: 'top-1',
    authorName: 'Confess Box',
    authorHandle: '@confessbox',
    postedAtLabel: '2h',
    heading: 'Anonymous confession #1821',
    content:
      'Sometimes the hardest part of healing is admitting what hurt you. Anonymous confession #1821.',
    interactions: 2946,
    comments: 432,
    shares: 287,
    views: 52140,
  },
  {
    id: 'top-2',
    authorName: 'Night Notes',
    authorHandle: '@nightnotes',
    postedAtLabel: '5h',
    heading: 'I pretended to be okay',
    content:
      'I kept pretending I was okay because I did not want to be a burden. Posting this to remind someone they are not alone.',
    interactions: 1874,
    comments: 318,
    shares: 149,
    views: 38220,
  },
  {
    id: 'top-3',
    authorName: 'Silent Letters',
    authorHandle: '@silentletters',
    postedAtLabel: '8h',
    heading: 'To my younger self',
    content:
      'To my younger self: your soft heart is not weakness. It is the reason you survived.',
    interactions: 1632,
    comments: 204,
    shares: 96,
    views: 27690,
  },
  {
    id: 'top-4',
    authorName: 'Hidden Pages',
    authorHandle: '@hiddenpages',
    postedAtLabel: '10h',
    heading: 'I finally said no',
    content:
      'I said no today without apologizing for it. It felt strange at first, but then it felt like freedom.',
    interactions: 1482,
    comments: 167,
    shares: 88,
    views: 24100,
  },
  {
    id: 'top-5',
    authorName: 'Midnight Voice',
    authorHandle: '@midnightvoice',
    postedAtLabel: '12h',
    heading: 'Healing is not linear',
    content:
      'Some days I feel healed, then one memory breaks me again. Maybe progress is still progress.',
    interactions: 1325,
    comments: 143,
    shares: 75,
    views: 21980,
  },
  {
    id: 'top-6',
    authorName: 'Quiet Heart',
    authorHandle: '@quietheart',
    postedAtLabel: '14h',
    heading: 'A message I never sent',
    content:
      'I wrote your name and deleted it ten times. Some words are heavy even when they stay unsent.',
    interactions: 1211,
    comments: 132,
    shares: 64,
    views: 20760,
  },
  {
    id: 'top-7',
    authorName: 'Confess Box',
    authorHandle: '@confessbox',
    postedAtLabel: '16h',
    heading: 'You are allowed to rest',
    content:
      'Rest is not laziness. You do not need to earn a pause by burning out first.',
    interactions: 1180,
    comments: 119,
    shares: 60,
    views: 19840,
  },
  {
    id: 'top-8',
    authorName: 'Night Notes',
    authorHandle: '@nightnotes',
    postedAtLabel: '18h',
    heading: 'I miss who I was',
    content:
      'Before everything happened, I trusted people faster and laughed louder. I am trying to find that version again.',
    interactions: 1104,
    comments: 108,
    shares: 55,
    views: 18690,
  },
  {
    id: 'top-9',
    authorName: 'Silent Letters',
    authorHandle: '@silentletters',
    postedAtLabel: '20h',
    heading: 'Not every goodbye is loud',
    content:
      'Sometimes people leave in tiny ways before they leave for real. I noticed too late.',
    interactions: 1022,
    comments: 97,
    shares: 52,
    views: 17340,
  },
  {
    id: 'top-10',
    authorName: 'Hidden Pages',
    authorHandle: '@hiddenpages',
    postedAtLabel: '22h',
    heading: 'Small wins still count',
    content:
      'I drank water, answered one message, and got out of bed. Today that is enough.',
    interactions: 988,
    comments: 92,
    shares: 48,
    views: 16920,
  },
  {
    id: 'top-11',
    authorName: 'Midnight Voice',
    authorHandle: '@midnightvoice',
    postedAtLabel: '1d',
    heading: 'For anyone still trying',
    content:
      'You are not behind. You are rebuilding. Keep going even if your steps are quiet.',
    interactions: 951,
    comments: 89,
    shares: 46,
    views: 16110,
  },
];

export const dashboardComments: DashboardComment[] = [
  {
    id: 'c-1',
    author: { name: 'Cody Fisher', role: 'Follower', initials: 'CF' },
    message:
      'The color palette used in this design is visually consistent and calm.',
    createdAtLabel: '2m ago',
    upvotes: 42,
    downvotes: 3,
  },
  {
    id: 'c-2',
    author: { name: 'Esther Howard', role: 'Follower', initials: 'EH' },
    message:
      'The layout feels intuitive and makes it easy to scan metrics at a glance.',
    createdAtLabel: '14m ago',
    upvotes: 31,
    downvotes: 4,
  },
  {
    id: 'c-3',
    author: { name: 'Guy Hawkins', role: 'Follower', initials: 'GH' },
    message:
      'The right rail works well as a live feed without competing with the charts.',
    createdAtLabel: '1h ago',
    upvotes: 27,
    downvotes: 2,
  },
];

export const dashboardProfile: DashboardProfile = {
  displayName: 'Hassam',
  handle: '@Hassam',
  initials: 'H',
  stats: [
    { label: 'Follower', value: '9.9T' },
    { label: 'Post', value: '125' },
    { label: 'Tags', value: '168' },
  ],
};

