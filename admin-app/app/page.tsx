"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { getFirestoreClient } from "@/lib/firebase";
import { useAuth } from "@/components/auth-context";
import { usePushRegistration } from "@/lib/use-push-registration";
import { PORTFOLIO_API, type OrderRecord } from "@/lib/types";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return new Date(iso).toLocaleDateString();
}

function money(n: string): string {
  const parsed = Number(n.replace(/[^0-9.]/g, ""));
  return `$${parsed.toFixed(2)}`;
}

export default function DashboardPage() {
  const { user, isAdmin, checking, logout } = useAuth();
  usePushRegistration();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notif, setNotif] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (!checking && !isAdmin) router.replace("/login");
  }, [checking, isAdmin, router]);

  useEffect(() => {
    const q = query(
      collection(getFirestoreClient(), "orders"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setOrders(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<OrderRecord, "id">),
          }))
        );
      },
      (err) => setNotif({ kind: "err", text: `Orders failed to load: ${err.message}` })
    );
    return unsub;
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const selected = orders.find((o) => o.id === selectedId) ?? null;

  const confirmOrder = async (order: OrderRecord) => {
    setConfirmingId(order.id);
    setNotif(null);
    try {
      await updateDoc(doc(getFirestoreClient(), "orders", order.id), {
        status: "confirmed",
      });
      const idToken = await user?.getIdToken();
      if (idToken) {
        try {
          const res = await fetch(`${PORTFOLIO_API}/api/orders/${order.id}/notify`, {
            method: "POST",
            headers: { Authorization: `Bearer ${idToken}` },
          });
          if (!res.ok) {
            let detail = `HTTP ${res.status}`;
            try {
              const body = await res.json();
              if (body?.error) detail = body.error;
            } catch {
              /* non-JSON error body */
            }
            setNotif({ kind: "err", text: `Confirmed, but email failed: ${detail}` });
            return;
          }
        } catch {
          setNotif({ kind: "err", text: "Order confirmed but the confirmation email could not be dispatched." });
          return;
        }
      }
      setNotif({ kind: "ok", text: `${order.orderNumber} confirmed — email dispatched.` });
    } catch (err) {
      setNotif({ kind: "err", text: err instanceof Error ? err.message : "Confirmation failed" });
    } finally {
      setConfirmingId(null);
    }
  };

  const deleteOrder = async (order: OrderRecord) => {
    if (!window.confirm(`Delete order ${order.orderNumber}? This cannot be undone.`)) return;
    setDeletingId(order.id);
    setNotif(null);
    try {
      await deleteDoc(doc(getFirestoreClient(), "orders", order.id));
      setNotif({ kind: "ok", text: `${order.orderNumber} deleted.` });
      if (selectedId === order.id) setSelectedId(null);
    } catch (err) {
      setNotif({ kind: "err", text: err instanceof Error ? err.message : "Delete failed" });
    } finally {
      setDeletingId(null);
    }
  };

  if (checking) {
    return <main className="flex min-h-svh items-center justify-center bg-neutral-950 text-neutral-400">Loading…</main>;
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-svh bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-lg">Bookstore Orders</h1>
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            {user?.email}
          </p>
        </div>
        <button
          onClick={logout}
          className="border border-neutral-700 rounded px-3 py-1.5 text-sm text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </header>

      {notif && (
        <div
          className={`px-6 py-2 text-sm ${
            notif.kind === "ok" ? "bg-emerald-950 text-emerald-300" : "bg-red-950 text-red-300"
          }`}
        >
          {notif.text}
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: orders.length },
            { label: "Pending", value: pendingCount },
            { label: "Confirmed", value: orders.length - pendingCount },
          ].map((s) => (
            <div key={s.label} className="rounded border border-neutral-800 bg-neutral-900 p-4">
              <p className="text-3xl font-serif">{s.value}</p>
              <p className="text-xs uppercase tracking-widest text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {(["all", "pending", "confirmed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm capitalize cursor-pointer ${
                filter === f
                  ? "bg-neutral-100 text-neutral-950"
                  : "border border-neutral-700 text-neutral-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders table */}
        {filtered.length === 0 ? (
          <p className="text-neutral-500 text-sm py-10 text-center">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto rounded border border-neutral-800">
            <table className="w-full text-sm">
              <thead className="bg-neutral-900 text-neutral-500 text-left uppercase tracking-widest text-xs">
                <tr>
                  <th className="px-4 py-2">Order</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Buyer</th>
                  <th className="px-4 py-2">Format</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelectedId(o.id === selectedId ? null : o.id)}
                    className={`border-t border-neutral-800 cursor-pointer hover:bg-neutral-900 ${
                      o.status === "pending" ? "bg-amber-950/20" : ""
                    }`}
                  >
                    <td className="px-4 py-2 font-mono">{o.orderNumber}</td>
                    <td className="px-4 py-2 text-neutral-400">{timeAgo(o.createdAt)}</td>
                    <td className="px-4 py-2">{o.shipping.name}</td>
                    <td className="px-4 py-2 uppercase text-xs">{o.format}</td>
                    <td className="px-4 py-2">{money(o.total)}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          o.status === "pending"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Order detail */}
        {selected && (
          <div className="mt-8 rounded border border-neutral-800 bg-neutral-900 p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <h2 className="font-serif text-xl">
                  {selected.orderNumber}{" "}
                  <span className="text-neutral-500 text-sm font-normal">
                    {selected.format} · {selected.status}
                  </span>
                </h2>
                <p className="text-sm text-neutral-400">
                  {selected.createdAt} · {money(selected.total)}
                </p>
                <p className="text-sm text-neutral-400">
                  {selected.shipping.name} · {selected.shipping.phone} · {selected.shipping.email}
                </p>
                {selected.format === "print" && (
                  <p className="text-sm text-neutral-400">
                    {[selected.shipping.address, selected.shipping.municipality, selected.shipping.city, selected.shipping.ward, selected.shipping.province, selected.shipping.postal]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>
              <div className="text-right space-y-2">
                <p className="text-sm">
                  <span className="text-neutral-500">eSewa txn:</span>{" "}
                  <span className="font-mono">{selected.payment.txnId}</span>
                </p>
                <p className="text-sm">
                  <span className="text-neutral-500">Payer:</span>{" "}
                  {selected.payment.payerName} ({selected.payment.payerPhone})
                </p>
                {selected.status === "pending" && (
                  <button
                    onClick={() => confirmOrder(selected)}
                    disabled={confirmingId === selected.id}
                    className="inline-block rounded bg-emerald-600 px-5 py-2 text-sm font-medium hover:bg-emerald-500 disabled:opacity-50 cursor-pointer"
                  >
                    {confirmingId === selected.id ? "Confirming…" : "Confirm order"}
                  </button>
                )}
                <button
                  onClick={() => deleteOrder(selected)}
                  disabled={deletingId === selected.id}
                  className="inline-block rounded border border-red-800 px-5 py-2 text-sm text-red-400 hover:bg-red-950 hover:text-red-300 disabled:opacity-50 cursor-pointer"
                >
                  {deletingId === selected.id ? "Deleting…" : "Delete order"}
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Items</p>
                <ul className="space-y-1 text-sm">
                  {selected.items.map((it, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{it.title} ×{it.quantity}</span>
                      <span className="font-mono">{money(it.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  Payment screenshot
                </p>
                {selected.screenshotUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selected.screenshotUrl}
                    alt="Payment proof"
                    className="w-full rounded border border-neutral-800 aspect-video object-contain bg-neutral-950"
                  />
                ) : (
                  <p className="text-sm text-neutral-600">No screenshot uploaded.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}