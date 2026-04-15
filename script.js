document.querySelectorAll('.midia-card').forEach(c => {
  c.addEventListener('mouseenter', () => {
    document.querySelectorAll('.midia-card').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
  });
});

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 2px 24px rgba(0,0,0,0.45)' : 'none';
});


const BAIRROS = {
  "NITERÓI":       ["Centro","Icaraí","Ingá","Fonseca","Santa Rosa","Charitas","São Francisco","Jurujuba","Ponta d'Areia","Piratininga","Camboinhas","Itaipu","Maravista","Pendotiba","Largo da Batalha","Vital Brazil","Barreto","Cubango","Engenho do Mato"],
  "RIO DE JANEIRO":["Copacabana","Ipanema","Leblon","Barra da Tijuca","Botafogo","Flamengo","Centro","Lapa","Santa Teresa","Tijuca","Méier","Campo Grande","Madureira","Recreio","Jacarepaguá","Glória","Catete","Laranjeiras","Urca","Gávea","Humaitá"]
};


const POINTS = [
  { id:1,  modal:"LEDS",                     category:"ruas",       type:"led",         label:"LED DIGITAL",  title:"LED Praça Araribóia",               address:"Praça Araribóia, s/n, Centro",                    bairro:"Centro",         city:"NITERÓI",       specs:["4×3m","2 faces","80k/dia"],           icon:"📺", bg:"bg-led"          },
  { id:2,  modal:"EMPENAS",                  category:"ruas",       type:"empena",      label:"EMPENA",        title:"Empena Av. Amaral Peixoto",         address:"Av. Ernani do Amaral Peixoto, 150, Centro",       bairro:"Centro",         city:"NITERÓI",       specs:["12×8m","1 face","120k/dia"],          icon:"🏗️", bg:"bg-empena"        },
  { id:3,  modal:"TELAS DIGITAIS",           category:"shoppings",  type:"shopping",    label:"SHOPPING",      title:"Shopping Icaraí Plaza – Totem LED", address:"R. Álvares de Azevedo, 230, Icaraí",              bairro:"Icaraí",         city:"NITERÓI",       specs:["1.5×2m","4 faces","25k/dia"],         icon:"🛍️", bg:"bg-shopping"      },
  { id:4,  modal:"ELEVADORES",               category:"elevadores", type:"elevador",    label:"ELEVADOR",      title:"Elevador Res. Vila Rica",           address:"R. Desembargador Lima Castro, 300, Icaraí",       bairro:"Icaraí",         city:"NITERÓI",       specs:["Tela 21\"","1 face","300 mor"],       icon:"🏢", bg:"bg-elevador"      },
  { id:5,  modal:"LEDS",                     category:"ruas",       type:"led",         label:"LED DIGITAL",   title:"LED Ingá – Av. Jansen Müller",     address:"Av. Jansen Müller, 300, Ingá",                    bairro:"Ingá",           city:"NITERÓI",       specs:["8×4m","2 faces","80k/dia"],           icon:"📺", bg:"bg-led"          },
  { id:6,  modal:"LONAS",                    category:"ruas",       type:"led",         label:"LONA",          title:"Lona Fonseca Tower",                address:"Rua Lemos Cunha, 50, Fonseca",                    bairro:"Fonseca",        city:"NITERÓI",       specs:["6×3m","1 face","60k/dia"],            icon:"📋", bg:"bg-lona"         },
  { id:7,  modal:"TELAS DIGITAIS",           category:"shoppings",  type:"shopping",    label:"SHOPPING",      title:"Galeria do Rock Niterói",           address:"Rua Visconde de Sepetiba, 987, Centro",           bairro:"Centro",         city:"NITERÓI",       specs:["Painel 2×3m","2 faces","18k/dia"],    icon:"🛍️", bg:"bg-shopping"      },
  { id:8,  modal:"ELEVADORES",               category:"elevadores", type:"elevador",    label:"ELEVADOR",      title:"Elevador Ed. Charitas",             address:"Estrada Leopoldo Fróes, 700, Charitas",           bairro:"Charitas",       city:"NITERÓI",       specs:["Tela 32\"","2 faces","220 mor"],      icon:"🏢", bg:"bg-elevador"      },
  { id:9,  modal:"PUBLICIDADE EM DELIVERYS", category:"deliverys",  type:"restaurante", label:"RESTAURANTE",   title:"Mídia Boteco do Zé – Icaraí",      address:"Rua Gavião Peixoto, 112, Icaraí",                 bairro:"Icaraí",         city:"NITERÓI",       specs:["Cardápio LED","1 face","500 ref/dia"],icon:"🍽️", bg:"bg-restaurante"   },
  { id:10, modal:"PUBLICIDADE EM DELIVERYS", category:"comercios",  type:"restaurante", label:"RESTAURANTE",   title:"Mídia La Cantina – Centro",        address:"Rua da Conceição, 30, Centro",                    bairro:"Centro",         city:"NITERÓI",       specs:["Totem 55\"","2 faces","800 ref/dia"], icon:"🍽️", bg:"bg-restaurante"   },
  { id:11, modal:"LEDS",                     category:"ruas",       type:"led",         label:"LED DIGITAL",   title:"LED São Francisco – Costeira",     address:"Estrada Frei Gaspar, 1200, São Francisco",         bairro:"São Francisco",  city:"NITERÓI",       specs:["10×5m","1 face","95k/dia"],           icon:"📺", bg:"bg-led"          },
  { id:12, modal:"ELEVADORES",               category:"elevadores", type:"elevador",    label:"ELEVADOR",      title:"Elevador Cond. Vital Brazil",      address:"Rua Vital Brazil, 400, Vital Brazil",             bairro:"Vital Brazil",   city:"NITERÓI",       specs:["Tela 21\"","1 face","180 mor"],       icon:"🏢", bg:"bg-elevador"      },
  { id:13, modal:"LEDS",                     category:"ruas",       type:"led",         label:"LED DIGITAL",   title:"LED Copacabana – Princesa Isabel", address:"Av. Princesa Isabel, 500, Copacabana",            bairro:"Copacabana",     city:"RIO DE JANEIRO",specs:["12×6m","2 faces","200k/dia"],         icon:"📺", bg:"bg-led"          },
  { id:14, modal:"EMPENAS",                  category:"ruas",       type:"empena",      label:"EMPENA",        title:"Empena Botafogo Praia Shopping",   address:"Praia de Botafogo, 400, Botafogo",                bairro:"Botafogo",       city:"RIO DE JANEIRO",specs:["20×10m","1 face","300k/dia"],         icon:"🏗️", bg:"bg-empena"        },
  { id:15, modal:"TELAS DIGITAIS",           category:"shoppings",  type:"shopping",    label:"SHOPPING",      title:"BarraShopping – Painel Digital",   address:"Av. das Américas, 4666, Barra da Tijuca",         bairro:"Barra da Tijuca",city:"RIO DE JANEIRO",specs:["3×4m","6 faces","80k/dia"],          icon:"🛍️", bg:"bg-shopping"      },
  { id:16, modal:"PUBLICIDADE EM DELIVERYS", category:"deliverys",  type:"restaurante", label:"RESTAURANTE",   title:"Mídia Ipanema Food Hall",          address:"Rua Vinícius de Morais, 44, Ipanema",             bairro:"Ipanema",        city:"RIO DE JANEIRO",specs:["Totem 65\"","4 faces","1200 ref/dia"],icon:"🍽️", bg:"bg-restaurante"   },
  { id:17, modal:"ELEVADORES",               category:"elevadores", type:"elevador",    label:"ELEVADOR",      title:"Elevador Centro Empresarial",      address:"Av. Rio Branco, 1, Centro",                       bairro:"Centro",         city:"RIO DE JANEIRO",specs:["Tela 43\"","2 faces","1500 mor"],      icon:"🏢", bg:"bg-elevador"      },
  { id:18, modal:"LONAS",                    category:"ruas",       type:"led",         label:"LONA",          title:"Lona Leblon – Antero de Quental",  address:"Rua Antero de Quental, 20, Leblon",               bairro:"Leblon",         city:"RIO DE JANEIRO",specs:["8×4m","1 face","150k/dia"],           icon:"📋", bg:"bg-lona"         },
  // exemplos para abas sem pontos ainda (ficarão zeradas até adicionar pontos reais)
  { id:19, modal:"ADESIVOS",                 category:"bancas",     type:"banca",       label:"BANCA",         title:"Banca Icaraí – Rua Gavião",        address:"Rua Gavião Peixoto, 10, Icaraí",                  bairro:"Icaraí",         city:"NITERÓI",       specs:["Adesivo A3","1 face","2k/dia"],        icon:"📰", bg:"bg-lona"         },
  { id:20, modal:"ADESIVOS",                 category:"transportes",type:"transporte",  label:"TRANSPORTE",    title:"Ônibus Linha 33 – Icaraí/Centro",  address:"Av. Ernani do Amaral Peixoto, Centro",            bairro:"Centro",         city:"NITERÓI",       specs:["Traseira","1 face","40k/dia"],         icon:"🚌", bg:"bg-empena"       },
];


