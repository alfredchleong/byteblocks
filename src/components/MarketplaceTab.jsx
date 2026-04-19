import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Confetti from 'react-confetti';
import { ShoppingCart, CheckCircle, Package, ArrowLeft, Ticket } from 'lucide-react';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Artisan Sourdough Bread',
    asin: 'B0B6WWVLP9',
    price: '1 ETH',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Freshly baked artisanal sourdough bread.'
  },
  {
    id: 2,
    name: 'Premium Coffee Beans',
    asin: 'B08ABCD123',
    price: '0.5 ETH',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Organic fair-trade whole bean coffee.'
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    asin: 'B09XYZ789',
    price: '2 ETH',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Wireless mechanical keyboard with RGB.'
  }
];

export default function MarketplaceTab({ hidden }) {
  const [state, setState] = useState('grid'); // 'grid', 'checkout', 'success'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setState('checkout');
  };

  const handleReset = () => {
    setState('grid');
    setSelectedProduct(null);
  };

  return (
    <div 
      className="flex-1 h-full bg-[#0a0a0f] overflow-y-auto relative"
      style={{ display: hidden ? 'none' : 'block' }}
    >
      {state === 'success' && <Confetti recycle={false} numberOfPieces={500} gravity={0.15} />}

      <div className="max-w-6xl mx-auto p-8">
        
        {/* STATE 1: MARKETPLACE GRID */}
        {state === 'grid' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
            <p className="text-[#94a3b8] mb-8">Purchase real-world items using crypto. Powered by smart contracts and Knot API.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_PRODUCTS.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => handleSelectProduct(product)}
                  className="bg-[#13131f] border border-[#2e2e3e] rounded-2xl overflow-hidden cursor-pointer group hover:border-[#6366f1] hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all"
                >
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-[#ff9900] text-black text-[10px] font-bold px-2 py-1 rounded shadow z-10">
                      Amazon
                    </div>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-[#94a3b8] text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#6366f1]">{product.price}</span>
                      <button className="bg-[#22222f] text-white p-2 rounded-lg group-hover:bg-[#6366f1] transition-colors">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STATE 2: CHECKOUT & QR CODE */}
        {state === 'checkout' && selectedProduct && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto">
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 text-[#94a3b8] hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Marketplace
            </button>

            <div className="bg-[#13131f] border border-[#2e2e3e] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
              {/* Product Details Side */}
              <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-[#2e2e3e] bg-[#1a1a28]">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-48 object-cover rounded-xl mb-6 shadow-md"
                />
                <h2 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h2>
                <div className="bg-[#22222f] px-3 py-1.5 rounded-lg inline-flex text-xs text-[#64748b] font-mono border border-[#2e2e3e] mb-4">
                  ASIN: {selectedProduct.asin}
                </div>
                <p className="text-[#94a3b8] leading-relaxed mb-6">
                  You are about to purchase this item via a smart contract. Once your payment is verified, the Knot API will automatically redeem and ship this item.
                </p>
                <div className="bg-[#0a0a0f] p-4 rounded-xl flex items-center justify-between border border-[#2e2e3e]">
                  <span className="text-[#94a3b8] font-medium">Total Price</span>
                  <span className="text-2xl font-bold text-[#6366f1]">{selectedProduct.price}</span>
                </div>
              </div>

              {/* QR Code Side */}
              <div className="flex-1 p-10 flex flex-col items-center justify-center relative">
                <h3 className="text-xl font-semibold text-white mb-2">Awaiting Payment</h3>
                <p className="text-[#94a3b8] text-center mb-8 text-sm">Scan with MetaMask or WalletConnect.</p>
                
                <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 relative">
                  <QRCodeSVG value={`ethereum:0x1234567890123456789012345678901234567890?amount=${selectedProduct.price.split(' ')[0]}`} size={200} />
                  {/* Hidden Developer Button */}
                  <div 
                    className="absolute inset-0 cursor-crosshair opacity-0" 
                    onClick={() => setState('success')}
                    title="Dev trigger"
                  />
                </div>
                
                <div className="flex items-center gap-2 text-[#64748b] text-sm animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-[#6366f1]"></div>
                  Listening for on-chain events...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: SUCCESS NOTIFICATION */}
        {state === 'success' && selectedProduct && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-2xl mx-auto mt-12 flex flex-col items-center text-center">
            <CheckCircle size={64} className="text-[#10b981] mb-6" />
            <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Transaction Confirmed!</h1>
            
            <div className="bg-gradient-to-br from-[#13131f] to-[#1e1e2f] border border-[#3b3b54] p-8 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.15)] w-full mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981] rounded-full blur-[80px] opacity-10"></div>
              
              <Ticket size={48} className="text-[#10b981] mx-auto mb-4" />
              <p className="text-lg text-[#e2e8f0] leading-relaxed mb-6">
                You have been successfully minted <strong className="text-[#10b981]">1 Bread Coin</strong>.
              </p>
              
              <div className="bg-[#0a0a0f] border border-[#2e2e3e] p-4 rounded-xl inline-block mx-auto text-left">
                <div className="flex items-center gap-3 text-[#94a3b8] text-sm">
                  <Package size={18} className="text-[#6366f1]" />
                  <span>This token is eligible to automatically redeem and ship:</span>
                </div>
                <div className="mt-2 text-white font-mono bg-[#22222f] px-3 py-1.5 rounded border border-[#2e2e3e] inline-block">
                  ASIN: {selectedProduct.asin}
                </div>
                <div className="mt-1 text-xs text-[#64748b]">via Knot API</div>
              </div>
            </div>

            <button 
              onClick={handleReset}
              className="text-[#94a3b8] hover:text-white transition-colors text-sm font-medium px-6 py-3 rounded-full hover:bg-[#22222f] border border-transparent hover:border-[#2e2e3e]"
            >
              Return to Marketplace
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
