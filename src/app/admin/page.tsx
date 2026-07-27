"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const SECTIONS = [
  { key: "beauty", label: "Beauty" },
  { key: "bharathanatyam", label: "Bharathanatyam" },
  { key: "tailoring", label: "Tailoring" },
];

export default function AdminDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-black underline"
          >
            Log out
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SECTIONS.map((s) => (
            <Link
              key={s.key}
              href={`/admin/${s.key}`}
              className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition border border-gray-100"
            >
              <h2 className="text-lg font-medium">{s.label}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage categories & items
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
