export interface Cidade {
  id: string;
  n: string;
  uf: string;
  e: string;
  alt: string[];
}

export const CIDADES: Cidade[] = [
  { id:"BEL", n:"Belém",        uf:"PA", e:"🏛️", alt:["belem","belém","bel"] },
  { id:"BRE", n:"Breves",       uf:"PA", e:"🌿", alt:["breves","bre"] },
  { id:"GUR", n:"Gurupá",       uf:"PA", e:"🌊", alt:["gurupa","gurupá","gur"] },
  { id:"ALM", n:"Almeirim",     uf:"PA", e:"🏞️", alt:["almeirim","alm"] },
  { id:"PRA", n:"Prainha",      uf:"PA", e:"🏖️", alt:["prainha","pra"] },
  { id:"MTA", n:"Monte Alegre", uf:"PA", e:"⛰️", alt:["monte alegre","montealegre","mta","monte"] },
  { id:"STM", n:"Santarém",     uf:"PA", e:"🌅", alt:["santarem","santarém","stm","santa"] },
  { id:"OBI", n:"Óbidos",       uf:"PA", e:"🏰", alt:["obidos","óbidos","obi"] },
  { id:"JUR", n:"Juruti",       uf:"PA", e:"🦜", alt:["juruti","jur"] },
  { id:"PAR", n:"Parintins",    uf:"AM", e:"🐂", alt:["parintins","par"] },
  { id:"ITA", n:"Itacoatiara",  uf:"AM", e:"🪨", alt:["itacoatiara","ita"] },
  { id:"MAO", n:"Manaus",       uf:"AM", e:"🎭", alt:["manaus","mao"] },
];

export function norm(s: string) { 
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(); 
}

export function matchCity(q: string, exc: Cidade | null) {
  if(!q||!q.trim()) return CIDADES.filter(c=>!exc||c.id!==exc.id);
  const t=norm(q.trim());
  return CIDADES.filter(c=>{
    if(exc&&c.id===exc.id) return false;
    return norm(c.n).includes(t)||norm(c.id).startsWith(t)||c.alt.some(a=>norm(a).startsWith(t));
  });
}

// ═══════════════════════════════════════════════════════════════
// ITINERÁRIO OFICIAL — DADOS EXATOS DA PLANILHA "Dias De Viagem"
// ═══════════════════════════════════════════════════════════════

const QUA=0, QUI=24, SEX=48, SAB=72, DOM=96, SEG=120;

const SUBINDO = [
  { cidadeIdx: 0,  cheg: null,       said: QUA+18    }, // BEL  saída Qua 18:00
  { cidadeIdx: 1,  cheg: QUI+9,      said: QUI+9.33  }, // BRE  Qui 09:00 → 09:20
  { cidadeIdx: 2,  cheg: QUI+21.5,   said: QUI+22    }, // GUR  Qui 21:30 → 22:00
  { cidadeIdx: 3,  cheg: SEX+5,      said: SEX+6     }, // ALM  Sex 05:00 → 06:00
  { cidadeIdx: 4,  cheg: SEX+13,     said: SEX+13.33 }, // PRA  Sex 13:00 → 13:20
  { cidadeIdx: 5,  cheg: SEX+18,     said: SEX+19    }, // MTA  Sex 18:00 → 19:00
  { cidadeIdx: 6,  cheg: SAB+3,      said: SAB+12    }, // STM  Sáb 03:00 → 12:00 (pernoite)
  { cidadeIdx: 7,  cheg: SAB+20,     said: SAB+20.5  }, // OBI  Sáb 20:00 → 20:30
  { cidadeIdx: 8,  cheg: DOM+2,      said: DOM+3     }, // JUR  Dom 02:00 → 03:00
  { cidadeIdx: 9,  cheg: DOM+9,      said: DOM+12    }, // PAR  Dom 09:00 → 12:00
  { cidadeIdx: 10, cheg: SEG+5,      said: SEG+5.5   }, // ITA  Seg 05:00 → 05:30
  { cidadeIdx: 11, cheg: SEG+17.5,   said: null      }, // MAO  Seg 17:30 (chegada)
];

