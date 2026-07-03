"use client";

import * as React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Copy,
  LayoutDashboard,
  Shield,
  Check,
  Trash2,
  OctagonPause,
  CircleDot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select";

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
export interface DrawerTab {
  key: string;
  label: string;
  icon: any;
}

export interface DrawerAction {
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "warning" | "danger";
  onClick: () => void;
}

export interface DrawerField {
  label: string;
  value: React.ReactNode;
}

export interface DrawerSection {
  title: string;
  fields?: DrawerField[];
  content?: React.ReactNode;
  actions?: DrawerAction[];
}

export interface GenericDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  statusDotColor?: string;
  contactInfo?: Array<{ icon: React.ReactNode; text: string; copyable?: boolean }>;
  status?: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
  };
  tabs?: DrawerTab[];
  sections?: Record<string, DrawerSection>;
  notesPlaceholder?: string;
  renderAdditionalContent?: (activeTab: string) => React.ReactNode;
}

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
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-8 w-[130px] border border-[var(--db-border-subtle)] bg-[var(--db-card-elevated)] text-[var(--db-text-secondary)]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
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
export const GenericDrawer = ({
  open,
  onOpenChange,
  title,
  subtitle,
  icon,
  iconBg = t.cardElevatedBg,
  statusDotColor = t.accentEmerald,
  contactInfo,
  status,
  tabs = [{ key: "overview", label: "Overview", icon: LayoutDashboard }],
  sections = {},
  notesPlaceholder = "Add a note...",
  renderAdditionalContent,
}: GenericDrawerProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || "overview");
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  const onClose = () => onOpenChange(false);

  const handleSaveNote = () => {
    if (!note.trim()) return;
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  if (!open) return null;

  const activeSection = sections[activeTab];

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
          {/* Top row: icon + info + status + close */}
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
            {/* Icon */}
            {icon && (
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: `2px solid ${t.borderSoft}`,
                    background: iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </div>
                {/* Status dot */}
                {statusDotColor && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 2,
                      right: 2,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: statusDotColor,
                      border: `2px solid ${t.sidebarBg}`,
                    }}
                  />
                )}
              </div>
            )}

            {/* Info */}
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
                  {title}
                </span>
              </div>
              {subtitle && (
                <div style={{ color: t.textMuted, fontSize: 12, marginTop: 2 }}>
                  {subtitle}
                </div>
              )}
              {contactInfo && (
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                  {contactInfo.map((info, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {info.icon}
                      <span style={{ fontSize: 12, color: t.textSecondary }}>{info.text}</span>
                      {info.copyable && <CopyBtn text={info.text} />}
                    </div>
                  ))}
                </div>
              )}
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
              {status && (
                <StatusSelect
                  value={status.value}
                  options={status.options}
                  onChange={status.onChange}
                />
              )}
            </div>
          </div>

          {/* Tab strip */}
          {tabs.length > 0 && (
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
          )}
        </div>

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          {renderAdditionalContent?.(activeTab)}

          {activeSection && (
            <>
              {/* Fields section */}
              {activeSection.fields && activeSection.fields.length > 0 && (
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
                      {activeSection.title}
                    </span>
                  </div>

                  {activeSection.fields.map((field, idx) => {
                    const isLast = idx === activeSection.fields!.length - 1;
                    if (idx % 2 === 0 && !isLast) {
                      const nextField = activeSection.fields![idx + 1];
                      return (
                        <InfoRow
                          key={idx}
                          left={<InfoCell label={field.label} value={field.value} />}
                          right={<InfoCell label={nextField.label} value={nextField.value} />}
                        />
                      );
                    }
                    if (idx % 2 === 0 && isLast) {
                      return (
                        <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                          <div style={{ padding: "14px 16px" }}>
                            <InfoCell label={field.label} value={field.value} />
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </section>
              )}

              {/* Custom content */}
              {activeSection.content && (
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
                      {activeSection.title}
                    </span>
                  </div>
                  <div style={{ padding: 16 }}>{activeSection.content}</div>
                </section>
              )}

              {/* Actions */}
              {activeSection.actions && activeSection.actions.length > 0 && (
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
                    {activeSection.actions.map((action, idx) => (
                      <ActionBtn
                        key={idx}
                        icon={action.icon}
                        label={action.label}
                        variant={action.variant}
                        onClick={action.onClick}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

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
                placeholder={notesPlaceholder}
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
        </div>
      </div>
    </div>,
    document.body
  );
};
