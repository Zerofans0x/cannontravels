"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "deposit" | "withdraw" | "password">("profile");

  // Profile Form State
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+1 34 803 000 0000");

  // Deposit Form State
  const [depositAmount, setDepositAmount] = useState("");
  const [depositMethod, setDepositMethod] = useState("Wire Transfer");

  // Withdrawal Form State
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawDestination, setWithdrawDestination] = useState("");

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile settings updated successfully.");
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Successfully initiated deposit of $${depositAmount} via ${depositMethod}.`);
    setDepositAmount("");
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Withdrawal request of $${withdrawAmount} submitted for processing.`);
    setWithdrawAmount("");
    setWithdrawDestination("");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    alert("Password updated successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div>
        <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
          Account Governance & Capital Operations
        </p>
        <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
          Account Settings
        </h2>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-[20px] border border-emerald-100 shadow-xs [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-[13px] font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "profile"
              ? "bg-[#059669] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Icon icon="basil:user-solid" className="w-4 h-4" />
          <span>Profile Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("deposit")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-[13px] font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "deposit"
              ? "bg-[#059669] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Icon icon="lucide:arrow-down-left" className="w-4 h-4" />
          <span>Deposit Funds</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("withdraw")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-[13px] font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "withdraw"
              ? "bg-[#059669] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Icon icon="lucide:arrow-up-right" className="w-4 h-4" />
          <span>Withdrawals</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("password")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-[13px] font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "password"
              ? "bg-[#059669] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Icon icon="lucide:lock" className="w-4 h-4" />
          <span>Change Password</span>
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-emerald-100 shadow-xs">
        {activeTab === "profile" && (
          <form onSubmit={handleProfileSave} className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-mazzard text-[18px] text-[#0A1A32]">Profile Information</h3>
              <p className="text-[12.5px] text-slate-500 mt-1">
                Manage your personal identification and institutional contact details.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/25 cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        )}

        {activeTab === "deposit" && (
          <form onSubmit={handleDepositSubmit} className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-mazzard text-[18px] text-[#0A1A32]">Deposit Funds into Terminal</h3>
              <p className="text-[12.5px] text-slate-500 mt-1">
                Add capital to your portfolio NAV via secure institutional wire or digital asset transfer.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">Deposit Amount (USD)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-medium">$</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">Transfer Method</label>
                <select
                  value={depositMethod}
                  onChange={(e) => setDepositMethod(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 bg-white focus:outline-none focus:border-[#059669]"
                >
                  <option value="Wire Transfer">Institutional Wire Transfer (SWIFT / ABA)</option>
                  <option value="USDT / USDC">Stablecoin Deposit (USDT / USDC on Ethereum / Arbitrum)</option>
                  <option value="BTC Reserve">Direct Bitcoin Reserve Transfer</option>
                </select>
              </div>

              <div className="p-4 bg-emerald-50 rounded-[14px] text-[12.5px] text-emerald-800 leading-relaxed">
                Deposits are processed through prime brokerage clearing networks and typically reflect in Net Asset Value within 1 to 3 business hours.
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/25 cursor-pointer"
            >
              Initiate Deposit
            </button>
          </form>
        )}

        {activeTab === "withdraw" && (
          <form onSubmit={handleWithdrawSubmit} className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-mazzard text-[18px] text-[#0A1A32]">Request Capital Withdrawal</h3>
              <p className="text-[12.5px] text-slate-500 mt-1">
                Withdraw unallocated liquidity reserves back to your verified institutional bank or wallet.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">Withdrawal Amount (USD)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-medium">$</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 10000"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">Destination Account / Wallet Address</label>
                <input
                  type="text"
                  required
                  placeholder="Enter IBAN or crypto withdrawal hash"
                  value={withdrawDestination}
                  onChange={(e) => setWithdrawDestination(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div className="p-4 bg-amber-50 rounded-[14px] text-[12.5px] text-amber-800 leading-relaxed">
                Withdrawals undergo automated risk governance checks and require multi-signature approval if exceeding standard liquidity thresholds.
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/25 cursor-pointer"
            >
              Submit Withdrawal Request
            </button>
          </form>
        )}

        {activeTab === "password" && (
          <form onSubmit={handlePasswordChange} className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-mazzard text-[18px] text-[#0A1A32]">Change Account Password</h3>
              <p className="text-[12.5px] text-slate-500 mt-1">
                Update your terminal authentication credentials for enhanced security.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/25 cursor-pointer"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}