const DESCENDO = [
  { cidadeIdx: 11, cheg: null,       said: QUA+11    }, // MAO  saída Qua 11:00
  { cidadeIdx: 10, cheg: QUA+19,     said: QUA+19.5  }, // ITA  Qua 19:00 → 19:30
  { cidadeIdx: 9,  cheg: QUI+5,      said: QUI+5.5   }, // PAR  Qui 05:00 → 05:30
  { cidadeIdx: 8,  cheg: QUI+11,     said: QUI+12    }, // JUR  Qui 11:00 → 12:00
  { cidadeIdx: 7,  cheg: QUI+16,     said: QUI+17    }, // OBI  Qui 16:00 → 17:00
  { cidadeIdx: 6,  cheg: QUI+23,     said: SEX+11    }, // STM  Qui 23:00 → Sex 11:00 (pernoite)
  { cidadeIdx: 5,  cheg: SEX+15.5,   said: SEX+16    }, // MTA  Sex 15:30 → 16:00
  { cidadeIdx: 4,  cheg: SEX+20,     said: SEX+20.5  }, // PRA  Sex 20:00 → 20:30
  { cidadeIdx: 3,  cheg: SAB+1.5,    said: SAB+2     }, // ALM  Sáb 01:30 → 02:00
  { cidadeIdx: 2,  cheg: SAB+7,      said: SAB+7.5   }, // GUR  Sáb 07:00 → 07:30
  { cidadeIdx: 1,  cheg: SAB+18,     said: SAB+18.5  }, // BRE  Sáb 18:00 → 18:30
  { cidadeIdx: 0,  cheg: DOM+7,      said: null      }, // BEL  Dom 07:00 (chegada)
];

export const NAVIOS: Record<string, { nome: string; cor: string; ic: string; tipo: string }> = {
  amazon_star:  { nome:"N/M Amazon Star",   cor:"#0A84FF", ic:"⭐", tipo:"Navio Motor" },
  cat_rondonia: { nome:"F/B Cat. Rondônia", cor:"#30D158", ic:"🛳️", tipo:"Ferry Boat" },
};

const REF_DATE = new Date(2026, 0, 9);
function weekNum(d: Date) {
  const a=new Date(d); a.setHours(0,0,0,0);
  const b=new Date(REF_DATE); b.setHours(0,0,0,0);
  return Math.floor((a.getTime()-b.getTime())/(7*864e5));
}

export function getShipSchedule(d: Date) {
  const even = weekNum(d)%2===0;
  return { amazon_star: even?"descendo":"subindo", cat_rondonia: even?"subindo":"descendo" };
}

function offsetToDate(quarta: Date, offsetHoras: number | null) {
  if (offsetHoras === null) return null;
  const h = Math.floor(offsetHoras);
  const m = Math.round((offsetHoras - h) * 60);
  const d = new Date(quarta);
  d.setHours(0, 0, 0, 0);
  d.setTime(d.getTime() + h * 3600000 + m * 60000);
  return d;
}

function gerarEscalas(origemIdx: number, destinoIdx: number, quarta: Date) {
  const sub = origemIdx < destinoIdx;
  const tabela = sub ? SUBINDO : DESCENDO;

  const escalas = [];
  let dentro = false;
  for (const stop of tabela) {
    if (stop.cidadeIdx === origemIdx) dentro = true;
    if (dentro) {
      escalas.push({
        cidade: CIDADES[stop.cidadeIdx],
        chegada: offsetToDate(quarta, stop.cheg),
        saida: offsetToDate(quarta, stop.said),
        isOrigem: stop.cidadeIdx === origemIdx,
        isDestino: stop.cidadeIdx === destinoIdx,
      });
    }
    if (stop.cidadeIdx === destinoIdx) break;
  }
  return escalas;
}

function getSextasFeiras(ano: number, mes: number) {
  const r=[]; const d=new Date(ano,mes,1);
  while(d.getDay()!==5) d.setDate(d.getDate()+1);
  while(d.getMonth()===mes){ r.push(new Date(d)); d.setDate(d.getDate()+7); }
  return r;
}

export function buscarViagens(origemId: string, destinoId: string, ano: number, mes: number) {
  const oi=CIDADES.findIndex(c=>c.id===origemId);
  const di=CIDADES.findIndex(c=>c.id===destinoId);
  if(oi===-1||di===-1||oi===di) return [];

  const direcao = oi<di ? "subindo" : "descendo";
  const hoje=new Date(); hoje.setHours(0,0,0,0);
  const resultado=[];

  for (const sexta of getSextasFeiras(ano, mes)) {
    const escala = getShipSchedule(sexta);
    let navio = null;
    if (escala.amazon_star===direcao) navio="amazon_star";
    else if (escala.cat_rondonia===direcao) navio="cat_rondonia";
    if (!navio) continue;

    const quarta = new Date(sexta);
    quarta.setDate(quarta.getDate()-2);

    const escalas = gerarEscalas(oi, di, quarta);
    if (escalas.length<2) continue;

    const primeira = escalas[0];
    const ultima = escalas[escalas.length-1];
    const saida = primeira.saida || primeira.chegada;
    const chegada = ultima.chegada || ultima.saida;

    if (!saida || saida < hoje) continue;

    const horas = saida&&chegada ? Math.round((chegada.getTime()-saida.getTime())/36e5) : 0;
    resultado.push({ dataSaida:saida, dataChegada:chegada, navio, direcao, duracaoHoras:horas, escalas });
  }
  return resultado;
}
