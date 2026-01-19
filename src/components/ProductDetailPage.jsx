import React, { useEffect, useState } from 'react';
import {
    ChevronLeft, MessageCircle, ShieldCheck,
    Star, Clock, CheckCircle2, Zap, ArrowRight,
    CreditCard, Copy, Check
} from 'lucide-react';

// Import Helper generateWALink dari data
import { generateWALink } from '../data/products';

// --- SUB-COMPONENT: BANK CARD (Biar Rapi & Bisa Copy) ---
const BankCard = ({ bankName, accountNumber, holderName, color }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative overflow-hidden rounded-xl p-4 border border-gray-100 shadow-sm ${color === 'bca' ? 'bg-blue-50/50 hover:bg-blue-50' : 'bg-yellow-50/50 hover:bg-yellow-50'} transition-all hover:shadow-md group`}>
            <div className="flex justify-between items-start mb-2">
                <div className={`font-black text-xs uppercase tracking-widest ${color === 'bca' ? 'text-blue-800' : 'text-yellow-800'}`}>
                    {bankName}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-md border border-gray-200 text-[10px] font-bold hover:bg-gray-100 transition-all shadow-sm active:scale-95"
                >
                    {copied ? (
                        <><Check className="w-3 h-3 text-green-600" /> Copied</>
                    ) : (
                        <><Copy className="w-3 h-3 text-gray-400" /> Copy</>
                    )}
                </button>
            </div>
            <div className="font-mono text-lg md:text-xl font-black text-gray-900 tracking-tighter mb-1 select-all">
                {accountNumber}
            </div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                a.n {holderName}
            </div>
        </div>
    );
};

const ProductDetailPage = ({ product, onBack }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 text-gray-900 font-sans min-h-screen pb-20 selection:bg-orange-100 selection:text-orange-900">

            {/* --- NAVBAR (Clean & Glassy) --- */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 transition-all">
                <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-bold text-sm"
                    >
                        <div className="bg-white border border-gray-200 p-2 rounded-full shadow-sm hover:shadow-md transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                        <span>Kembali ke Store</span>
                    </button>
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-bold border border-orange-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        Stok Terbatas 2026
                    </div>
                </div>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <div className="container mx-auto px-6 pt-32 max-w-6xl">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* --- KIRI: GAMBAR (Sticky) --- */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-6">
                            {/* Main Image Card */}
                            <div className="bg-white p-2 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden group">
                                <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gray-100 relative">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wide">
                                        {product.type === 'bundle' ? '📦 Bundle Pack' : '⚡ Single Unit'}
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="bg-green-50 p-3 rounded-full text-green-600">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-sm">Garansi Resmi</div>
                                    <div className="text-xs text-gray-500">Jaminan materi update & support admin.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- KANAN: INFO, CHECKOUT & BANK --- */}
                    <div className="lg:col-span-7">

                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4 text-orange-600 font-bold text-sm uppercase tracking-wider">
                                <Star className="w-4 h-4 fill-current" />
                                <span>Best Choice For Survival</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                {product.title}
                            </h1>
                            <p className="text-xl text-gray-500 leading-relaxed font-medium border-l-4 border-orange-200 pl-4">
                                {product.desc}
                            </p>
                        </div>

                        {/* Pricing & Bank Card Area */}
                        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 mb-10 relative overflow-hidden">
                            {/* Pricing Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                                <div>
                                    <div className="text-gray-400 font-medium text-sm line-through mb-1">Harga Normal: Rp {product.coret}</div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-orange-600">Rp</span>
                                        <span className="text-6xl font-black text-gray-900 tracking-tight">{product.price}</span>
                                    </div>
                                </div>
                                <div className="hidden md:block text-right">
                                    <div className="flex items-center gap-1 text-orange-500 font-bold text-sm justify-end">
                                        <Star className="w-4 h-4 fill-current" /> 4.9/5.0
                                    </div>
                                    <div className="text-xs text-gray-400">Rating Survivor</div>
                                </div>
                            </div>

                            {/* Action Button (WA) */}
                            <a
                                href={generateWALink(product)}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:-translate-y-1 flex items-center justify-center gap-3 mb-8 relative z-10"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Beli via WhatsApp (Fast Respon)
                            </a>

                            {/* --- AREA REKENING MANUAL (Integrated) --- */}
                            <div className="border-t border-gray-100 pt-6 relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-gray-400" />
                                        Rekening Official Admin:
                                    </h4>
                                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">Manual Transfer</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <BankCard
                                        bankName="BCA"
                                        accountNumber="7005237041"
                                        holderName="Abdullah Ridwan"
                                        color="bca"
                                    />
                                    <BankCard
                                        bankName="MANDIRI"
                                        accountNumber="1570002908029"
                                        holderName="Abdullah Ridwan"
                                        color="mandiri"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-3 text-center italic">
                                    *Silakan transfer lalu kirim bukti transfer ke WhatsApp admin untuk diproses.
                                </p>
                            </div>
                        </div>

                        {/* Content Details */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-orange-500" />
                                    Kenapa Ini Penting?
                                </h3>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 text-gray-600 leading-relaxed text-lg shadow-sm whitespace-pre-line">
                                    {product.longDesc}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-gray-900 mb-6">
                                    Apa Yang Lu Dapetin?
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {product.features.map((feature, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3 hover:border-orange-200 transition-colors">
                                            <div className="bg-orange-100 p-1.5 rounded-full text-orange-600 shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-gray-700 text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;