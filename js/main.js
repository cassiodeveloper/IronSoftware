document.getElementById("year").textContent = new Date().getFullYear();

// SEO strings
const SEO = {
  pt: {
	title: "AppSec: Software de Ferro | Intensivo de 1 Dia (8h)",
	desc: "Treinamento intensivo de 8 horas em AppSec focado em Modelagem de Ameaças, DevSecOps, Gestão de Vulnerabilidades e Monitoramento de Aplicações."
  },
  en: {
	title: "AppSec: Software of Iron | 1-Day Intensive (8h)",
	desc: "An 8-hour intensive AppSec training focused on Threat Modeling, DevSecOps, Vulnerability Management, and Application Monitoring."
  }
};

const langSwitch = document.getElementById("langSwitch");
const langTag = document.getElementById("langTag");

function swapSelectOptions(lang){
  document.querySelectorAll('select[data-pt-opts][data-en-opts]').forEach(sel => {
	const opts = JSON.parse(lang === 'en' ? sel.getAttribute('data-en-opts') : sel.getAttribute('data-pt-opts'));
	const current = sel.value;
	const values = Array.from(sel.options).map(o => o.value);
	sel.innerHTML = '';
	values.forEach((v, i) => {
	  const o = document.createElement('option');
	  o.value = v;
	  o.textContent = opts[i] ?? v;
	  sel.appendChild(o);
	});
	sel.value = current;
  });
}

function setLang(lang){
  // html lang
  document.documentElement.lang = (lang === 'en') ? 'en' : 'pt-BR';

  // UI
  langTag.textContent = (lang === 'en') ? 'EN' : 'PT-BR';
  document.getElementById("langHint").textContent =
	(lang === 'en') ? document.getElementById("langHint").getAttribute("data-en")
					: document.getElementById("langHint").getAttribute("data-pt");

  // SEO sync
  document.title = SEO[lang].title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.setAttribute('content', SEO[lang].desc);

  // text swap
  document.querySelectorAll('[data-pt][data-en]').forEach(el => {
	el.innerHTML = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-pt');
  });

  // placeholders swap
  document.querySelectorAll('[data-pt-placeholder][data-en-placeholder]').forEach(el => {
	el.setAttribute('placeholder', (lang === 'en') ? el.getAttribute('data-en-placeholder') : el.getAttribute('data-pt-placeholder'));
  });

  // select options
  swapSelectOptions(lang);

  // persist
  try { localStorage.setItem('lang_pref', lang); } catch (e) {}
}

// events
langSwitch.addEventListener('change', () => {
  setLang(langSwitch.checked ? 'en' : 'pt');
});

// init
let pref = 'pt';
try {
  const saved = localStorage.getItem('lang_pref');
  if(saved === 'en' || saved === 'pt') pref = saved;
} catch (e) {}
langSwitch.checked = (pref === 'en');
setLang(pref);