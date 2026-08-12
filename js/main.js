  const SEO = {
    pt: {
      title: "AppSec: Software de Ferro | Intensivo de 1 Dia (8h)",
      desc: "Treinamento intensivo de 8 horas em Segurança de Aplicações cobrindo Modelagem de Ameaças, DevSecOps, Gestão de Vulnerabilidades e Monitoramento."
    },
    en: {
      title: "AppSec: Software of Iron | 1-Day Intensive (8h)",
      desc: "An 8-hour intensive Application Security training covering Threat Modeling, DevSecOps, Vulnerability Management, and Application Monitoring."
    }
  };

  const PUBLIC_EVENT = {
    enabled: true,
    startDate: "2026-10-31T09:00",
    endDate: "2026-10-31T18:00",
    city_pt: "Cracóvia",
    city_en: "Krakow",
    countryCode: "PL",
    checkoutUrl_pt: "https://buy.stripe.com/28E3cueypbgN8dRfDPbsc0j",
    checkoutUrl_en: "https://buy.stripe.com/28E14mgGx98F79NezLbsc0f",
    price: "1490",
    currency_pt: "BRL",
    currency_en: "PLN"
  };

  const INCOMPANY = {
    enabled: true,
    requestUrl: "https://cassiodeveloper.com.br/IronSoftware/#signup",
    price_pt: "24900",
    price_en: "21000",
    currency_pt: "BRL",
    currency_en: "PLN"
  };

  const PROVIDER = {
    "@type": "Person",
    "name": "Cássio Batista Pereira",
    "jobTitle": "Application Security Specialist",
    "sameAs": [
      "https://www.linkedin.com/in/cassiobatistapereira/",
      "https://x.com/cassiodeveloper"
    ]
  };

  function buildJsonLd(lang){
    const isEN = lang === "en";

    const course = {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `https://cassiodeveloper.com.br/IronSoftware#course-${lang}`,
      "name": isEN ? "AppSec: Software of Iron" : "AppSec: Software de Ferro",
      "description": SEO[lang].desc,
      "inLanguage": isEN ? "en" : "pt-BR",
      "timeRequired": "PT8H",
      "educationalLevel": "Intermediate",
      "teaches": [
        "Application Security",
        "Threat Modeling",
        "DevSecOps",
        "Vulnerability Management",
        "Secure Software Development"
      ],
      "provider": PROVIDER
    };

    // Turma aberta com data (CourseInstance + Offer)
    if (PUBLIC_EVENT.enabled) {
      course.hasCourseInstance = {
        "@type": "CourseInstance",
        "courseMode": "Onsite",
        "startDate": PUBLIC_EVENT.startDate,
        "endDate": PUBLIC_EVENT.endDate,
        "location": {
          "@type": "Place",
          "name": isEN ? PUBLIC_EVENT.city_en : PUBLIC_EVENT.city_pt,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": isEN ? PUBLIC_EVENT.city_en : PUBLIC_EVENT.city_pt,
            "addressCountry": PUBLIC_EVENT.countryCode
          }
        },
        "offers": {
          "@type": "Offer",
          "url": isEN ? PUBLIC_EVENT.checkoutUrl_en : PUBLIC_EVENT.checkoutUrl_pt,
          "price": PUBLIC_EVENT.price,
          "priceCurrency": isEN ? PUBLIC_EVENT.currency_en : PUBLIC_EVENT.currency_pt,
          "availability": "https://schema.org/InStock"
        }
      };
    }

    // In-company (Offer separado)
    // Como JSON-LD é um objeto só aqui, vamos anexar "offers" adicionais via array
    const offers = [];

    if (INCOMPANY.enabled) {
      offers.push({
        "@type": "Offer",
        "url": INCOMPANY.requestUrl,
        "price": isEN ? INCOMPANY.price_en : INCOMPANY.price_pt,
        "priceCurrency": isEN ? INCOMPANY.currency_en : INCOMPANY.currency_pt,
        "availability": "https://schema.org/InStock",
        "category": "CorporateTraining"
      });
    }

    // Se já existe oferta de turma aberta dentro do CourseInstance, tudo bem.
    // Aqui adicionamos ofertas gerais do curso (ex: in-company).
    if (offers.length) course.offers = offers;

    return course;
  }

  function updateJsonLd(lang){
    const el = document.getElementById("schemaCourse");
    if(!el) return;
    const obj = buildJsonLd(lang);
    el.textContent = JSON.stringify(obj);
  }

  function updateSeo(lang){
    document.title = SEO[lang].title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if(metaDesc) metaDesc.setAttribute("content", SEO[lang].desc);
  }

  // ===== Integra com seu switch atual =====
  const langSwitch = document.getElementById("langSwitch");
  const langTag = document.getElementById("langTag");

  function updateLogo(lang) {
  const logo = document.getElementById("heroLogo");
  const logo2 = document.getElementById("footerLogo");
  
  if (!logo) return;
  if (!logo) return;

  logo.style.opacity = 0;
  logo2.style.opacity = 0;

  setTimeout(() => {
    if (lang === "en") {
      logo.src = "img/logo-en.png";
      logo.alt = "AppSec Iron Software";
      logo2.src = "img/logo-en.png";
      logo2.alt = "AppSec Iron Software";
    } else {
      logo.src = "img/logo-pt.png";
      logo.alt = "AppSec Software de Ferro";
      logo2.src = "img/logo-pt.png";
      logo2.alt = "AppSec Software de Ferro";
    }
    logo.style.opacity = 1;
    logo2.style.opacity = 1;
  }, 120);
}

  function setLang(lang){
    document.documentElement.lang = (lang === "en") ? "en" : "pt-BR";
    if(langTag) langTag.textContent = (lang === "en") ? "EN" : "PT";

    // troca textos da página
    document.querySelectorAll('[data-pt][data-en]').forEach(el => {
      el.innerHTML = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-pt');
    });

    // placeholders
    document.querySelectorAll('[data-pt-placeholder][data-en-placeholder]').forEach(el => {
      el.setAttribute('placeholder', (lang === 'en') ? el.getAttribute('data-en-placeholder') : el.getAttribute('data-pt-placeholder'));
    });

    // troca hrefs por idioma (checkout por moeda: PT=BRL, EN=PLN)
    document.querySelectorAll('[data-pt-href][data-en-href]').forEach(el => {
      el.setAttribute('href', (lang === 'en') ? el.getAttribute('data-en-href') : el.getAttribute('data-pt-href'));
    });

    updateLogo(lang);

    // select options
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

    // SEO + JSON-LD sincronizados
    updateSeo(lang);
    updateJsonLd(lang);

    // preços por moeda (BRL fixo em pt; PLN/EUR selecionável em en)
    applyPricing();

    // persist
    try { localStorage.setItem('lang_pref', lang); } catch (e) {}
  }

  // ----- Moeda -----
  // pt-br sempre BRL. en-us usa a moeda escolhida (PLN padrao, EUR opcional).
  let curEn = 'PLN';
  try {
    const savedCur = localStorage.getItem('cur_en');
    if (savedCur === 'PLN' || savedCur === 'EUR') curEn = savedCur;
  } catch (e) {}

  function activeCurrency(){
    return (document.documentElement.lang === 'en') ? curEn : 'BRL';
  }

  function applyPricing(){
    const cur = activeCurrency();
    const key = cur.toLowerCase();

    // valores exibidos
    document.querySelectorAll('[data-price-brl]').forEach(el => {
      const v = el.getAttribute('data-price-' + key) || el.getAttribute('data-price-brl');
      el.textContent = v;
    });

    // links de checkout; se a moeda ativa nao tem link, cai para contato (#signup)
    // e o rotulo do botao troca: com link = "Comprar", sem link = "Solicitar proposta"
    const isEN = document.documentElement.lang === 'en';
    const lp = isEN ? 'en' : 'pt';
    document.querySelectorAll('[data-href-brl]').forEach(el => {
      const v = el.getAttribute('data-href-' + key);
      const real = v && v.trim();
      el.setAttribute('href', real ? v.trim() : '#signup');
      const lbl = real ? el.getAttribute('data-buy-' + lp) : el.getAttribute('data-quote-' + lp);
      if (lbl) el.innerHTML = lbl + ' <span class="arrow">&rarr;</span>';
    });

    // estado visual + visibilidade do toggle (so aparece em en)
    document.querySelectorAll('#curToggle .curbtn').forEach(b => {
      b.classList.toggle('is-active', b.getAttribute('data-cur') === curEn);
    });
    const tog = document.getElementById('curToggle');
    if (tog) tog.hidden = (document.documentElement.lang !== 'en');
  }

  // clique no toggle de moeda
  document.querySelectorAll('#curToggle .curbtn').forEach(b => {
    b.addEventListener('click', () => {
      const c = b.getAttribute('data-cur');
      if (c !== 'PLN' && c !== 'EUR') return;
      curEn = c;
      try { localStorage.setItem('cur_en', c); } catch (e) {}
      applyPricing();
    });
  });

  // switch event
  if(langSwitch){
    langSwitch.addEventListener('change', () => {
      setLang(langSwitch.checked ? 'en' : 'pt');
    });
  }

  // init
  let pref = 'pt';
  try {
    const saved = localStorage.getItem('lang_pref');
    if(saved === 'en' || saved === 'pt') pref = saved;
  } catch (e) {}
  if(langSwitch) langSwitch.checked = (pref === 'en');
  setLang(pref);