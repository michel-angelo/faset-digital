import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

const BankCard = ({ bankName, accountNumber, holderName, color }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset icon setelah 2 detik
    };

    return (
        <div className={`relative overflow-hidden rounded-2xl p-6 border border-gray-100 shadow-sm ${color === 'bca' ? 'bg-blue-50' : 'bg-yellow-50'} transition-all hover:shadow-md`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className={`font-black text-xl uppercase tracking-widest ${color === 'bca' ? 'text-blue-800' : 'text-yellow-800'}`}>
                        {bankName}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 uppercase">Verified Merchant</p>
                </div>
                {/* Tombol Copy */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-xs font-bold hover:bg-gray-100 transition-all shadow-sm"
                >
                    {copied ? (
                        <>Copied <CheckCircle className="w-3 h-3 text-green-600" /></>
                    ) : (
                        <>Copy No <Copy className="w-3 h-3 text-gray-500" /></>
                    )}
                </button>
            </div>

            <div className="mb-1">
                <div className="text-3xl font-black text-gray-900 tracking-tighter tabular-nums">
                    {accountNumber}
                </div>
            </div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                a.n {holderName}
            </div>
        </div>
    );
};

export default BankCard;