"use client";

import { useEffect, useState } from "react";

export const DEFAULT_NPR_PER_USD = 460 / 3;

const CACHE_KEY = "darshan-npr-rate";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

interface CachedRate {
  rate: number;
  fetchedAt: number;
}

async function fetchLiveRate(): Promise<number> {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error(`Rate fetch failed: ${res.status}`);
  const data = await res.json();
  const rate = Number(data?.rates?.NPR);
  if (!Number.isFinite(rate) || rate <= 0) throw new Error("Invalid NPR rate");
  return rate;
}

function readCache(): CachedRate | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedRate;
    if (!Number.isFinite(parsed?.rate) || parsed.rate <= 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(rate: number) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ rate, fetchedAt: Date.now() } satisfies CachedRate)
    );
  } catch {
    /* storage unavailable — ignore */
  }
}

export async function getUsdNprRate(): Promise<number> {
  const cached = readCache();
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.rate;
  }
  try {
    const rate = await fetchLiveRate();
    writeCache(rate);
    return rate;
  } catch {
    return cached?.rate ?? DEFAULT_NPR_PER_USD;
  }
}

export function useUsdNprRate(): { rate: number; isLoading: boolean } {
  const [rate, setRate] = useState(DEFAULT_NPR_PER_USD);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getUsdNprRate().then((r) => {
      if (!mounted) return;
      setRate(r);
      setIsLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { rate, isLoading };
}