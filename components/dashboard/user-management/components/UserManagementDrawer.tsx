"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  X,
  Mail,
  Phone,
  Copy,
  MapPin,
  Activity,
  Heart,
  Smartphone,
  Shield,
  MoreHorizontal,
  UserCheck,
  KeyRound,
  OctagonPause,
  Trash2,
  LayoutDashboard,
  BadgeCheck,
  CircleDot,
} from "lucide-react";
import logoPng from "@/assets/images/Logo.png";
import { ROLE_CLASS, STATUS_CLASS } from "@/components/dashboard/user-management/constants/user-management.constants";
import type { UserRecord, UserRole, UserStatus } from "@/components/dashboard/user-management/types/user-management.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select";
import { cn } from "@/lib/utils";

// ─── Theme tokens (from dashboardThemeDark) ────────────────────────────────
const t = {
  bgStart: "#0B0B15",
  bgEnd: "#1A1333",
  sidebarBg: "#0E0C1A",
  cardBg: "#12101F",
  cardElevatedBg: "#171526",
  textPrimary: "#FFFFFF",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",
  borderSubtle: "rgba(255,255,255,0.10)",
  borderSoft: "rgba(255,255,255,0.20)",
  overlaySoft: "rgba(255,255,255,0.05)",
  primary: "#2F6BFF",
  secondary: "#7A3BFF",
  accentEmerald: "#34D399",
  accentOrange: "#FB923C",
  accentRed: "#F87171",
  shadowCard: "0 14px 30px rgba(0, 0, 0, 0.35)",
};

// ─── Types ──────────────────────────────────────────────────────────────────
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: UserStatus;
  role: UserRole;
  lastActive: string;
  totalSessions: number;
  joined: string;
  userSince: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface UserManagementDrawerProps {
  activeUser: UserRecord | null;
  open: boolean;
  onOpenChange: (next: boolean) => void;
  onUpdateStatus?: (id: string, status: UserRecord["status"]) => void;
  onImpersonate?: (id: string) => void;
  onResetPassword?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// ─── Default mock user ───────────────────────────────────────────────────────
const defaultUser: User = {
  id: "USR-001",
  name: "Robert Fox",
  email: "robert.fox@example.com",
  phone: "+1 202 555 0148",
  avatar: undefined,
  status: "Active",
  role: "Admin",
  lastActive: "2 minutes ago",
  totalSessions: 128,
  joined: "15 Jan 2024",
  userSince: "15 Jan 2024 (128 days)",
  emailVerified: true,
  phoneVerified: true,
};

// ─── Tab definition ──────────────────────────────────────────────────────────
const tabs = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "location", label: "Location", icon: MapPin },
  { key: "activity", label: "Activity", icon: Activity },
  { key: "interests", label: "Interests", icon: Heart },
  { key: "devices", label: "Devices", icon: Smartphone },
  { key: "security", label: "Security", icon: Shield },
  { key: "more", label: "More", icon: MoreHorizontal },
];

type UserIpEvent = "Login" | "Posting" | "Commenting" | "Interacting" | "Sharing";
type UserActivityType = "like" | "comment" | "share" | "account_update" | "settings_update";

interface UserIpLog {
  id: string;
  ip: string;
  event: UserIpEvent;
  at: string;
  geo: {
    city: string;
    country: string;
    lat: number;
    lon: number;
  };
}

interface UserActivityLog {
  id: string;
  at: string;
  actorName: string;
  type: UserActivityType;
  targetType: "post" | "account" | "settings";
  postId?: string;
  postTitle?: string;
  commentId?: string;
  commentPreview?: string;
  fullContent: string;
}