let state = {
  activeTab:       "todos",
  selectedCities:  [],
  selectedBairros: [],
  selectedModals:  [],
  selectedCards:   new Set(),
  showCards:       false,
};


const ALL_TABS = ["todos","ruas","shoppings","comercios","deliverys","bancas","elevadores","transportes"];

function setTab(el) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  state.activeTab = el.dataset.tab;
  state.showCards = true;
  applyFilters();
}

function categoryMatchesTab(category, tab) {
  if (tab === "todos") return true;
  return category === tab;
}


function toggleDropdown(id) {
  document.querySelectorAll('.dropdown-menu').forEach(m => {
    if (m.id !== id) m.classList.remove('open');
  });
  document.getElementById(id).classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown-wrapper'))
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
});


function onCityChange() {
  state.selectedCities  = [...document.querySelectorAll('#cidadeMenu input:checked')].map(i => i.value);
  state.selectedBairros = [];
  updateBairroMenu(); updateBairroLabel(); updateCidadeLabel();
  applyFilters();
}
function updateCidadeLabel() {
  const el = document.getElementById('cidadeLabel');
  el.textContent = state.selectedCities.length === 0 ? 'Cidade (todos)'
    : state.selectedCities.length === 1 ? state.selectedCities[0]
    : `${state.selectedCities.length} cidades`;
}


