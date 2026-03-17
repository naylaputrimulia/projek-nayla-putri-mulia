import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { History, Plus, ChevronLeft, ChevronRight, Wallet, TrendingUp } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';

// --- Data Awal Target Bank ---
const INITIAL_TARGETS = [
  {
    id: 1,
    title: 'MacBook Pro M3',
    description: 'Tabungan untuk upgrade alat kerja demi produktivitas coding yang lebih gahar.',
    targetAmount: 25000000,
    currentAmount: 12500000,
    image: '💻',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 2,
    title: 'Dana Darurat',
    description: 'Simpanan wajib untuk keamanan finansial dan dana siaga jangka panjang.',
    targetAmount: 15000000,
    currentAmount: 13500000,
    image: '🛡️',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 3,
    title: 'Liburan ke Jepang',
    description: 'Target refreshing dan self-reward setelah rilis proyek portofolio besar.',
    targetAmount: 20000000,
    currentAmount: 4000000,
    image: '🌸',
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 4,
    title: 'AI Content Server',
    description: 'Membangun server lokal untuk menjalankan model AI language secara mandiri.',
    targetAmount: 30000000,
    currentAmount: 5000000,
    image: '🤖',
    color: 'from-green-500/20 to-teal-500/20',
  },
];

export default function BankSection() {
  const [targets, setTargets] = useState(INITIAL_TARGETS);

  // Fungsi Tambah Saldo (Simulasi +500rb per klik)
  const handleTabung = (id) => {
    setTargets(prev => prev.map(item => {
      if (item.id === id && item.currentAmount < item.targetAmount) {
        return { ...item, currentAmount: Math.min(item.currentAmount + 500000, item.targetAmount) };
      }
      return item;
    }));
  };

  // Setup Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="bank-target" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Wallet className="h-4 w-4" />
            <span>Financial Goals</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Target Bank & Tabungan
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto group">
          
          <div className="overflow-hidden cursor-grab active:cursor-grabbing px-2" ref={emblaRef}>
            <div className="flex -ml-4">
              {targets.map((item) => {
                const progress = (item.currentAmount / item.targetAmount) * 100;
                
                return (
                  <div key={item.id} className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
                    <div className="h-full p-6 bg-background/50 backdrop-blur-sm border rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 mx-1 flex flex-col">
                      
                      {/* Image/Icon Area */}
                      <div className={`aspect-video rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${item.color} relative overflow-hidden`}>
                        <span className="text-6xl z-10">{item.image}</span>
                        <TrendingUp className="absolute right-4 bottom-4 h-12 w-12 text-black/5 -rotate-12" />
                      </div>
                      
                      {/* Content Area */}
                      <div className="flex-grow space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-display text-xl font-bold line-clamp-1">{item.title}</h3>
                          <span className="text-xs font-bold px-2 py-1 rounded-lg bg-primary/10 text-primary">
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                          {item.description}
                        </p>
                        
                        {/* Progress Bar Visual */}
                        <div className="space-y-2 pt-2">
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(progress, 100)}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-primary rounded-full"
                            />
                          </div>
                          <div className="flex justify-between text-[11px] font-medium">
                            <span className="text-foreground font-bold">Rp {item.currentAmount.toLocaleString('id-ID')}</span>
                            <span className="text-muted-foreground tracking-tighter">Target: Rp {item.targetAmount.toLocaleString('id-ID')}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-6">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 h-10 rounded-xl"
                          onClick={() => alert('Fitur riwayat segera hadir!')}
                        >
                          <History className="h-4 w-4 mr-2" />
                          Riwayat
                        </Button>
                        <Button 
                          size="sm" 
                          className={`flex-1 h-10 rounded-xl shadow-lg transition-all ${progress >= 100 ? 'bg-green-500 hover:bg-green-600' : ''}`}
                          onClick={() => handleTabung(item.id)}
                          disabled={progress >= 100}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          {progress >= 100 ? 'Tercapai' : 'Tabung'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons (Desktop) */}
          <button
            onClick={scrollPrev}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-background border shadow-lg p-3 rounded-full hidden md:flex hover:bg-primary hover:text-white transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-background border shadow-lg p-3 rounded-full hidden md:flex hover:bg-primary hover:text-white transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

        </div>
      </div>
    </section>
  );
}