const GEO_POOL = [
  { city: "New York", country: "USA", lat: 40.7128, lon: -74.006 },
  { city: "London", country: "UK", lat: 51.5072, lon: -0.1276 },
  { city: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832 },
  { city: "Berlin", country: "Germany", lat: 52.52, lon: 13.405 },
  { city: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
  { city: "San Francisco", country: "USA", lat: 37.7749, lon: -122.4194 },
];

const EVENT_POOL: UserIpEvent[] = ["Login", "Posting", "Commenting", "Interacting", "Sharing"];

const ACTIVITY_POOL: Array<Omit<UserActivityLog, "id" | "at" | "actorName">> = [
  {
    type: "like",
    targetType: "post",
    postId: "POST-1001",
    postTitle: "How we reduced moderation false-positives by 37%",
    fullContent: "User liked this post after opening analytics insights from dashboard recommendations.",
  },
  {
    type: "comment",
    targetType: "post",
    postId: "POST-1024",
    postTitle: "Community safety policy updates",
    commentId: "CMT-8491",
    commentPreview: "This update makes escalation flow clearer.",
    fullContent:
      "Comment detail: This update makes escalation flow clearer. We should pin this in onboarding docs for moderators.",
  },
  {
    type: "share",
    targetType: "post",
    postId: "POST-0991",
    postTitle: "Creator spotlight: monthly highlights",
    fullContent: "User shared this post to Telegram integration channel via one-click share.",
  },
  {
    type: "account_update",
    targetType: "account",
    fullContent: "User updated profile name and notification preferences from account settings.",
  },
  {
    type: "settings_update",
    targetType: "settings",
    fullContent: "User changed privacy settings: disabled public activity and enabled 2FA reminders.",
  },
];

const hashFromText = (value: string) =>
  value.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 100000, 7);

const makeIp = (seed: number, offset: number) => {
  const a = 23 + ((seed + offset * 11) % 200);
  const b = 7 + ((seed + offset * 13) % 240);
  const c = 19 + ((seed + offset * 17) % 220);
  const d = 5 + ((seed + offset * 19) % 200);
  return `${a}.${b}.${c}.${d}`;
};

const buildUserIpLogs = (user: User): UserIpLog[] => {
  const seed = hashFromText(user.id + user.email);
  return Array.from({ length: 8 }).map((_, idx) => {
    const geo = GEO_POOL[(seed + idx) % GEO_POOL.length];
    const event = EVENT_POOL[(seed + idx * 3) % EVENT_POOL.length];
    return {
      id: `${user.id}-ip-${idx + 1}`,
      ip: makeIp(seed, idx + 1),
      event,
      at: `${idx + 1} ${idx === 0 ? "hour" : "hours"} ago`,
      geo,
    };
  });
};

const buildUserActivities = (user: User): UserActivityLog[] => {
  const seed = hashFromText(user.id + user.name);
  return Array.from({ length: 10 }).map((_, idx) => {
    const base = ACTIVITY_POOL[(seed + idx) % ACTIVITY_POOL.length];
    return {
      ...base,
      id: `${user.id}-act-${idx + 1}`,
      at: `${idx + 1}h ago`,
      actorName: user.name,
    };
  });
};

// ─── Small helpers ───────────────────────────────────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      title="Copy"
      style={{ color: copied ? t.accentEmerald : t.textMuted }}
      className="ml-1.5 transition-colors hover:opacity-80 focus:outline-none"
    >
      <Copy size={13} />
    </button>
  );
}

function StatusSelect({
  userId,
  status,
  onUpdateStatus,
}: {
  userId: string;
  status: UserStatus;
  onUpdateStatus?: (id: string, status: UserStatus) => void;
}) {
  return (
    <Select
      value={status}
      onValueChange={(value) => onUpdateStatus?.(userId, value as UserStatus)}
    >
      <SelectTrigger className={cn("h-8 w-[130px] border", STATUS_CLASS[status])}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Active">Active</SelectItem>
        <SelectItem value="Suspended">Suspended</SelectItem>
        <SelectItem value="Pending">Pending</SelectItem>
      </SelectContent>
    </Select>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold",
        ROLE_CLASS[role],
      )}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold",
        STATUS_CLASS[status],
      )}
    >
      {status}
    </span>
  );
}

