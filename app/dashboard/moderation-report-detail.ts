import type {
  DashboardReport,
  DashboardReportCategory,
} from '@/app/dashboard/dashboard-data';

export type ModerationReportStatus = 'pending' | 'reviewed' | 'rejected';
export type ModerationReportType = 'post' | 'comment' | 'profile';
export type ModerationReportUserStatus = 'active' | 'warned' | 'suspended';

export type ModerationContentPost = {
  kind: 'post';
  authorDisplayName: string;
  authorInitials: string;
  postText: string;
  mediaSlotCount: number;
  likes: number;
  comments: number;
};

export type ModerationContentComment = {
  kind: 'comment';
  authorDisplayName: string;
  authorInitials: string;
  commentText: string;
  contextPostExcerpt: string;
};

export type ModerationContentProfile = {
  kind: 'profile';
  displayName: string;
  initials: string;
  bioSnippet: string;
  accountPreview: string;
};

export type ModerationReportedContent =
  | ModerationContentPost
  | ModerationContentComment
  | ModerationContentProfile;

export type ModerationReportDetail = {
  report: {
    reportId: string;
    type: ModerationReportType;
    status: ModerationReportStatus;
    reason: string;
    description: string;
    timestamp: string;
    reportCount: number;
    reportedByName: string;
  };
  content: ModerationReportedContent;
  user: {
    userId: string;
    username: string;
    avatarUrl: string | null;
    initials: string;
    status: ModerationReportUserStatus;
    violations: number;
    joinedAt: string;
    lastActive: string;
    deviceIp?: string;
  };
};

const REASONS: Record<DashboardReportCategory, string[]> = {
  violation: ['Harassment', 'Threats', 'Hate speech', 'Bullying'],
  false_information: ['Fake content', 'Misinformation', 'Impersonation'],
  other: ['Spam', 'Off-topic', 'Policy violation'],
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
}

function pick<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length]!;
}

export function buildModerationReportDetail(
  row: DashboardReport,
): ModerationReportDetail {
  const n = Number.parseInt(row.id.replace(/\D/g, ''), 10) || 0;
  const seq = String(n || 1).padStart(5, '0');
  const reportId = `#RP-${seq}`;

  const types: ModerationReportType[] = ['post', 'comment', 'profile'];
  const type = pick(types, n);

  const statuses: ModerationReportStatus[] = [
    'pending',
    'pending',
    'pending',
    'reviewed',
    'rejected',
  ];
  const status = pick(statuses, n);

  const userStatuses: ModerationReportUserStatus[] = [
    'active',
    'active',
    'warned',
    'suspended',
  ];
  const userStatus = pick(userStatuses, n + 1);

  const reason = pick(REASONS[row.category], n + 2);
  const description = `${row.cause}\n\nReporter note: Please review this case carefully. Submitted via in-app report form. Reference: ${row.id}.`;

  const joined = new Date(2024, (n % 12) + 0, 8 + (n % 20)).toISOString();
  const lastActive = new Date(
    2026,
    3,
    25 + (n % 4),
    10 + (n % 8),
    0,
  ).toISOString();

  const reportCount = n % 7 === 0 ? 2 + (n % 4) : 1;

  let content: ModerationReportedContent;

  if (type === 'post') {
    content = {
      kind: 'post',
      authorDisplayName: row.reportedUserName,
      authorInitials: initialsFromName(row.reportedUserName),
      postText:
        'Sometimes the hardest part is saying it out loud. This post was flagged for community review. Content may be sensitive or disputed.',
      mediaSlotCount: n % 4 === 0 ? 3 : n % 3 === 0 ? 1 : 0,
      likes: 120 + (n % 900),
      comments: 12 + (n % 80),
    };
  } else if (type === 'comment') {
    content = {
      kind: 'comment',
      authorDisplayName: row.reportedUserName,
      authorInitials: initialsFromName(row.reportedUserName),
      commentText:
        'This comment was reported. It may contain strong language or references to other users.',
      contextPostExcerpt:
        'Original post: “Healing is not linear — some days I feel fine, then one memory breaks me again.”',
    };
  } else {
    content = {
      kind: 'profile',
      displayName: row.reportedUserName,
      initials: initialsFromName(row.reportedUserName),
      bioSnippet:
        'Public bio · Sharing thoughts anonymously. Not affiliated with any organization.',
      accountPreview: `Posts: ${12 + (n % 40)} · Followers: ${200 + (n % 5000)} · Joined 2024`,
    };
  }

  return {
    report: {
      reportId,
      type,
      status,
      reason,
      description,
      timestamp: row.reportedAtIso,
      reportCount,
      reportedByName: row.reportedByName,
    },
    content,
    user: {
      userId: row.reportedUserId,
      username: row.reportedUserName,
      avatarUrl: null,
      initials: initialsFromName(row.reportedUserName),
      status: userStatus,
      violations: n % 9,
      joinedAt: joined,
      lastActive,
      deviceIp: `10.${(n * 3) % 200}.${(n * 7) % 255}.${(n * 11) % 255}`,
    },
  };
}