function updateBairroMenu() {
  const menu = document.getElementById('bairroMenu');
  menu.innerHTML = '';
  let bairros = state.selectedCities.length === 0
    ? Object.values(BAIRROS).flat()
    : state.selectedCities.flatMap(c => BAIRROS[c] || []);
  [...new Set(bairros)].sort().forEach(b => {
    const div = document.createElement('div');
    div.className = 'dropdown-item';
    const id = `bairro-${b.replace(/\s+/g,'_')}`;
    div.innerHTML = `<input type="checkbox" id="${id}" value="${b}" onchange="onBairroChange()"><label for="${id}">${b}</label>`;
    menu.appendChild(div);
  });
}
function onBairroChange() {
  state.selectedBairros = [...document.querySelectorAll('#bairroMenu input:checked')].map(i => i.value);
  updateBairroLabel(); applyFilters();
}
function updateBairroLabel() {
  const el = document.getElementById('bairroLabel');
  el.textContent = state.selectedBairros.length === 0 ? 'Bairro (todos)'
    : state.selectedBairros.length === 1 ? state.selectedBairros[0]
    : `${state.selectedBairros.length} bairros`;
}


function onModalChange() {
  state.selectedModals = [...document.querySelectorAll('#modalMenu input:checked')].map(i => i.value);
  updateModalLabel(); applyFilters();
}
function updateModalLabel() {
  const el = document.getElementById('modalLabel');
  if (!el) return;
  el.textContent = state.selectedModals.length === 0 ? 'Modal (todos)'
    : state.selectedModals.length === 1 ? 'Modal: ' + state.selectedModals[0]
    : `Modal: ${state.selectedModals.length} tipos`;
}


function getFilteredPoints(tab) {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  return POINTS.filter(p => {
    if (!categoryMatchesTab(p.category, tab))                                              return false;
    if (state.selectedCities.length  > 0 && !state.selectedCities.includes(p.city))       return false;
    if (state.selectedBairros.length > 0 && !state.selectedBairros.includes(p.bairro))    return false;
    if (state.selectedModals.length  > 0 && !state.selectedModals.includes(p.modal))      return false;
    if (q && !p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q) && !p.bairro.toLowerCase().includes(q)) return false;
    return true;
  });
}