function ActiveBadge({ label }: { label: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
      <span style={{ color: t.textPrimary }}>{label}</span>
      <CircleDot size={13} color={t.accentEmerald} fill={t.accentEmerald} />
    </span>
  );
}

function InfoRow({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: `1px solid ${t.borderSubtle}`,
      }}
    >
      {/* Left cell */}
      <div
        style={{
          padding: "14px 16px",
          borderRight: `1px solid ${t.borderSubtle}`,
        }}
      >
        {left}
      </div>
      {/* Right cell */}
      <div style={{ padding: "14px 16px" }}>{right}</div>
    </div>
  );
}

function InfoCell({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      <span style={{ color: t.textMuted, fontSize: 13 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: t.textPrimary }}>{value}</span>
    </div>
  );
}

// ─── Main drawer ─────────────────────────────────────────────────────────────
const mapRecordToUser = (record: UserRecord): User => {
  const days = (() => {
    const parsed = Date.parse(record.joinedDate);
    if (Number.isNaN(parsed)) return null;
    const deltaMs = Date.now() - parsed;
    return Math.max(0, Math.floor(deltaMs / (1000 * 60 * 60 * 24)));
  })();

  return {
    id: record.id,
    name: record.name,
    email: record.email,
    phone: record.phone,
    avatar: undefined,
    status: record.status,
    role: record.role,
    lastActive: record.lastActive,
    totalSessions: record.sessions,
    joined: record.joinedDate,
    userSince: days === null ? record.joinedDate : `${record.joinedDate} (${days} days)`,
    emailVerified: record.emailVerified,
    phoneVerified: record.phoneVerified,
  };
};

const NOTE_KEY_PREFIX = "cb:um:userNote:";

