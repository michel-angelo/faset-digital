import {
    BookOpen, Instagram, DollarSign, Smartphone,
    Cpu, Zap, Globe, ShoppingBag, Flame
} from 'lucide-react';

// --- CONFIG ---
const WA_NUMBER = "628123456789"; // Ganti nomor WA lu di sini

// Helper buat generate link WA
export const generateWALink = (product) => {
    const message = `Halo Faset.Digital, saya mau ambil *${product.title}* seharga Rp ${product.price}. Tolong info pembayarannya ya!`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
};

// --- DATABASE PRODUK ---
export const PRODUCTS = [
    // LEVEL 1: ECERAN
    {
        id: "guide-book",
        type: "single",
        icon: BookOpen,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
        color: "text-orange-500",
        title: "Guide Book Digital Product",
        desc: "Kitab suci cuan modal HP.",
        longDesc: "Panduan step-by-step buat lu yang gaptek parah. Mulai dari riset ide, bikin produk PDF/Ebook cuma pake Canva di HP, sampe cara jualannya. Gak butuh laptop, gak butuh modal gede.",
        price: "39.000",
        coret: "99.000",
        features: ["Riset Ide Winning", "Tutorial Canva HP", "Copywriting Jualan", "Akses Seumur Hidup"]
    },
    {
        id: "content-90",
        type: "single",
        icon: Instagram,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
        color: "text-pink-500",
        title: "Ide 90 Hari Konten",
        desc: "Anti buntu ide 3 bulan.",
        longDesc: "Kalender konten siap pakai buat 3 bulan. Lu gak perlu mikir 'besok posting apa ya?'. Tinggal contek, edit dikit, post. Konsistensi adalah kunci viral, dan ini kuncinya.",
        price: "29.000",
        coret: "79.000",
        features: ["90 Headline Konten", "30 Ide Story", "Format Hook Viral", "Content Planner Notion"]
    },
    {
        id: "lynk-id",
        type: "single",
        icon: DollarSign,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
        color: "text-green-500",
        title: "Panduan Lynk.id",
        desc: "Mesin kasir otomatis.",
        longDesc: "Ubah bio link lu jadi mesin duit otomatis. Tutorial setting Lynk.id biar orang bisa beli produk lu 24 jam non-stop pas lu lagi tidur. Biar duit masuk terus walau lu lagi liburan.",
        price: "29.000",
        coret: "79.000",
        features: ["Setup Payment Gateway", "Desain Halaman Checkout", "Integrasi E-Wallet", "Auto Delivery File"]
    },
    {
        id: "reels-viral",
        type: "single",
        icon: Smartphone,
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80",
        color: "text-purple-500",
        title: "Strategi Reels Viral",
        desc: "Hack algoritma 2026.",
        longDesc: "Bongkar rahasia algoritma Reels terbaru. Gimana cara bikin video 7 detik yang view-nya tembus ratusan ribu tanpa perlu joget-joget. Fokus ke hook dan retensi.",
        price: "29.000",
        coret: "79.000",
        features: ["Rumus Hook 3 Detik", "Settingan Upload HD", "Audio Trending Hack", "Editing CapCut Cepat"]
    },
    // LEVEL 2: PRO TOOLS
    {
        id: "ai-creator",
        type: "pro",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        color: "text-blue-400",
        title: "Unlock AI For Creators",
        desc: "Kerja 1 jam hasil kayak 10 jam.",
        longDesc: "Kumpulan prompt ChatGPT & tools AI rahasia yang bikin kerjaan konten lu selesai secepat kilat. Biarin AI yang jadi karyawan gratisan lu buat nulis script, bikin caption, sampe riset pasar.",
        price: "99.000",
        coret: "299.000",
        features: ["1000+ Prompt ChatGPT", "List Tools AI Gratis", "AI Image Generator", "Automasi Caption"]
    },
    {
        id: "sosmedpreneur",
        type: "pro",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        color: "text-yellow-400",
        title: "Sosmedpreneur Blueprint",
        desc: "Ubah followers jadi duit cash.",
        longDesc: "Roadmap lengkap ngebangun Personal Branding yang ngehasilin duit. Bukan sekedar jadi selebgram, tapi jadi pengusaha digital. Dari 0 followers sampe dapet endorse dan jualan produk sendiri.",
        price: "129.000",
        coret: "399.000",
        features: ["Monetisasi Followers", "Deal Brand Endorse", "Funneling Strategy", "Community Building"]
    },
    // SECRET WEAPON (INDEPENDENT)
    {
        id: "affiliate-2026",
        type: "secret",
        icon: Globe,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        color: "text-green-500",
        title: "Affiliate Hunter 2026",
        desc: "CHEAT SHEET Cuan Tanpa Produk.",
        longDesc: "Jujur aja, lu males bikin produk kan? Lu males bikin video kan? NAH INI SOLUSINYA. Kita kasih 'Cheat Sheet' produk apa yang lagi laku keras, plus videonya tinggal lu upload ulang. Gak perlu stok barang, gak perlu pusing mikir ide. Tinggal copy-paste, sebar link, cuan ngalir.",
        price: "99.000",
        coret: "499.000",
        features: ["Database Supplier Valid", "6000+ Video Mentahan (No Copyright)", "Trik FYP TikTok Affiliate", "Script Jualan Hard Selling"]
    },
    // BUNDLES
    {
        id: "bundle-starter",
        type: "bundle",
        icon: ShoppingBag,
        image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80",
        color: "text-white",
        title: "Basic Survival Kit",
        desc: "Starter Pack Hemat 50%",
        longDesc: "Paket hemat buat pemula. Dapet 4 modul dasar (Guide Book, Ide Konten, Lynk.id, Reels) dengan harga miring banget. Cocok buat yang baru mau nyicipin cuan internet.",
        price: "69.000",
        coret: "139.000",
        features: ["Guide Book Digital", "Ide 90 Hari Konten", "Panduan Lynk.id", "Strategi Reels Viral"]
    },
    {
        id: "bundle-god",
        type: "bundle",
        icon: Flame,
        image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80",
        color: "text-orange-500",
        title: "Ultimate 2026 Arsenal",
        desc: "GOD MODE (All in One)",
        longDesc: "Paket lengkap penguasa internet. Lu dapet SEMUA produk di atas + Akses ke grup support eksklusif. Jangan nanggung kalau mau kaya.",
        price: "249.000",
        coret: "453.000",
        features: ["SEMUA ISI STARTER PACK", "Unlock AI Creators", "Sosmedpreneur", "Affiliate Hunter", "BONUS EKSKLUSIF"]
    }
];