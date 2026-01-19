import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowRight, AlertTriangle, Zap, Skull, ShieldCheck,
    Lock, Timer, TrendingDown, ShoppingBag, XCircle, CheckCircle2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

// --- KOMPONEN: DOOMSDAY CLOCK (VERSI LIGHT) ---
const DoomsdayClock = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 340, hours: 12, mins: 45, secs: 10 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
                if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
                return { ...prev, secs: 59 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex gap-3 md:gap-4 justify-center font-mono text-orange-600 my-8">
            {Object.entries(timeLeft).map(([unit, val]) => (
                <div key={unit} className="text-center">
                    {/* Kotak Angka: Putih dengan Border Tebal Orange */}
                    <div className="text-3xl md:text-5xl font-black bg-white border-2 border-orange-600 p-3 rounded-lg shadow-[4px_4px_0px_rgba(234,88,12,1)] tabular-nums">
                        {String(val).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest mt-2 text-gray-500 font-bold">{unit}</div>
                </div>
            ))}
        </div>
    );
};

// --- KOMPONEN: SCROLL REVEAL ---
const RevealOnScroll = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);
    return (
        <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

const LandingPage = ({ onNavigate, onProductSelect }) => {
    const [scrolled, setScrolled] = useState(false);
    const featuredProducts = PRODUCTS.slice(0, 3);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-white text-gray-900 font-sans min-h-screen overflow-x-hidden selection:bg-orange-200 selection:text-orange-900">

            {/* --- EMERGENCY TICKER (High Contrast) --- */}
            {/* Background Orange Nyala, Text Putih Tebal */}
            <div className="bg-orange-600 text-white text-[10px] md:text-xs font-black py-3 overflow-hidden whitespace-nowrap z-50 relative border-b-4 border-orange-800">
                <div className="animate-marquee inline-block uppercase tracking-widest">
                    ⚠️ SYSTEM WARNING: EKONOMI 2026 TIDAK STABIL • AMANKAN POSISI ANDA SEKARANG • INFLASI 8% • AI TAKEOVER • ZONA NYAMAN = ZONA BAHAYA •
                    ⚠️ SYSTEM WARNING: EKONOMI 2026 TIDAK STABIL • AMANKAN POSISI ANDA SEKARANG • INFLASI 8% • AI TAKEOVER • ZONA NYAMAN = ZONA BAHAYA •
                </div>
            </div>

            {/* --- NAVBAR --- */}
            <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'top-0 py-3 bg-white/95 backdrop-blur-lg border-b border-gray-200' : 'top-10 py-6 bg-transparent'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-black text-xl border-2 border-black shadow-[3px_3px_0px_#000]">F</div>
                        <span className="font-bold text-2xl tracking-tighter text-gray-900">Faset<span className="text-orange-600">.Digital</span></span>
                    </div>
                    <button onClick={() => onNavigate()} className="bg-black text-white px-3 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 hover:text-white hover:shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all flex items-center gap-2 border-2 border-transparent">
                        <Lock className="w-3 h-3" /> SECURE ACCESS
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION (WARNING SIGN AESTHETIC) --- */}
            <header className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 overflow-hidden flex flex-col justify-center items-center">
                {/* Background Pattern: Warning Stripes */}
                <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000,#000_1px,transparent_1px,transparent_10px)] pointer-events-none"></div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <RevealOnScroll delay={0}>
                        <div className="inline-flex items-center gap-2 bg-orange-100 border-2 border-orange-600 px-6 py-2 rounded-full mb-8 animate-pulse">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                            <span className="text-xs font-black text-orange-800 uppercase tracking-[0.2em]">Peringatan Terakhir</span>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={100}>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8 text-gray-900 glitch-text" data-text="BERUBAH ATAU PUNAH.">
                            BERUBAH <br />
                            <span className="text-orange-600 underline decoration-black decoration-8 underline-offset-8">ATAU PUNAH.</span>
                        </h1>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <p className="text-xl md:text-2xl text-gray-600 font-bold mb-8 max-w-3xl mx-auto leading-relaxed">
                            2026 bukan tahun buat "main aman".
                            Pilihannya cuma dua: Punya skill mahal, atau digilas zaman.
                            <span className="bg-black text-white px-2 ml-1 rotate-1 inline-block">Waktu lu abis.</span>
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={300}>
                        <DoomsdayClock />
                        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
                            <button onClick={() => onNavigate()} className="px-10 py-5 bg-orange-600 text-white rounded-xl font-black text-xl border-2 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 uppercase tracking-wider group">
                                Selamatkan Karir Gw <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </RevealOnScroll>
                </div>
            </header>

            {/* --- COMPARISON TABLE (High Contrast Box) --- */}
            <section className="py-24 px-6 bg-white border-y-4 border-black relative">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 bg-black text-white inline-block px-4 py-2 rotate-1">REALITA PAHIT.</h2>
                        <p className="text-gray-600 text-lg font-bold mt-4">Lu ada di kubu yang mana?</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-0 border-4 border-black shadow-[10px_10px_0px_rgba(234,88,12,0.3)]">
                        {/* LEFT: THE VICTIM (Gray & Boring) */}
                        <div className="bg-gray-100 p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-black relative grayscale hover:grayscale-0 transition-all">
                            <div className="flex items-center gap-3 mb-8">
                                <Skull className="w-10 h-10 text-gray-600" />
                                <h3 className="text-3xl font-black text-gray-500">MAYAT KORPORAT</h3>
                            </div>
                            <ul className="space-y-6 font-bold text-gray-500">
                                <li className="flex gap-4">
                                    <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                                    <span>Gaji numpang lewat doang.</span>
                                </li>
                                <li className="flex gap-4">
                                    <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                                    <span>Ketar-ketir tiap ada isu PHK.</span>
                                </li>
                                <li className="flex gap-4">
                                    <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                                    <span>Skill jadul, gampang diganti AI.</span>
                                </li>
                                <li className="flex gap-4 mt-6 bg-red-100 p-2 rounded border border-red-200 text-red-600">
                                    <TrendingDown className="w-6 h-6 shrink-0" />
                                    <span className="font-black">MASA DEPAN SURAM.</span>
                                </li>
                            </ul>
                        </div>

                        {/* RIGHT: THE SURVIVOR (Orange & Bold) */}
                        <div className="bg-orange-600 p-8 md:p-12 relative overflow-hidden text-white">
                            {/* Pattern */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <ShieldCheck className="w-10 h-10 text-white" />
                                <h3 className="text-3xl font-black">DIGITAL WARLORD</h3>
                            </div>
                            <ul className="space-y-6 font-bold relative z-10">
                                <li className="flex gap-4">
                                    <div className="bg-white rounded-full p-0.5"><CheckCircle2 className="w-5 h-5 text-orange-600" /></div>
                                    <span>Skill mahal, dibayar Dollar/Euro.</span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-white rounded-full p-0.5"><CheckCircle2 className="w-5 h-5 text-orange-600" /></div>
                                    <span>Punya "Gudang Senjata" (Backup Plan).</span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-white rounded-full p-0.5"><CheckCircle2 className="w-5 h-5 text-orange-600" /></div>
                                    <span>Kerja cerdas pake Leverage AI.</span>
                                </li>
                                <li className="flex gap-4 mt-6 bg-black p-2 rounded border border-gray-800 text-orange-400">
                                    <Zap className="w-6 h-6 shrink-0" />
                                    <span className="font-black">SIAP MENGHADAPI APAPUN.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURED WEAPONS --- */}
            <section className="py-24 px-6 bg-white relative">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div>
                            <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-sm border-b-2 border-orange-600 pb-1">The Armory</span>
                            <h2 className="text-4xl md:text-5xl font-black mt-4 text-gray-900">PILIH SENJATA LU.</h2>
                        </div>
                        <button onClick={() => onNavigate()} className="bg-gray-100 px-6 py-3 rounded-lg font-bold hover:bg-black hover:text-white transition-all flex items-center gap-2">
                            Lihat Semua Koleksi <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredProducts.map((product, idx) => (
                            <RevealOnScroll key={product.id} delay={idx * 100}>
                                <div
                                    className="group bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-orange-600 hover:shadow-[8px_8px_0px_rgba(234,88,12,1)] transition-all duration-200 cursor-pointer relative top-0 hover:-top-2"
                                    onClick={() => onProductSelect(product)}
                                >
                                    {/* Image Area */}
                                    <div className="h-64 bg-gray-100 rounded-lg mb-6 relative overflow-hidden border border-gray-100">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                                        <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider transform -rotate-2 group-hover:rotate-0 transition-transform">
                                            {product.type === 'bundle' ? '🔥 Heavy Weapon' : '⚡ Tactical Gear'}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                                            {product.title}
                                        </h3>
                                        <div className="flex items-center justify-between border-t-2 border-gray-100 pt-4 mt-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 line-through font-bold">Rp {product.coret}</span>
                                                <span className="text-2xl font-black text-gray-900">Rp {product.price}</span>
                                            </div>
                                            <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                                <ShoppingBag className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-32 bg-orange-600 relative overflow-hidden text-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                <div className="container mx-auto px-6 max-w-4xl relative z-10 text-white">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter drop-shadow-lg">
                        MASIH MAU NUNDA?
                    </h2>
                    <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto font-bold">
                        Besok harga naik. Besok masalah makin berat.
                        <br />Ambil keputusan jantan sekarang.
                    </p>

                    <button onClick={() => onNavigate()} className="w-full md:w-auto bg-white text-black px-12 py-6 rounded-xl text-2xl font-black hover:bg-black hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-y-2 uppercase tracking-widest border-4 border-black">
                        GABUNG ARMORY SEKARANG
                    </button>
                    <p className="mt-8 text-xs text-orange-200 font-mono tracking-widest">
                        SECURE CHECKOUT • INSTANT ACCESS • NO BULLSHIT
                    </p>
                </div>
            </section>

            {/* STYLE UNTUK GLITCH & ANIMASI */}
            <style jsx>{`
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
                
                /* GLITCH EFFECT LIGHT MODE (Black Text, Color Shadow) */
                .glitch-text {
                    position: relative;
                }
                .glitch-text::before, .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #fff; /* White background to hide original text parts */
                }
                .glitch-text::before {
                    left: 2px;
                    text-shadow: -1px 0 #ff0000; /* Red Shadow */
                    clip: rect(24px, 550px, 90px, 0);
                    animation: glitch-anim-2 3s infinite linear alternate-reverse;
                }
                .glitch-text::after {
                    left: -2px;
                    text-shadow: -1px 0 #ffa500; /* Orange Shadow */
                    clip: rect(85px, 550px, 140px, 0);
                    animation: glitch-anim 2.5s infinite linear alternate-reverse;
                }
                @keyframes glitch-anim {
                    0% { clip: rect(10px, 9999px, 30px, 0); }
                    20% { clip: rect(80px, 9999px, 100px, 0); }
                    40% { clip: rect(40px, 9999px, 60px, 0); }
                    60% { clip: rect(10px, 9999px, 50px, 0); }
                    80% { clip: rect(120px, 9999px, 150px, 0); }
                    100% { clip: rect(5px, 9999px, 40px, 0); }
                }
                @keyframes glitch-anim-2 {
                    0% { clip: rect(60px, 9999px, 70px, 0); }
                    20% { clip: rect(10px, 9999px, 30px, 0); }
                    40% { clip: rect(90px, 9999px, 110px, 0); }
                    60% { clip: rect(15px, 9999px, 20px, 0); }
                    80% { clip: rect(100px, 9999px, 130px, 0); }
                    100% { clip: rect(30px, 9999px, 60px, 0); }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;