export const UserManagementDrawer = ({
  activeUser,
  open,
  onOpenChange,
  onUpdateStatus,
  onImpersonate,
  onResetPassword,
  onSuspend,
  onDelete,
}: UserManagementDrawerProps) => {
  const user = activeUser ? mapRecordToUser(activeUser) : defaultUser;
  const [activeTab, setActiveTab] = useState("overview");
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [adminActionLog, setAdminActionLog] = useState<string[]>([]);
  const [controlsState, setControlsState] = useState({
    forceMfa: false,
    restrictPosting: false,
    readOnlyMode: false,
  });

  const noteStorageKey = `${NOTE_KEY_PREFIX}${user.id}`;
  const ipLogs = React.useMemo(() => buildUserIpLogs(user), [user]);
  const activities = React.useMemo(() => buildUserActivities(user), [user]);
  const selectedActivity = React.useMemo(
    () => activities.find((entry) => entry.id === selectedActivityId) ?? null,
    [activities, selectedActivityId],
  );
  const primaryIp = ipLogs[0]?.ip ?? "N/A";

  const logAdminAction = (label: string) => {
    setAdminActionLog((prev) => [`${new Date().toLocaleTimeString()} • ${label}`, ...prev].slice(0, 10));
  };

  // Load per-user note when drawer opens / user changes
  React.useEffect(() => {
    if (!open) return;
    try {
      const saved = localStorage.getItem(noteStorageKey);
      setNote(saved ?? "");
    } catch (error) {
      void error;
      setNote("");
    }
    setNoteSaved(false);
    setActiveTab("overview");
    setSelectedActivityId(null);
    setAdminActionLog([]);
    setControlsState({
      forceMfa: false,
      restrictPosting: false,
      readOnlyMode: false,
    });
  }, [noteStorageKey, open]);

  const onClose = () => onOpenChange(false);

  const handleSaveNote = () => {
    if (!note.trim()) return;
    try {
      localStorage.setItem(noteStorageKey, note.trim());
    } catch (error) {
      void error;
    }
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  if (!open || activeUser === null) return null;

  return (
    /* Backdrop */
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Drawer panel */}
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          height: "100dvh",
          background: `linear-gradient(160deg, ${t.bgStart} 0%, ${t.bgEnd} 100%)`,
          borderLeft: `1px solid ${t.borderSubtle}`,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
          fontFamily: "'DM Sans', 'Geist', system-ui, sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div
          style={{
            padding: "20px 24px 0",
            background: t.sidebarBg,
            borderBottom: `1px solid ${t.borderSubtle}`,
            flexShrink: 0,
          }}
        >
          {/* Top row: avatar + info + status + close */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <Image
                src={user.avatar ?? logoPng}
                alt={user.name}
                width={64}
                height={64}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: `2px solid ${t.borderSoft}`,
                  objectFit: "cover",
                }}
              />
              {/* Online dot */}
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: t.accentEmerald,
                  border: `2px solid ${t.sidebarBg}`,
                }}
              />
            </div>

            {/* Name / ID / contact */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: t.textPrimary,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {user.name}
                </span>
                <BadgeCheck size={18} color={t.primary} fill={t.primary} style={{ flexShrink: 0 }} />
              </div>
              <div style={{ color: t.textMuted, fontSize: 12, marginTop: 2 }}>
                ID: {user.id} • IP: {primaryIp}
              </div>
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Mail size={12} color={t.textMuted} />
                  <span style={{ fontSize: 12, color: t.textSecondary }}>{user.email}</span>
                  <CopyBtn text={user.email} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Phone size={12} color={t.textMuted} />
                  <span style={{ fontSize: 12, color: t.textSecondary }}>{user.phone}</span>
                  <CopyBtn text={user.phone} />
                </div>
              </div>
            </div>

            {/* Status + close */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 10,
                flexShrink: 0,
              }}
            >
              <button
                onClick={onClose}
                style={{
                  background: t.overlaySoft,
                  border: `1px solid ${t.borderSubtle}`,
                  borderRadius: 8,
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: t.textMuted,
                }}
              >
                <X size={15} />
              </button>
              <StatusSelect userId={user.id} status={user.status} onUpdateStatus={onUpdateStatus} />
            </div>
          </div>

          {/* Tab strip */}
          <div
            style={{
              display: "flex",
              gap: 0,
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {tabs.map(({ key, label, icon: Icon }) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 14px",
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    color: active ? t.primary : t.textMuted,
                    background: "transparent",
                    border: "none",
                    borderBottom: `2px solid ${active ? t.primary : "transparent"}`,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "color 0.15s, border-color 0.15s",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={14} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

          {activeTab === "overview" && (
            <>
              {/* Overview card */}
              <section
                style={{
                  background: t.cardBg,
                  borderRadius: 14,
                  border: `1px solid ${t.borderSubtle}`,
                  overflow: "hidden",
                  boxShadow: t.shadowCard,
                }}
              >
                <div style={{ padding: "14px 16px", borderBottom: `1px solid ${t.borderSubtle}` }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: t.textPrimary }}>
                    Overview
                  </span>
                </div>

                {/* Row 1 */}
                <InfoRow
                  left={<InfoCell label="Role" value={<RoleBadge role={user.role} />} />}
                  right={
                    <InfoCell
                      label="Last Active"
                      value={<ActiveBadge label={user.lastActive} />}
                    />
                  }
                />
                {/* Row 2 */}
                <InfoRow
                  left={
                    <InfoCell
                      label="Status"
                      value={<StatusBadge status={user.status} />}
                    />
                  }
                  right={<InfoCell label="Total Sessions" value={user.totalSessions} />}
                />
                {/* Row 3 */}
                <InfoRow
                  left={<InfoCell label="Joined" value={user.joined} />}
                  right={
                    <InfoCell
                      label="Email Verified"
                      value={
                        <span style={{ color: t.accentEmerald, fontWeight: 600 }}>
                          {user.emailVerified ? "Yes" : "No"}
                        </span>
                      }
                    />
                  }
                />
                {/* Row 4 — no bottom border */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ padding: "14px 16px", borderRight: `1px solid ${t.borderSubtle}` }}>
                    <InfoCell label="User Since" value={user.userSince} />
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <InfoCell
                      label="Phone Verified"
                      value={
                        <span style={{ color: t.accentEmerald, fontWeight: 600 }}>
                          {user.phoneVerified ? "Yes" : "No"}
                        </span>
                      }
                    />
                  </div>
                </div>
              </section>

              {/* Quick Actions */}
              <section
                style={{
                  background: t.cardBg,
                  borderRadius: 14,
                  border: `1px solid ${t.borderSubtle}`,
                  overflow: "hidden",
                  boxShadow: t.shadowCard,
                }}
              >
                <div style={{ padding: "14px 16px", borderBottom: `1px solid ${t.borderSubtle}` }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: t.textPrimary }}>
                    Quick Actions
                  </span>
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  {/* Row 1 */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <ActionBtn
                      icon={<UserCheck size={14} />}
                      label="Impersonate"
                      onClick={() => onImpersonate?.(activeUser.id)}
                    />
                    <ActionBtn
                      icon={<KeyRound size={14} />}
                      label="Reset Password"
                      onClick={() => onResetPassword?.(activeUser.id)}
                    />
                  </div>
                  {/* Row 2 */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <ActionBtn
                      icon={<OctagonPause size={14} />}
                      label="Suspend User"
                      variant="warning"
                      onClick={() => {
                        onUpdateStatus?.(activeUser.id, "Suspended");
                        onSuspend?.(activeUser.id);
                      }}
                    />
                    <ActionBtn
                      icon={<Trash2 size={14} />}
                      label="Delete User"
                      variant="danger"
                      onClick={() => onDelete?.(activeUser.id)}
                    />
                  </div>
                </div>
              </section>

              {/* Notes */}
              <section
                style={{
                  background: t.cardBg,
                  borderRadius: 14,
                  border: `1px solid ${t.borderSubtle}`,
                  overflow: "hidden",
                  boxShadow: t.shadowCard,
                }}
              >
                <div style={{ padding: "14px 16px", borderBottom: `1px solid ${t.borderSubtle}` }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: t.textPrimary }}>
                    Notes
                  </span>
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note about this user..."
                    rows={4}
                    style={{
                      width: "100%",
                      background: t.cardElevatedBg,
                      border: `1px solid ${t.borderSubtle}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                      fontSize: 13,
                      color: t.textPrimary,
                      resize: "vertical",
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = t.primary)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = t.borderSubtle)}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={handleSaveNote}
                      style={{
                        background: noteSaved
                          ? "rgba(52,211,153,0.2)"
                          : t.primary,
                        color: noteSaved ? t.accentEmerald : "#fff",
                        border: noteSaved
                          ? `1px solid rgba(52,211,153,0.4)`
                          : "none",
                        borderRadius: 8,
                        padding: "9px 20px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background 0.2s, color 0.2s",
                      }}
                    >
                      {noteSaved ? "Saved ✓" : "Save Note"}
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== "overview" && (
            <>
              {activeTab === "location" && (
                <section
                  style={{
                    background: t.cardBg,
                    borderRadius: 14,
                    border: `1px solid ${t.borderSubtle}`,
                    overflow: "hidden",
                    boxShadow: t.shadowCard,
                  }}
                >
                  <div style={{ padding: "14px 16px", borderBottom: `1px solid ${t.borderSubtle}` }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: t.textPrimary }}>
                      IP & Geo Location History
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {ipLogs.map((entry) => (
                      <div
                        key={entry.id}
                        style={{
                          padding: "12px 16px",
                          borderBottom: `1px solid ${t.borderSubtle}`,
                          display: "grid",
                          gridTemplateColumns: "1.2fr 1fr 1fr",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ color: t.textPrimary, fontSize: 13, fontWeight: 600 }}>{entry.ip}</span>
                          <span style={{ color: t.textMuted, fontSize: 12 }}>{entry.event} • {entry.at}</span>
                        </div>
                        <div style={{ color: t.textSecondary, fontSize: 12 }}>
                          {entry.geo.city}, {entry.geo.country}
                        </div>
                        <div style={{ color: t.textMuted, fontSize: 12, textAlign: "right" }}>
                          {entry.geo.lat.toFixed(4)}, {entry.geo.lon.toFixed(4)}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "activity" && (
                <>
                  <section
                    style={{
                      background: t.cardBg,
                      borderRadius: 14,
                      border: `1px solid ${t.borderSubtle}`,
                      overflow: "hidden",
                      boxShadow: t.shadowCard,
                    }}
                  >
                    <div style={{ padding: "14px 16px", borderBottom: `1px solid ${t.borderSubtle}` }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: t.textPrimary }}>
                        User Activity Feed
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {activities.map((entry) => (
                        <button
                          key={entry.id}
                          onClick={() => setSelectedActivityId(entry.id)}
                          style={{
                            all: "unset",
                            cursor: "pointer",
                            padding: "12px 16px",
                            borderBottom: `1px solid ${t.borderSubtle}`,
                            background: selectedActivityId === entry.id ? t.overlaySoft : "transparent",
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                          }}
                        >
                          <span style={{ color: t.textPrimary, fontSize: 13, fontWeight: 600 }}>
                            {entry.targetType === "post"
                              ? `${entry.actorName} ${entry.type}d post: ${entry.postTitle ?? "Untitled"}`
                              : `${entry.actorName} ${entry.type.replace("_", " ")}`
                            }
                          </span>
                          <span style={{ color: t.textSecondary, fontSize: 12 }}>
                            {entry.at}
                            {entry.commentPreview ? ` • ${entry.commentPreview}` : ""}
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>

                  {selectedActivity && (
                    <section
                      style={{
                        background: t.cardBg,
                        borderRadius: 14,
                        border: `1px solid ${t.borderSubtle}`,
                        overflow: "hidden",
                        boxShadow: t.shadowCard,
                      }}
                    >
                      <div style={{ padding: "14px 16px", borderBottom: `1px solid ${t.borderSubtle}` }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: t.textPrimary }}>
                          Activity Details
                        </span>
                      </div>
                      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ color: t.textSecondary, fontSize: 12 }}>
                          {selectedActivity.at} • {selectedActivity.actorName}
                        </div>
                        {selectedActivity.postTitle ? (
                          <div style={{ color: t.textPrimary, fontSize: 14, fontWeight: 600 }}>
                            {selectedActivity.postTitle}
                          </div>
                        ) : null}
                        <div style={{ color: t.textSecondary, fontSize: 13, lineHeight: 1.55 }}>
                          {selectedActivity.fullContent}
                        </div>
                        <button
                          onClick={() =>
                            toast.message(
                              selectedActivity.commentId
                                ? `Open comment ${selectedActivity.commentId}`
                                : `Open post ${selectedActivity.postId ?? "detail"}`,
                            )
                          }
                          style={{
                            alignSelf: "flex-start",
                            background: t.overlaySoft,
                            border: `1px solid ${t.borderSubtle}`,
                            color: t.textPrimary,
                            borderRadius: 8,
                            padding: "8px 12px",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Open Full {selectedActivity.commentId ? "Comment" : "Post"}
                        </button>
                      </div>
                    </section>
                  )}

                  <section
                    style={{
                      background: t.cardBg,
                      borderRadius: 14,
                      border: `1px solid ${t.borderSubtle}`,
                      overflow: "hidden",
                      boxShadow: t.shadowCard,
                    }}
                  >
                    <div style={{ padding: "14px 16px", borderBottom: `1px solid ${t.borderSubtle}` }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: t.textPrimary }}>
                        Admin Activity Controls
                      </span>
                    </div>
                    <div style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <ActionBtn
                        icon={<Shield size={14} />}
                        label={controlsState.forceMfa ? "Disable Force MFA" : "Force MFA"}
                        onClick={() =>
                          setControlsState((prev) => {
                            const next = { ...prev, forceMfa: !prev.forceMfa };
                            logAdminAction(next.forceMfa ? "Force MFA enabled" : "Force MFA disabled");
                            return next;
                          })
                        }
                      />
                      <ActionBtn
                        icon={<OctagonPause size={14} />}
                        label={controlsState.restrictPosting ? "Allow Posting" : "Restrict Posting"}
                        variant="warning"
                        onClick={() =>
                          setControlsState((prev) => {
                            const next = { ...prev, restrictPosting: !prev.restrictPosting };
                            logAdminAction(next.restrictPosting ? "Posting restricted" : "Posting restored");
                            return next;
                          })
                        }
                      />
                      <ActionBtn
                        icon={<KeyRound size={14} />}
                        label={controlsState.readOnlyMode ? "Disable Read-Only" : "Read-Only Mode"}
                        onClick={() =>
                          setControlsState((prev) => {
                            const next = { ...prev, readOnlyMode: !prev.readOnlyMode };
                            logAdminAction(next.readOnlyMode ? "Read-only mode enabled" : "Read-only mode disabled");
                            return next;
                          })
                        }
                      />
                      <ActionBtn
                        icon={<Trash2 size={14} />}
                        label="Revoke Sessions"
                        variant="danger"
                        onClick={() => logAdminAction("All active sessions revoked")}
                      />
                    </div>
                    <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ color: t.textMuted, fontSize: 12, fontWeight: 600 }}>Recent Admin Actions</span>
                      {adminActionLog.length === 0 ? (
                        <span style={{ color: t.textMuted, fontSize: 12 }}>No actions yet.</span>
                      ) : (
                        adminActionLog.map((line) => (
                          <span key={line} style={{ color: t.textSecondary, fontSize: 12 }}>
                            {line}
                          </span>
                        ))
                      )}
                    </div>
                  </section>
                </>
              )}

              {activeTab !== "location" && activeTab !== "activity" && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: t.textMuted,
                    fontSize: 14,
                    gap: 8,
                    background: t.cardBg,
                    borderRadius: 14,
                    border: `1px solid ${t.borderSubtle}`,
                    padding: 40,
                    minHeight: 200,
                  }}
                >
                  <span style={{ fontSize: 32 }}>
                    {tabs.find((t) => t.key === activeTab) && (() => {
                      const T = tabs.find((tab) => tab.key === activeTab)!.icon;
                      return <T size={36} />;
                    })()}
                  </span>
                  <span style={{ color: t.textSecondary, fontWeight: 500 }}>
                    {tabs.find((t) => t.key === activeTab)?.label} tab content
                  </span>
                  <span style={{ color: t.textMuted, fontSize: 12 }}>
                    This section is under construction
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Action button ────────────────────────────────────────────────────────────
function ActionBtn({
  icon,
  label,
  variant = "default",
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "warning" | "danger";
  onClick?: () => void;
}) {
  const styles: Record<typeof variant, { bg: string; border: string; color: string; hoverBg: string }> = {
    default: {
      bg: "rgba(255,255,255,0.04)",
      border: "rgba(255,255,255,0.10)",
      color: "#9CA3AF",
      hoverBg: "rgba(255,255,255,0.08)",
    },
    warning: {
      bg: "rgba(251,146,60,0.08)",
      border: "rgba(251,146,60,0.40)",
      color: "#FB923C",
      hoverBg: "rgba(251,146,60,0.15)",
    },
    danger: {
      bg: "rgba(248,113,113,0.10)",
      border: "rgba(248,113,113,0.45)",
      color: "#F87171",
      hoverBg: "rgba(248,113,113,0.18)",
    },
  };
  const s = styles[variant];
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        padding: "11px 0",
        background: hovered ? s.hoverBg : s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 10,
        color: s.color,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "background 0.15s",
        width: "100%",
      }}
    >
      {icon}
      {label}
    </button>
  );
}