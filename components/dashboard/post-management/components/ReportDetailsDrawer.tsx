"use client";

import * as React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  FileText,
  AlertTriangle,
  User,
  Calendar,
  Tag,
  Copy,
  LayoutDashboard,
  Shield,
  Check,
  Trash2,
  OctagonPause,
  CircleDot,
} from "lucide-react";
import { PRIORITY_CLASS, REPORT_STATUS_CLASS } from "../constants/post-management.constants";
import type { ReportRecord } from "../types/post-management.types";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select";
import type { ReportStatus } from "../types/post-management.types";

// ─── Theme tokens ─────────────────────────────────────────────────────────────
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
  accentEmerald: "#34D399",
  accentOrange: "#FB923C",
  accentRed: "#F87171",
  shadowCard: "0 14px 30px rgba(0, 0, 0, 0.35)",
};

// ─── Types ──────────────────────────────────────────────────────────────────
interface ReportDetailsDrawerProps {
  report: ReportRecord | null;
  open: boolean;
  onOpenChange: (next: boolean) => void;
  onUpdateStatus?: (id: string, status: ReportStatus) => void;
  onApprove?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onDeletePost?: (id: string) => void;
}

// ─── Tab definition ──────────────────────────────────────────────────────────
const tabs = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "activity", label: "Activity", icon: Shield },
];

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
  reportId,
  status,
  onUpdateStatus,
}: {
  reportId: string;
  status: ReportStatus;
  onUpdateStatus?: (id: string, status: ReportStatus) => void;
}) {
  return (
    <Select
      value={status}
      onValueChange={(value) => onUpdateStatus?.(reportId, value as ReportStatus)}
    >
      <SelectTrigger className={cn("h-8 w-[130px] border", REPORT_STATUS_CLASS[status])}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Reviewing">Reviewing</SelectItem>
        <SelectItem value="Resolved">Resolved</SelectItem>
        <SelectItem value="Dismissed">Dismissed</SelectItem>
      </SelectContent>
    </Select>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold",
        PRIORITY_CLASS[priority]
      )}
    >
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold",
        REPORT_STATUS_CLASS[status]
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
      <div
        style={{
          padding: "14px 16px",
          borderRight: `1px solid ${t.borderSubtle}`,
        }}
      >
        {left}
      </div>
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
  const bg = variant === "warning" ? "rgba(251,146,60,0.15)" : variant === "danger" ? "rgba(248,113,113,0.15)" : t.overlaySoft;
  const border = variant === "warning" ? "rgba(251,146,60,0.4)" : variant === "danger" ? "rgba(248,113,113,0.4)" : t.borderSubtle;
  const color = variant === "warning" ? t.accentOrange : variant === "danger" ? t.accentRed : t.textPrimary;
  
  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        color,
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "background 0.15s, border-color 0.15s",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Main drawer ─────────────────────────────────────────────────────────────
export const ReportDetailsDrawer = ({
  report,
  open,
  onOpenChange,
  onUpdateStatus,
  onApprove,
  onDismiss,
  onDeletePost,
}: ReportDetailsDrawerProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  const onClose = () => onOpenChange(false);

  const handleSaveNote = () => {
    if (!note.trim()) return;
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  if (!open || report === null) return null;

  return createPortal(
    /* Backdrop */
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
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
          {/* Top row: info + status + close */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
            {/* Icon placeholder */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: `2px solid ${t.borderSoft}`,
                  background: t.cardElevatedBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AlertTriangle size={32} color={t.accentOrange} />
              </div>
              {/* Status dot */}
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: report.status === "Resolved" ? t.accentEmerald : t.accentOrange,
                  border: `2px solid ${t.sidebarBg}`,
                }}
              />
            </div>

            {/* Report info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: t.textPrimary,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {report.id}
                </span>
              </div>
              <div style={{ color: t.textMuted, fontSize: 12, marginTop: 2 }}>
                Category: {report.category}
              </div>
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <User size={12} color={t.textMuted} />
                  <span style={{ fontSize: 12, color: t.textSecondary }}>{report.reportedBy}</span>
                  <CopyBtn text={report.reportedBy} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <FileText size={12} color={t.textMuted} />
                  <span style={{ fontSize: 12, color: t.textSecondary }}>{report.reportReason}</span>
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
              <StatusSelect reportId={report.id} status={report.status} onUpdateStatus={onUpdateStatus} />
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
                  left={<InfoCell label="Priority" value={<PriorityBadge priority={report.priority} />} />}
                  right={
                    <InfoCell
                      label="Status"
                      value={<StatusBadge status={report.status} />}
                    />
                  }
                />
                {/* Row 2 */}
                <InfoRow
                  left={<InfoCell label="Report Count" value={`${report.reportCount} reports`} />}
                  right={<InfoCell label="Created" value={report.createdAt} />}
                />
                {/* Row 3 — no bottom border */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ padding: "14px 16px", borderRight: `1px solid ${t.borderSubtle}` }}>
                    <InfoCell label="Reported By" value={report.reportedBy} />
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <InfoCell label="Category" value={report.category} />
                  </div>
                </div>
              </section>

              {/* Post Preview */}
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
                    Post Preview
                  </span>
                </div>
                <div style={{ padding: 16 }}>
                  <div
                    style={{
                      background: t.cardElevatedBg,
                      border: `1px solid ${t.borderSubtle}`,
                      borderRadius: 10,
                      padding: "14px",
                      color: t.textSecondary,
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {report.postPreview}
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
                      icon={<Check size={14} />}
                      label="Approve"
                      onClick={() => {
                        onUpdateStatus?.(report.id, "Resolved");
                        onApprove?.(report.id);
                      }}
                    />
                    <ActionBtn
                      icon={<OctagonPause size={14} />}
                      label="Dismiss"
                      variant="warning"
                      onClick={() => {
                        onUpdateStatus?.(report.id, "Dismissed");
                        onDismiss?.(report.id);
                      }}
                    />
                  </div>
                  {/* Row 2 */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                    <ActionBtn
                      icon={<Trash2 size={14} />}
                      label="Delete Post"
                      variant="danger"
                      onClick={() => onDeletePost?.(report.id)}
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
                    placeholder="Add a note about this report..."
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

          {/* Activity tab placeholder */}
          {activeTab === "activity" && (
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
              <Shield size={32} />
              <span>Activity history coming soon</span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
