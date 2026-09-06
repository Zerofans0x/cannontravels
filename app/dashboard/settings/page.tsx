"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");
        if (data && data.user) {
          setFullName(`${data.user.firstName || ""} ${data.user.lastName || ""}`.trim());
          setEmail(data.user.email || "");
          setPhone(data.user.phone || "");
        }
      } catch (err) {
        console.error("Failed to load profile details", err);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await api.put("/profile/update", { fullName, email, phone });
      setMessage({ type: "success", text: "Profile details updated successfully." });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await api.put("/profile/password", { currentPassword, newPassword });
      setMessage({ type: "success", text: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      <div>
        <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
          Passenger Security & Account Governance
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          Account Settings
        </h2>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={() => { setActiveTab("profile"); setMessage({ type: "", text: "" }); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
            activeTab === "profile"
              ? "bg-[#DC2626] text-white shadow-md shadow-red-600/20"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Icon icon="basil:user-solid" className="w-4 h-4" />
          <span>Profile Details</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("password"); setMessage({ type: "", text: "" }); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
            activeTab === "password"
              ? "bg-[#DC2626] text-white shadow-md shadow-red-600/20"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Icon icon="lucide:lock" className="w-4 h-4" />
          <span>Change Password</span>
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-2xl text-sm flex items-center gap-2 ${
          message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-600 border border-rose-200"
        }`}>
          <Icon icon={message.type === "success" ? "lucide:check-circle" : "lucide:alert-circle"} className="w-5 h-5 flex-shrink-0" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Tab Content Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {activeTab === "profile" && (
          <form onSubmit={handleProfileSave} className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Profile Information</h3>
              <p className="text-xs text-slate-500 mt-1">
                Manage your passenger identification and contact credentials.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-mono">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#DC2626]"
                />
              </div>
{/* 
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-mono">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#DC2626]"
                />
              </div> */}
<div>
  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-mono">Email Address (Locked)</label>
  <input
    type="email"
    disabled
    value={email}
    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-500 cursor-not-allowed focus:outline-none"
  />
</div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-mono">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#DC2626]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs transition-all shadow-md shadow-red-600/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}

        {activeTab === "password" && (
          <form onSubmit={handlePasswordChange} className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Change Account Password</h3>
              <p className="text-xs text-slate-500 mt-1">
                Update your terminal authentication credentials for enhanced security.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-mono">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#DC2626]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-mono">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#DC2626]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-mono">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#DC2626]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs transition-all shadow-md shadow-red-600/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}