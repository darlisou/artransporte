import React, { useEffect, useRef } from 'react';

export default function NossasParadas() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const slides = [
      { badge:"Pará • Ponto de Partida",    title:"BELÉM",       desc:"A capital da Amazônia. Ponto de embarque com cultura, culinária e o maior mercado a céu aberto do mundo.", tag:"Ver o Mercado do Ver-o-Peso",  imgLeft:"https://images.unsplash.com/photo-1569288063643-5d29ad8a1e5d?w=1400&auto=format&fit=crop", imgRight:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop", objPos:"center 40%" },
      { badge:"Pará • 700km de Belém",  title:"SANTARÉM",    desc:"Onde o Rio Tapajós encontra o Amazonas. Praias de água doce e o famoso Alter do Chão.", tag:"Explorar Alter do Chão",          imgLeft:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&auto=format&fit=crop", imgRight:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop", objPos:"center 60%" },
      { badge:"Pará • O ponto mais estreito",   title:"ÓBIDOS",      desc:"O ponto mais estreito do Rio Amazonas com 1,7km de largura. Fortaleza histórica e arquitetura colonial.", tag:"Conhecer a Fortaleza",             imgLeft:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1400&auto=format&fit=crop", imgRight:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&auto=format&fit=crop", objPos:"center 50%" },
      { badge:"Amazonas • Capital do Boi", title:"PARINTINS",   desc:"A ilha do maior festival folclórico da Amazônia. Bumbá Garantido e Caprichoso encantam o mundo todo.", tag:"Descobrir o Festival",          imgLeft:"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&auto=format&fit=crop", imgRight:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop", objPos:"center 45%" },
      { badge:"Amazonas • 270km de Manaus",title:"ITACOATIARA",desc:"Segunda maior cidade do Amazonas. Famosa pelo festival de pesca e pela beleza às margens do Rio Amazonas.", tag:"Sentir a Cidade",                   imgLeft:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&auto=format&fit=crop", imgRight:"https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=600&auto=format&fit=crop", objPos:"center 55%" },
      { badge:"Amazonas • Destino Final",title:"MANAUS",   desc:"A capital da floresta. Teatro Amazonas, encontro das águas e porta de entrada para a Amazônia profunda.", tag:"Chegar a Manaus",               imgLeft:"https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=1400&auto=format&fit=crop", imgRight:"https://images.unsplash.com/photo-1569288063643-5d29ad8a1e5d?w=600&auto=format&fit=crop", objPos:"center 40%" }
    ];

    let curr = 0;
    const TOTAL = slides.length;
    const DURATION = 6000;
    let autoTimer: NodeJS.Timeout;

    const img1     = document.getElementById('img1') as HTMLImageElement;
    const img2     = document.getElementById('img2') as HTMLImageElement;
    const img3     = document.getElementById('img3') as HTMLImageElement;
    const badge    = document.getElementById('slideBadge') as HTMLElement;
    const number   = document.getElementById('slideNum') as HTMLElement;
    const title    = document.getElementById('slideTitle') as HTMLElement;
    const desc     = document.getElementById('slideDesc') as HTMLElement;
    const tag      = document.getElementById('slideTag') as HTMLElement;
    const counter  = document.getElementById('slideCounter') as HTMLElement;
    const prevBtn  = document.getElementById('slidePrev');
    const nextBtn  = document.getElementById('slideNext');
    const dots     = document.querySelectorAll('.pdot');
    const slider   = document.getElementById('paradasSlider');

    if (!img1 || !img2 || !img3 || !badge || !number || !title || !desc || !tag || !counter || !nextBtn || !prevBtn || !slider) return;

    function loadSlide(i: number, animate: boolean) {
      const s    = slides[i];
      const next = slides[(i + 1) % TOTAL];
      const next2 = slides[(i + 2) % TOTAL];

      if (animate) {
        [badge,number,title,desc,tag].forEach(el => {
          el.style.transition = 'opacity 250ms ease, transform 250ms ease';
          el.style.opacity = '0';
          el.style.transform = 'translateX(-32px)';
        });
        setTimeout(() => {
          setContent(i);
          [badge,number,title,desc,tag].forEach(el => {
            el.style.transform = 'translateX(32px)';
            el.style.opacity = '0';
          });
          requestAnimationFrame(() => requestAnimationFrame(() => {
            [badge,number,title,desc,tag].forEach((el, idx) => {
              el.style.transition = `opacity 480ms ${idx*60}ms cubic-bezier(0.16,1,0.3,1), transform 480ms ${idx*60}ms cubic-bezier(0.16,1,0.3,1)`;
              el.style.opacity = '1';
              el.style.transform = 'translateX(0)';
            });
          }));
        }, 260);
      } else {
        setContent(i);
      }

      img1.src  = s.imgLeft;
      img1.style.objectPosition = s.objPos;
      img2.src = next.imgLeft;
      img3.src = next2.imgLeft;
      dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
      counter.textContent = String(i+1).padStart(2,'0') + ' / 0' + TOTAL;
    }

    function setContent(i: number) {
      const s = slides[i];
      badge.textContent  = s.badge;
      number.textContent = s.title; // Replace number with city name
      title.textContent  = s.title;
      desc.textContent   = s.desc;
      tag.textContent    = s.tag;
    }

    function goPrev() {
      curr = (curr - 1 + TOTAL) % TOTAL;
      loadSlide(curr, true);
      restartAuto();
    }

    function goNext() {
      curr = (curr + 1) % TOTAL;
      loadSlide(curr, true);
      restartAuto();
    }

    const handlePrevClick = () => goPrev();
    const handleNextClick = () => goNext();
    prevBtn.addEventListener('click', handlePrevClick);
    nextBtn.addEventListener('click', handleNextClick);
    
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    card2?.addEventListener('click', handleNextClick);
    card3?.addEventListener('click', handleNextClick);
    
    const handleDotClick = (i: number) => {
      if (i !== curr) { curr = i; loadSlide(curr, true); restartAuto(); }
    };
    
    const dotListeners: (() => void)[] = [];
    dots.forEach((d,i) => {
      const listener = () => handleDotClick(i);
      dotListeners.push(listener);
      d.addEventListener('click', listener);
    });
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const r = slider.getBoundingClientRect();
      const visible = r.top < window.innerHeight && r.bottom > 0;
      if (!visible) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };
    document.addEventListener('keydown', handleKeyDown);
    
    let tx = 0;
    const handleTouchStart = (e: TouchEvent) => { tx = e.touches[0].clientX; };
    const handleTouchEnd = (e: TouchEvent) => { 
      const diff = tx - e.changedTouches[0].clientX;
      if (diff > 50)  goNext();
      if (diff < -50) goPrev();
    };
    slider.addEventListener('touchstart', handleTouchStart, {passive:true});
    slider.addEventListener('touchend', handleTouchEnd, {passive:true});
    
    const handleMouseEnter = () => clearTimeout(autoTimer);
    const handleMouseLeave = () => restartAuto();
    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    function restartAuto() {
      clearTimeout(autoTimer);
      autoTimer = setTimeout(goNext, DURATION);
    }

    loadSlide(0, false);
    restartAuto();

    return () => {
      clearTimeout(autoTimer);
      prevBtn.removeEventListener('click', handlePrevClick);
      nextBtn.removeEventListener('click', handleNextClick);
      card2?.removeEventListener('click', handleNextClick);
      card3?.removeEventListener('click', handleNextClick);
      document.removeEventListener('keydown', handleKeyDown);
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchend', handleTouchEnd);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      dots.forEach((d, i) => d.removeEventListener('click', dotListeners[i]));
    };
  }, []);

  return (
    <section id="viagens" ref={sectionRef}>
      <style dangerouslySetInnerHTML={{__html: `
        /* Section wrapper — uses same horizontal padding as the rest of the site */
        #viagens {
          padding-top: 80px;
          padding-bottom: 120px;
        }

        /* ── HEADER — respects the invisible line ── */
        .paradas-header {
          /* padding handled by global CSS */
          max-width: 1280px;
          margin: 0 auto 24px auto;
        }
        .paradas-header h2 {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .paradas-header p {
          font-size: 15px;
          opacity: 0.45;
          margin-top: 6px;
          color: var(--text-secondary);
        }
        @media (max-width: 1024px) { .paradas-header { /* padding handled by global CSS */ } }
        @media (max-width: 768px)  { .paradas-header { /* padding handled by global CSS */ } }

        /* ── SLIDER — full-width, cinematic, cards breathe ── */
        .paradas-slider {
          display: flex;
          align-items: center;
          height: 420px;
          /* padding handled by global CSS */
          gap: 14px;
          position: relative;
          overflow: hidden;       /* clips card 3 at right edge */
        }
        @media (max-width: 1024px) {
          .paradas-slider { height: 360px; gap: 10px; }
        }
        @media (max-width: 768px) {
          .paradas-slider { height: 300px; gap: 8px; }
        }

        /* ── CARD 1 — 68%, dominant, full focus ── */
        .slide-card-1 {
          flex-shrink: 0;
          width: 68%;
          height: 420px;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 24px 64px rgba(0,0,0,0.45);
          z-index: 2;
        }
        @media (max-width: 1024px) { .slide-card-1 { height: 360px; width: 68%; } }
        @media (max-width: 768px)  { .slide-card-1 { height: 300px; width: 76%; border-radius: 18px; } }

        /* ── CARD 2 — 22%, support, clearly smaller ── */
        .slide-card-2 {
          flex-shrink: 0;
          width: 22%;
          height: 310px;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          opacity: 0.65;
          box-shadow: 0 12px 32px rgba(0,0,0,0.28);
          cursor: pointer;
          z-index: 1;
          isolation: isolate;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .slide-card-2:hover { opacity: 0.88; transform: scale(1.02); }
        @media (max-width: 1024px) { .slide-card-2 { height: 265px; width: 23%; } }
        @media (max-width: 768px)  { .slide-card-2 { height: 220px; width: 20%; opacity: 0.5; border-radius: 14px; } }

        /* ── CARD 3 — ~8% visible, just a hint, cut by right edge ── */
        .slide-card-3 {
          flex-shrink: 0;
          width: 10%;
          height: 210px;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          opacity: 0.38;
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
          cursor: pointer;
          z-index: 1;
          isolation: isolate;
          filter: blur(0.8px);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        .slide-card-3:hover { opacity: 0.6; filter: blur(0); }
        @media (max-width: 768px) { .slide-card-3 { display: none; } }

        /* All card images */
        .slide-card-1 img,
        .slide-card-2 img,
        .slide-card-3 img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        /* ── OVERLAY — only on card 1 ── */
        .slide-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.88) 0%,
            rgba(0,0,0,0.28) 50%,
            transparent 72%
          );
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 36px 40px;
        }

        .slide-number {
          display: none; /* Hide the large background number */
        }
        .slide-badge {
          font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.12em; color: rgba(255,255,255,0.55);
          font-weight: 600; margin-bottom: 10px;
        }
        .slide-title {
          position: absolute;
          top: 36px;
          left: 40px;
          font-size: clamp(32px, 4vw, 56px); font-weight: 900;
          color: #fff; letter-spacing: -0.03em;
          line-height: 1; margin-bottom: 0;
        }
        .slide-desc {
          font-size: 14px; color: rgba(255,255,255,0.60);
          max-width: 340px; line-height: 1.7; margin-bottom: 20px;
        }
        .slide-tag {
          display: inline-flex; align-items: center;
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 999px; padding: 9px 20px;
          font-size: 13px; color: #fff; text-decoration: none;
          width: fit-content;
          transition: background 0.2s, border-color 0.2s;
        }
        .slide-tag:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.5);
        }

        /* Counter inside card 1 */
        .slide-counter {
          position: absolute; bottom: 18px; right: 20px;
          font-size: 12px; font-weight: 700;
          color: rgba(255,255,255,0.28); letter-spacing: 0.06em;
        }

        /* ── REMOVE any floating button ON the slider ── */
        .slide__next { display: none; }

        /* ── CONTROLS ROW — below slider ── */
        .paradas-controls {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
          /* padding handled by global CSS */
        }
        @media (max-width: 1024px) { .paradas-controls { /* padding handled by global CSS */ } }
        @media (max-width: 768px)  { .paradas-controls { gap: 14px; } }

        /* Prev / Next buttons */
        .paradas-btn {
          position: relative;
          z-index: 10;
          width: 44px; height: 44px;   /* Apple HIG minimum touch target */
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.15);
          background: transparent;
          color: inherit;
          font-size: 16px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s ease, border-color 0.2s ease,
                      transform 0.2s ease;
        }
        .paradas-btn:hover {
          background: rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.3);
          transform: scale(1.08);
        }
        .paradas-btn:disabled {
          opacity: 0.25;
          cursor: not-allowed;
          transform: none;
        }

        /* Dots */
        .paradas-dots {
          display: flex; align-items: center;
          gap: 8px;
        }
        .pdot {
          width: 6px; height: 6px; border-radius: 999px;
          background: currentColor; opacity: 0.22;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .pdot.active { width: 22px; opacity: 1; }

        /* Dark mode — invert button border */
        [data-theme="dark"] .paradas-btn {
          border-color: rgba(255,255,255,0.2);
        }
        [data-theme="dark"] .paradas-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.4);
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}} />

      <div className="paradas-header">
        <h2 data-animate>Nossas Paradas</h2>
        <p data-animate>De Belém a Manaus, cada parada é uma nova experiência</p>
      </div>

      <div className="paradas-slider" id="paradasSlider">

        <div className="slide-card-1" id="card1">
          <img id="img1" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="" referrerPolicy="no-referrer" />
          <div className="slide-overlay">
            <span className="slide-number"  id="slideNum"></span>
            <span className="slide-badge"   id="slideBadge"></span>
            <h2  className="slide-title"    id="slideTitle"></h2>
            <p   className="slide-desc"     id="slideDesc"></p>
            <a   className="slide-tag"      id="slideTag" href="#"></a>
          </div>
          <div className="slide-counter" id="slideCounter">01 / 06</div>
        </div>

        <div className="slide-card-2" id="card2">
          <img id="img2" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="" referrerPolicy="no-referrer" />
        </div>

        <div className="slide-card-3" id="card3">
          <img id="img3" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="paradas-controls">
        <button type="button" className="paradas-btn" id="slidePrev" aria-label="Cidade anterior">&#8592;</button>
        <div className="paradas-dots" id="paradasDots">
          <span className="pdot active"></span>
          <span className="pdot"></span>
          <span className="pdot"></span>
          <span className="pdot"></span>
          <span className="pdot"></span>
          <span className="pdot"></span>
        </div>
        <button type="button" className="paradas-btn" id="slideNext" aria-label="Próxima cidade">&#8594;</button>
      </div>
    </section>
  );
}