function applyFilters() {
  // atualiza contadores de todas as abas
  ALL_TABS.forEach(tab => {
    const el = document.getElementById(`count-${tab}`);
    if (el) el.textContent = getFilteredPoints(tab).length;
  });

  const filtered = getFilteredPoints(state.activeTab);
  const countEl  = document.getElementById('resultsCount');
  if (countEl) countEl.textContent = filtered.length;

  const grid = document.getElementById('cardsGrid');
  if (!grid) return;

  if (!state.showCards) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔎</div>
        <h3>Clique em uma aba para ver os pontos</h3>
        <p>Escolha entre as categorias disponíveis.</p>
      </div>`;
    renderActiveFilters();
    return;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Nenhum ponto encontrado</h3>
        <p>Tente ajustar os filtros ou ampliar a busca.</p>
      </div>`;
    renderActiveFilters();
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="card ${state.selectedCards.has(p.id) ? 'selected' : ''}" id="card-${p.id}">
      <input type="checkbox" class="card-checkbox"
        ${state.selectedCards.has(p.id) ? 'checked' : ''}
        onchange="toggleCard(${p.id}, this)"
        onclick="event.stopPropagation()">
      <div class="card-image ${p.bg}">
        <span class="icon">${p.icon}</span>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="type-pill pill-${p.type}">${p.label}</span>
          <span class="available-badge">Disponível</span>
        </div>
        <div class="card-title">${p.title}</div>
        <div class="card-address">📍 ${p.address}</div>
        <div class="card-specs">${p.specs.map(s => `<span class="spec">${s}</span>`).join('')}</div>
        <div class="card-footer">
          <span class="city-tag">${p.city}</span>
          <button class="btn-details" onclick="alert('Detalhes de: ${p.title}')">VER DETALHES</button>
        </div>
      </div>
    </div>
  `).join('');

  renderActiveFilters();
}


function toggleCard(id, cb) {
  if (cb.checked) state.selectedCards.add(id);
  else            state.selectedCards.delete(id);
  document.getElementById(`card-${id}`)?.classList.toggle('selected', cb.checked);
}
function markAll()   { getFilteredPoints(state.activeTab).forEach(p => state.selectedCards.add(p.id)); applyFilters(); }
function unmarkAll() { 
  state.selectedCards.clear(); 
  applyFilters(); 
}


function clearFilters() {
  document.querySelectorAll('#cidadeMenu input, #bairroMenu input, #modalMenu input').forEach(i => i.checked = false);
  state.selectedCities  = [];
  state.selectedBairros = [];
  state.selectedModals  = [];
  const si = document.getElementById('searchInput');
  if (si) si.value = '';
  updateBairroMenu(); updateBairroLabel(); updateCidadeLabel(); updateModalLabel();
  applyFilters();
}


function renderActiveFilters() {
  const bar = document.getElementById('activeFilters');
  if (!bar) return;
  bar.innerHTML = [
    ...state.selectedCities.map(c  => `<div class="filter-tag">${c} <button onclick="removeCityFilter('${c}')">×</button></div>`),
    ...state.selectedBairros.map(b => `<div class="filter-tag">${b} <button onclick="removeBairroFilter('${b}')">×</button></div>`),
    ...state.selectedModals.map(m  => `<div class="filter-tag">${m} <button onclick="removeModalFilter('${m}')">×</button></div>`),
  ].join('');
}
function removeCityFilter(city) {
  const cb = document.querySelector(`#cidadeMenu input[value="${city}"]`);
  if (cb) cb.checked = false;
  state.selectedCities  = state.selectedCities.filter(c => c !== city);
  state.selectedBairros = state.selectedBairros.filter(b => !BAIRROS[city]?.includes(b));
  updateBairroMenu(); updateBairroLabel(); updateCidadeLabel(); applyFilters();
}
function removeBairroFilter(bairro) {
  const cb = document.querySelector(`#bairroMenu input[value="${bairro}"]`);
  if (cb) cb.checked = false;
  state.selectedBairros = state.selectedBairros.filter(b => b !== bairro);
  updateBairroLabel(); applyFilters();
}
function removeModalFilter(modal) {
  const cb = document.querySelector(`#modalMenu input[value="${modal}"]`);
  if (cb) cb.checked = false;
  state.selectedModals = state.selectedModals.filter(m => m !== modal);
  updateModalLabel(); applyFilters();
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      state.activeTab = btn.dataset.tab;
      state.showCards = true;
      applyFilters();
    });
  });

  const pontosSection = document.getElementById('pontos');
  if (pontosSection) {
    pontosSection.addEventListener('click', (e) => {
      const clickedControl = e.target.closest('button, input, select, a, label, .filter-tab, .filter-btn, .dropdown-menu, .sort-select');
      if (clickedControl) return;
      state.showCards = !state.showCards;
      applyFilters();
    });
  }

  // Buscar apenas atualiza, não mostra cards antes da aba ser clicada
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyFilters();
    });
  }

  updateBairroMenu();
  applyFilters();
});