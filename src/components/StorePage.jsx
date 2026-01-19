import React, { useEffect } from 'react';
import {
    ChevronLeft, ArrowRight, ShoppingBag, Globe,
    CheckCircle, Flame, Lock, Shield, Zap, TrendingUp
} from 'lucide-react';

// Import Data Produk
import { PRODUCTS } from '../data/products';

const StorePage = ({ onNavigate, onProductSelect }) => {

    // Pastikan scroll balik ke atas pas masuk halaman ini
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-gray-900 font-sans min-h-screen selection:bg-orange-200 selection:text-orange-900">

            {/* --- NAVBAR (Industrial Style) --- */}
            <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b-4 border-black py-4">
                <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                    <button
                        className="group flex items-center gap-2 font-black uppercase tracking-wider hover:text-orange-600 transition-colors"
                        onClick={() => onNavigate('landing')}
                    >
                        <div className="bg-black text-white p-1 rounded group-hover:bg-orange-600 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                        <span>Kembali ke Frontline</span>
                    </button>
                    <div className="hidden md:flex items-center gap-2 font-bold text-sm bg-gray-100 px-3 py-1 rounded border border-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        STORE STATUS: ONLINE
                    </div>
                </div>
            </nav>

            {/* --- HERO HEADER --- */}
            <section className="pt-32 pb-12 px-6 container mx-auto text-center">
                <div className="inline-block bg-orange-600 text-white font-black text-xs px-4 py-2 uppercase tracking-[0.2em] mb-4 border-2 border-black shadow-[4px_4px_0px_#000] transform -rotate-2">
                    Official Supply 2026
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">
                    Gudang Senjata
                </h1>
                <p className="text-gray-600 font-bold max-w-2xl mx-auto text-lg">
                    Jangan masuk medan perang tangan kosong. <br />
                    Pilih alat tempur lu, amankan masa depan lu.
                </p>
            </section>

            {/* --- LEVEL 1: BASIC GEAR (ECERAN) --- */}
            <section className="py-12 px-6 container mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-black text-white font-black px-3 py-1 text-xl border-2 border-black">LVL.1</div>
                    <h2 className="font-bold uppercase tracking-widest text-lg">Basic Infantry Gear (Eceran)</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.filter(p => p.type === 'single').map(product => (
                        <div
                            key={product.id}
                            onClick={() => onProductSelect(product)}
                            className="bg-white border-2 border-black rounded-xl p-4 hover:shadow-[8px_8px_0px_#000] hover:-translate-y-2 transition-all cursor-pointer group flex flex-col h-full relative"
                        >
                            {/* Badge */}
                            <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 border-l-2 border-b-2 border-black rounded-bl-lg">
                                STARTER
                            </div>

                            {/* Image Placeholder Look */}
                            <div className="h-40 bg-gray-100 border-2 border-black mb-4 relative overflow-hidden rounded-lg grayscale group-hover:grayscale-0 transition-all">
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 border border-black rounded text-[10px] font-bold flex items-center gap-1">
                                    <product.icon className="w-3 h-3 text-orange-600" /> {product.title.split(' ')[0]}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <h3 className="font-black text-lg mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium mb-4 line-clamp-2 border-t border-dashed border-gray-300 pt-2">
                                    {product.desc}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div>
                                        <div className="text-[10px] text-gray-400 line-through font-bold">Rp {product.coret}</div>
                                        <div className="text-xl font-black text-gray-900">Rp {product.price}</div>
                                    </div>
                                    <div className="bg-black text-white p-2 rounded hover:bg-orange-600 transition-colors">
                                        <ShoppingBag className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- LEVEL 2: HEAVY WEAPONS (PRO) --- */}
            <section className="py-12 px-6 bg-gray-50 border-y-4 border-black">
                <div className="container mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-orange-600 text-white font-black px-3 py-1 text-xl border-2 border-black">LVL.2</div>
                        <h2 className="font-bold uppercase tracking-widest text-lg">Heavy Weapons (Pro Tools)</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {PRODUCTS.filter(p => p.type === 'pro').map(product => (
                            <div
                                key={product.id}
                                onClick={() => onProductSelect(product)}
                                className="bg-white border-4 border-black rounded-2xl p-0 hover:shadow-[12px_12px_0px_#ea580c] transition-all cursor-pointer group flex flex-col md:flex-row overflow-hidden relative"
                            >
                                {/* Left: Image */}
                                <div className="md:w-2/5 h-48 md:h-auto relative border-b-4 md:border-b-0 md:border-r-4 border-black">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-orange-600/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                {/* Right: Content */}
                                <div className="p-6 md:w-3/5 flex flex-col justify-center bg-white relative">
                                    {/* Decoration Line */}
                                    <div className="absolute top-4 right-4 w-12 h-1 bg-black"></div>

                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`p-1.5 rounded border-2 border-black bg-orange-100`}>
                                            <product.icon className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 rounded uppercase">Professional Grade</span>
                                    </div>

                                    <h3 className="text-2xl font-black mb-2 uppercase leading-none">{product.title}</h3>
                                    <p className="text-sm text-gray-600 font-bold mb-6">{product.desc}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="text-3xl font-black text-orange-600">Rp {product.price}</div>
                                        <div className="flex items-center gap-2 font-black text-xs uppercase hover:underline">
                                            Inspect <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECRET WEAPON (BLACK BOX) --- */}
            <section className="py-16 px-6 container mx-auto">
                {PRODUCTS.filter(p => p.type === 'secret').map(product => (
                    <div
                        key={product.id}
                        onClick={() => onProductSelect(product)}
                        className="bg-black text-white border-4 border-black rounded-3xl p-8 md:p-12 cursor-pointer hover:scale-[1.01] transition-transform relative overflow-hidden group shadow-[10px_10px_0px_#999]"
                    >
                        {/* Hazard Stripes Background */}
                        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff,#fff_10px,transparent_10px,transparent_20px)] pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <div className="inline-flex items-center gap-2 border border-green-500 text-green-500 px-3 py-1 rounded font-mono text-xs font-bold mb-6 animate-pulse">
                                    <Globe className="w-3 h-3" /> CLASSIFIED // TOP SECRET
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black mb-6 leading-none glitch-text">
                                    CHEAT SHEET <br /> <span className="text-green-500">AFFILIATE 2026</span>
                                </h3>
                                <p className="text-gray-400 text-lg font-medium mb-8 border-l-4 border-green-500 pl-4">
                                    {product.desc} "Malas ngonten tapi mau cuan? Ini jalan pintasnya."
                                </p>
                                <div className="flex items-center gap-6">
                                    <div>
                                        <div className="text-gray-500 line-through text-sm">Rp {product.coret}</div>
                                        <div className="text-4xl font-black text-white">Rp {product.price}</div>
                                    </div>
                                    <button className="bg-green-600 text-black px-8 py-4 font-black hover:bg-green-500 transition-colors uppercase tracking-widest border-2 border-transparent hover:border-white">
                                        Buka Rahasia
                                    </button>
                                </div>
                            </div>

                            {/* Visual Folder/File */}
                            <div className="md:w-1/2 w-full flex justify-center">
                                <div className="relative w-64 h-80 bg-gray-900 border-4 border-white/20 rounded-xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-all duration-500">
                                    <Lock className="w-16 h-16 text-white/20" />
                                    <div className="absolute top-4 left-4 text-[10px] font-mono text-gray-500">
                                        DOC_ID: #AFF_2026_X<br />
                                        STATUS: ENCRYPTED
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* --- SUPPLY CRATES (BUNDLES) --- */}
            <section className="py-16 px-6 bg-orange-600 border-t-4 border-black">
                <div className="container mx-auto">
                    <h2 className="text-white font-black uppercase tracking-widest text-2xl mb-12 text-center flex items-center justify-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-black" />
                        Supply Crates (Paket Hemat)
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {PRODUCTS.filter(p => p.type === 'bundle').map(product => (
                            <div
                                key={product.id}
                                onClick={() => onProductSelect(product)}
                                className={`
                                    relative p-8 border-4 border-black cursor-pointer transition-all group overflow-hidden
                                    ${product.id === 'bundle-god'
                                        ? 'bg-white shadow-[15px_15px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
                                        : 'bg-orange-100 shadow-[10px_10px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none'}
                                `}
                            >
                                {/* Stamp Effect */}
                                <div className="absolute top-4 right-4 border-4 border-black rounded-full p-2 opacity-20 transform rotate-12 group-hover:opacity-100 transition-opacity">
                                    {product.id === 'bundle-god' ? <Flame className="w-8 h-8 text-black" /> : <CheckCircle className="w-8 h-8 text-black" />}
                                </div>

                                <div className="relative z-10">
                                    <div className="inline-block bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-4">
                                        {product.desc}
                                    </div>

                                    <h3 className="text-4xl font-black mb-6 leading-none uppercase text-black">
                                        {product.title}
                                    </h3>

                                    <ul className="mb-8 space-y-2">
                                        {product.features.slice(0, 3).map((feat, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                                <div className="w-1.5 h-1.5 bg-black"></div> {feat}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between border-t-4 border-black pt-6">
                                        <div>
                                            <span className="text-gray-500 line-through font-bold text-sm">Rp {product.coret}</span>
                                            <div className="text-4xl font-black text-orange-600">Rp {product.price}</div>
                                        </div>
                                        <button className="bg-black text-white px-6 py-3 font-bold uppercase hover:bg-orange-600 transition-colors">
                                            Ambil Paket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-black text-white py-8 text-center border-t-4 border-white">
                <p className="font-mono text-xs text-gray-500">SYSTEM ID: FASET_DIGITAL_2026 // END OF LINE</p>
            </footer>
        </div>
    );
};

export default StorePage;