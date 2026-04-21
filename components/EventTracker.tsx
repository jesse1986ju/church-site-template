"use client";

// Fires visitor events directly to Supabase from the browser.
// Runs client-side only — never blocks ISR page rendering.
// NEXT_PUBLIC_* vars are injected by Cloudflare Pages at build time.

import { useEffect, useRef } from "react";

type EventType = "page_view" | "plan_visit_click" | "scroll_50" | "sermon_play";

async function record(eventType: EventType): Promise<void> {
  const url    = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const church = process.env.NEXT_PUBLIC_CHURCH_ID;

  if (!url || !key || !church) return;

  try {
    await fetch(`${url}/rest/v1/events`, {
      method:    "POST",
      keepalive: true,
      headers: {
        "Content-Type":  "application/json",
        "apikey":        key,
        "Authorization": `Bearer ${key}`,
        "Prefer":        "return=minimal",
      },
      body: JSON.stringify({ church_id: church, event_type: eventType }),
    });
  } catch {
    // intentionally silent — tracking must never break the visitor experience
  }
}

export default function EventTracker() {
  const scroll50Fired = useRef(false);
  const sermonFired   = useRef(false);

  // ── page_view — once on mount ─────────────────────────────────────────────
  useEffect(() => {
    record("page_view");
  }, []);

  // ── scroll_50 — when #scroll-sentinel enters the viewport ─────────────────
  useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !scroll50Fired.current) {
          scroll50Fired.current = true;
          record("scroll_50");
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // ── plan_visit_click — delegated on the two Hero CTA anchors ─────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as Element).closest("a");
      if (target?.getAttribute("href") === "#first-visit") {
        record("plan_visit_click");
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ── sermon_play — first click anywhere on the sermon section ─────────────
  useEffect(() => {
    const el = document.getElementById("sermon");
    if (!el) return;

    function handleClick() {
      if (!sermonFired.current) {
        sermonFired.current = true;
        record("sermon_play");
      }
    }

    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, []);

  return null;
}
