import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ship, Home, Map, Package, CalendarCheck, Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenViagens }: { onOpenViagens: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [pressedLink, setPressedLink] = useState<string | null>(null);

  useEffect(() => {
    // Always start at home on load
    window.scrollTo(0, 0);
    setActiveSection('hero');
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (entry.target.id === 'reservar') {
              const bookingForm = document.getElementById('booking-form');
              if (bookingForm) {
                bookingForm.classList.remove('pulse-highlight');
                // Trigger reflow
                void bookingForm.offsetWidth;
                bookingForm.classList.add('pulse-highlight');
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['hero', 'viagens', 'frete-naval'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'hero', name: 'Início', icon: Home },
    { id: 'viagens', name: 'Viagens', icon: Map },
    { id: 'frete-naval', name: 'Frete Naval', icon: Package },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setPressedLink(id);
    
    setTimeout(() => {
      setPressedLink(null);
      setIsMobileMenuOpen(false);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <header 
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
          scrolled 
            ? 'border-b' 
            : 'bg-transparent border-b border-transparent'
        }`}
        style={scrolled ? { 
          background: 'var(--bg-navbar)',
          borderColor: 'var(--border-color)',
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)' 
        } : {}}
      >
        <div className="navbar-inner h-[80px] md:h-[96px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
            const el = document.getElementById('hero');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            <img 
              src="https://i.ibb.co/WNFFF998/unnamed-Photoroom.png" 
              alt="AR Transporte Logo" 
              className="h-16 md:h-20 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav */}
          <nav 
            className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 transition-all duration-400"
            style={{
              background: scrolled ? 'transparent' : 'var(--bg-pill)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '22px',
              border: scrolled ? 'none' : '1px solid var(--border-color)',
              boxShadow: scrolled ? 'none' : 'inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 12px rgba(0,0,0,0.10)',
              padding: '5px 6px',
              gap: '2px',
              height: '44px'
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const isPressed = pressedLink === link.id;
              
              return (
                <a 
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="relative flex items-center justify-center transition-all group"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.88)' : 'transparent',
                    borderRadius: '16px',
                    padding: '7px 12px',
                    boxShadow: isActive ? 'inset 0 1.5px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.20)' : 'none',
                    transform: isPressed ? 'scale(0.94)' : 'scale(1)',
                    opacity: isActive ? 1 : 0.55,
                    transition: 'all 0.25s ease-out, opacity 0.15s ease, transform 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.opacity = '0.80';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.opacity = '0.55';
                    }
                  }}
                >
                  <div className="flex items-center gap-[6px]">
                    <link.icon className={`w-[16px] h-[16px] ${isActive ? 'text-[#003DA5]' : (scrolled ? 'text-[var(--text-primary)]' : 'text-white')}`} strokeWidth={2} />
                    <span className={`text-[13px] font-semibold tracking-wide ${isActive ? 'text-[#003DA5]' : (scrolled ? 'text-[var(--text-primary)]' : 'text-white')}`}>
                      {link.name}
                    </span>
                  </div>
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button 
              id="theme-toggle" 
              className="hidden md:flex"
              aria-label="Alternar tema" 
              onClick={() => setIsDark(!isDark)}
              style={{background:'transparent',border:'none',cursor:'pointer',width:'44px',height:'44px',alignItems:'center',justifyContent:'center',position:'relative',padding:0,flexShrink:0}}
            >
              {!isDark && <Moon size={22} style={{position:'absolute'}} />}
              {isDark && <Sun size={22} style={{position:'absolute'}} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ 
              background: 'var(--bg-navbar)',
              backdropFilter: 'blur(12px)', 
              WebkitBackdropFilter: 'blur(12px)' 
            }}
          >
            <div className="px-6 h-[64px] flex items-center justify-end">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ color: 'var(--text-primary)', background: 'var(--bg-card)' }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="flex flex-col items-center gap-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <link.icon className="w-8 h-8 text-[#003DA5]" strokeWidth={1.5} />
                  <span className="text-[24px] font-medium">{link.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Configurações Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="w-full px-8 pb-12 mt-auto"
            >
              <div className="text-[12px] font-bold uppercase tracking-wider mb-4 opacity-50" style={{ color: 'var(--text-primary)' }}>
                Configurações
              </div>
              <div 
                className="flex items-center justify-between w-full py-4 border-t"
                style={{ borderColor: 'rgba(150,150,150,0.2)' }}
              >
                <span className="text-[18px] font-medium" style={{ color: 'var(--text-primary)' }}>Aparência</span>
                <button 
                  id="theme-toggle-mobile" 
                  aria-label="Alternar tema" 
                  onClick={() => setIsDark(!isDark)}
                  style={{background:'transparent',border:'none',cursor:'pointer',width:'44px',height:'44px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',padding:0,flexShrink:0}}
                >
                  {!isDark && <Moon size={22} style={{position:'absolute', color: 'var(--text-primary)'}} />}
                  {isDark && <Sun size={22} style={{position:'absolute', color: 'var(--text-primary)'}} />}
                </button>
              </div>
              <button 
                className="flex items-center justify-between w-full py-4 border-t"
                style={{ borderColor: 'rgba(150,150,150,0.2)', color: '#EF4444' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-[18px] font-medium">Sair</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
