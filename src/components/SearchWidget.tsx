import { MapPin, Calendar, Search, X, Navigation, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { matchCity, Cidade, buscarViagens, NAVIOS } from '../lib/itinerary';

interface SearchWidgetProps {
  onClose: () => void;
}

function formatData(d: Date) {
  const dia = d.getDate().toString().padStart(2, '0');
  const mes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][d.getMonth()];
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${dia} de ${mes}, ${h}:${m}`;
}

function CityInput({ 
  label, 
  icon: Icon, 
  value, 
  exclude, 
  onSelect, 
  placeholder 
}: { 
  label: string, 
  icon: any, 
  value: Cidade | null, 
  exclude: Cidade | null, 
  onSelect: (c: Cidade | null) => void, 
  placeholder: string 
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [foc, setFoc] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inp = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => matchCity(q, exclude), [q, exclude]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setFoc(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  function pick(c: Cidade) {
    onSelect(c);
    setQ("");
    setOpen(false);
    setFoc(false);
    inp.current?.blur();
  }

  return (
    <div ref={ref} className="relative flex-1 w-full">
      <div 
        className="flex items-center gap-3 p-2 md:px-4 rounded-xl bg-white/15 border-[0.5px] border-white/30 transition-all cursor-text w-full hover:bg-white/25" 
        onClick={() => { if (!value) inp.current?.focus(); }}
      >
        <Icon className="w-5 h-5 text-[#003DA5] shrink-0" />
        <div className="flex flex-col w-full min-w-0">
          <span className="text-[11px] uppercase tracking-wider text-[#003DA5] font-extrabold">{label}</span>
          <div className="flex items-center w-full">
            <input 
              ref={inp}
              type="text" 
              placeholder={value ? `${value.e} ${value.n}` : placeholder}
              value={foc && !value ? q : ""}
              onChange={e => { if (!value) { setQ(e.target.value); setOpen(true); } }}
              onFocus={() => { setFoc(true); if (!value) setOpen(true); setQ(""); }}
              readOnly={!!value}
              className={`bg-transparent border-none outline-none text-white font-extrabold placeholder:text-white/90 placeholder:[text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] w-full text-[15px] [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] truncate ${value ? 'cursor-default' : ''}`}
            />
            {value && (
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); onSelect(null); setQ(""); setTimeout(() => inp.current?.focus(), 50); }}
                className="ml-2 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && foc && !value && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-[calc(100%+8px)] left-0 w-full md:w-[120%] bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto p-2"
          >
            {matches.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500 font-medium">🔍 Nenhuma cidade encontrada</div>
            )}
            {matches.map((c) => (
              <button 
                key={c.id}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); pick(c); }}
                className="w-full flex items-center gap-3 p-3 hover:bg-[#003DA5]/10 rounded-xl transition-colors text-left"
              >
                <span className="text-xl w-6 text-center">{c.e}</span>
                <span className="text-[10px] font-bold text-[#003DA5] bg-[#003DA5]/10 px-2 py-1 rounded-md font-mono">{c.id}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">{c.n}</span>
                  <span className="text-xs text-gray-500 font-medium">{c.uf}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const MS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function getMeses() {
  const n = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(n.getFullYear(), n.getMonth() + i, 1);
    return { y: d.getFullYear(), m: d.getMonth() };
  });
}

function MonthInput({ 
  value, 
  onSelect 
}: { 
  value: { y: number, m: number }, 
  onSelect: (m: { y: number, m: number }) => void 
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const meses = useMemo(() => getMeses(), []);
  const now = new Date();

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const curM = value.y === now.getFullYear() && value.m === now.getMonth();

  return (
    <div ref={ref} className="relative flex-1 w-full">
      <button 
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 p-2 md:px-4 rounded-xl bg-white/15 border-[0.5px] border-white/30 transition-all cursor-pointer w-full hover:bg-white/25 text-left"
      >
        <Calendar className="w-5 h-5 text-[#003DA5] shrink-0" />
        <div className="flex flex-col w-full min-w-0">
          <span className="text-[11px] uppercase tracking-wider text-[#003DA5] font-extrabold">Mês da Viagem</span>
          <div className="flex items-center w-full">
            <span className="bg-transparent border-none outline-none text-white font-extrabold w-full text-[15px] [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] truncate">
              {MESES[value.m]} {value.y}
            </span>
            {curM && <span className="text-[9px] font-bold text-[#30D158] bg-[#30D158]/20 px-1.5 py-0.5 rounded ml-2 border border-[#30D158]/30">ATUAL</span>}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-[calc(100%+8px)] right-0 md:left-0 w-full md:w-[280px] bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl z-50 p-3"
          >
            <div className="grid grid-cols-3 gap-2">
              {meses.map((m, i) => {
                const sel = m.y === value.y && m.m === value.m;
                const isCur = m.y === now.getFullYear() && m.m === now.getMonth();
                return (
                  <button 
                    key={i}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onSelect(m); setOpen(false); }}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all relative ${sel ? 'bg-[#003DA5]/10 border-[#003DA5]/30 text-[#003DA5]' : 'bg-black/5 border-black/5 text-gray-600 hover:bg-black/10'}`}
                  >
                    <span className="text-sm font-bold">{MS[m.m]}</span>
                    <span className="text-[10px] opacity-60">{m.y}</span>
                    {isCur && <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#30D158]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SearchWidget({ onClose }: SearchWidgetProps) {
  const [origem, setOrigem] = useState<Cidade | null>(null);
  const [destino, setDestino] = useState<Cidade | null>(null);
  const [data, setData] = useState({ y: new Date().getFullYear(), m: new Date().getMonth() });
  
  const [resultados, setResultados] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!origem || !destino) return;
    const res = buscarViagens(origem.id, destino.id, data.y, data.m);
    setResultados(res);
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full max-w-4xl flex flex-col gap-4 pointer-events-auto"
      >
        <div className="bg-white/10 backdrop-blur-xl saturate-150 border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.4)] rounded-[24px] md:rounded-full p-4 md:p-2.5 md:pl-7 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
          {/* Close button */}
          <button 
            type="button"
            onClick={onClose}
            className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 md:p-2 backdrop-blur-md border border-white/20 transition-colors z-40"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="flex flex-col md:flex-row items-center flex-1 w-full gap-2 md:gap-0">
            <CityInput 
              label="Saindo de" 
              icon={Navigation} 
              value={origem} 
              exclude={destino} 
              onSelect={(c) => { setOrigem(c); setHasSearched(false); }} 
              placeholder="Origem?" 
            />

            <div className="hidden md:block w-px h-8 bg-white/20 mx-1"></div>
            <div className="md:hidden w-full h-px bg-white/20 my-1"></div>

            <CityInput 
              label="Para onde" 
              icon={MapPin} 
              value={destino} 
              exclude={origem} 
              onSelect={(c) => { setDestino(c); setHasSearched(false); }} 
              placeholder="Destino?" 
            />

            <div className="hidden md:block w-px h-8 bg-white/20 mx-1"></div>
            <div className="md:hidden w-full h-px bg-white/20 my-1"></div>

            <MonthInput value={data} onSelect={(d) => { setData(d); setHasSearched(false); }} />
          </div>

          <button 
            type="button"
            onClick={handleSearch}
            disabled={!origem || !destino}
            className="w-full md:w-auto bg-[#003DA5] text-white rounded-full px-7 py-3.5 font-semibold flex items-center justify-center gap-2 hover:bg-[#005bb5] hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all shrink-0 md:ml-4 shadow-md"
          >
            <span>Buscar</span>
            <Search className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence>
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden flex flex-col"
              style={{ maxHeight: '50vh' }}
            >
              <div className="p-4 bg-gray-50 border-b flex items-center justify-between sticky top-0 z-10">
                <h3 className="font-bold text-[#003DA5]">Viagens Encontradas</h3>
                <span className="text-sm text-gray-500 font-medium">{resultados.length} resultados</span>
              </div>
              <div className="p-4 overflow-y-auto flex flex-col gap-3">
                {resultados.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Nenhuma viagem encontrada para este trajeto e mês.
                  </div>
                ) : (
                  resultados.map((r, i) => {
                    const navio = NAVIOS[r.navio];
                    return (
                      <div key={i} className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 md:items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{navio.ic}</span>
                            <span className="font-bold text-gray-900">{navio.nome}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase tracking-wider">{navio.tipo}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <span className="font-medium text-[#003DA5]">{formatData(r.dataSaida)}</span>
                            <span className="text-gray-300">→</span>
                            <span className="font-medium text-[#003DA5]">{formatData(r.dataChegada)}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Duração Estimada</span>
                          <span className="font-bold text-gray-700">{r.duracaoHoras} horas</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
