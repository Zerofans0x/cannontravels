"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/transactions");
        setTransactions(response.data.data || []);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Failed to load transaction journal.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-wider font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Financial Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Transaction Journal
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            Review historical payment settlements, gateway invoices, and encrypted ledger statuses.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm flex items-center gap-2">
          <Icon icon="lucide:alert-circle" className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Transaction Records List */}
      {isLoading ? (
        <div className="py-24 flex items-center justify-center">
          <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : transactions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-red-50 text-[#DC2626] rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
            <Icon icon="bi:journal" className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No transactions recorded</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Your transaction history is empty. Completed flight bookings and invoice settlements will appear here.
            </p>
          </div>
          <Link 
            href="/dashboard/flights" 
            className="inline-block mt-2 px-6 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-full text-sm transition-all"
          >
            Explore Flights
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-mono text-slate-500">
                  <th className="p-4 sm:px-6 font-bold">Reference / Order ID</th>
                  <th className="p-4 sm:px-6 font-bold">Gateway</th>
                  <th className="p-4 sm:px-6 font-bold">Amount</th>
                  <th className="p-4 sm:px-6 font-bold">Status</th>
                  <th className="p-4 sm:px-6 font-bold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {transactions.map((tx: any) => (
                  <tr key={tx._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:px-6">
                      <span className="font-mono font-bold text-slate-800 block">{tx.orderId || tx.reference}</span>
                      <span className="text-[11px] text-slate-400 font-mono">Ref: {tx.reference}</span>
                    </td>
                    <td className="p-4 sm:px-6 font-medium capitalize text-slate-700">
                      {tx.gateway || 'Platform Gateway'}
                    </td>
                    <td className="p-4 sm:px-6 font-black text-slate-900">
                      ${tx.amount} <span className="text-xs font-normal text-slate-500">{tx.currency}</span>
                    </td>
                    <td className="p-4 sm:px-6">
                      <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        tx.status === 'success' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : tx.status === 'expired' 
                          ? 'bg-slate-100 text-slate-600 border border-slate-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 sm:px-6 text-xs text-slate-500 font-medium">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}