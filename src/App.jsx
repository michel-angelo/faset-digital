import React, { useState } from 'react';

// --- IMPORT KOMPONEN (Pastikan file-nya ada di folder components) ---
import LandingPage from './components/LandingPage';
import StorePage from './components/StorePage';
import ProductDetailPage from './components/ProductDetailPage';

const App = () => {
  // 1. State 'view': Nyimpen posisi kita sekarang
  // Opsi: 'landing' | 'store' | 'detail'
  const [view, setView] = useState('landing');

  // 2. State 'selectedProduct': Nyimpen data produk pas diklik
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- LOGIC NAVIGASI (Saklar Pindah Halaman) ---

  // Pindah ke Toko
  const goToStore = () => {
    setView('store');
    window.scrollTo(0, 0); // Reset scroll ke atas
  };

  // Balik ke Landing Page
  const goToLanding = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  // Masuk ke Detail Produk
  const handleProductSelect = (product) => {
    setSelectedProduct(product); // Simpen data produknya
    setView('detail');           // Pindah layar
  };

  // Balik dari Detail ke Toko
  const handleBackFromDetail = () => {
    setSelectedProduct(null);    // Reset data produk
    setView('store');            // Balik ke etalase
  };

  // --- TAMPILAN UTAMA (ROUTER) ---
  return (
    <>
      {/* 1. TAMPILIN LANDING PAGE */}
      {view === 'landing' && (
        <LandingPage onNavigate={goToStore}
          onProductSelect={handleProductSelect} />
      )}

      {/* 2. TAMPILIN STORE PAGE */}
      {view === 'store' && (
        <StorePage
          onNavigate={goToLanding}
          onProductSelect={handleProductSelect}
        />
      )}

      {/* 3. TAMPILIN DETAIL PAGE (Cuma kalau ada produk dipilih) */}
      {view === 'detail' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          onBack={handleBackFromDetail}
        />
      )}
    </>
  );
};

export default App;