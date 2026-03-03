/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import MobileHome from './components/MobileHome';

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('animated');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    
    const mo = new MutationObserver(() => {
      document.querySelectorAll('[data-animate]:not(.animated)').forEach(el => observer.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#007AFF] selection:text-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <MobileHome />
    </div>
  );
}

