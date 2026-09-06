'use client';
import { useState } from 'react';

export default function CheckoutModal({ bookingId, amount, currency = 'USD' }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckout = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/initialize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    bookingId,
                    amount,
                    currency
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to initialize payment');
            }

            // Redirect user to the gateway checkout link returned by your backend
            if (data.invoice?.checkoutLink) {
                window.location.href = data.invoice.checkoutLink;
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Complete Your Booking</h3>
            <p className="text-sm text-slate-500 mb-6">Secure payment via CannonTravels Gateway</p>

            <div className="bg-slate-50 rounded-xl p-4 mb-6 flex justify-between items-center">
                <span className="text-sm text-slate-600 font-medium">Total Amount</span>
                <span className="text-xl font-bold text-slate-900">{currency} {amount}</span>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                    {error}
                </div>
            )}

            <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#DC2626] hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
                {loading ? (
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                ) : (
                    <span>Proceed to Secure Checkout</span>
                )}
            </button>
        </div>
    );
}