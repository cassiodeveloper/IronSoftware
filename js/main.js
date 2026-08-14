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

  // ===== FONTE UNICA de precos, datas e links. Edite SO aqui. =====
  // kind "eu": turma fisica na Europa, so PLN/EUR (sem BRL).
  // kind "market": corporativo entregue no pais do cliente, BRL/EUR/PLN.
  // Regra: PLN e EUR sao valores de mercado distintos, nao conversao um do outro.
  const OFFERS = {
    open: {
      kind: "eu",
      startDate: "2026-10-31T09:00", endDate: "2026-10-31T18:00",
      city: { pt: "Cracóvia", en: "Krakow" }, country: "PL",
      date: { pt: "31/10/2026 &bull; Crac&oacute;via, Pol&ocirc;nia", en: "31/10/2026 &bull; Krak&oacute;w, Poland" },
      amount: { PLN: 1490, EUR: 690 },
      link: { PLN: "https://buy.stripe.com/28E14mgGx98F79NezLbsc0f", EUR: "https://buy.stripe.com/bJe4gy0Hzfx379N0IVbsc0l" }
    },
    bsides: {
      kind: "eu",
      startDate: "2026-09-25T09:00", endDate: "2026-09-25T18:00",
      city: { pt: "Cracóvia", en: "Krakow" }, country: "PL",
      date: { pt: "25/09/2026 &bull; Crac&oacute;via, Pol&ocirc;nia", en: "25/09/2026 &bull; Krak&oacute;w, Poland" },
      amount: { PLN: 399, EUR: 149 },
      link: { PLN: "https://buy.stripe.com/4gM4gyai94Sp2Tx63fbsc0i", EUR: "https://buy.stripe.com/dRmdR8gGx5Wt1Ptajvbsc0p" }
    },
    corp8:   { kind: "market", amount: { BRL: 24900, EUR: 4900, PLN: 21000 } },
    corp16:  { kind: "market", amount: { BRL: 42900, EUR: 8400, PLN: 36000 } },
    premium: { kind: "market", amount: { BRL: 46900, EUR: 9900, PLN: 42500 } }
  };

  function fmtMoney(cur, n){
    var s = Number(n).toLocaleString("de-DE");
    if (cur === "BRL") return "R$ " + s;
    if (cur === "EUR") return "€ " + s;
    return "PLN " + s;
  }

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

    // Turma aberta em Cracovia: preco de mercado europeu (EUR) no schema.
    const open = OFFERS.open;
    course.hasCourseInstance = {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "startDate": open.startDate,
      "endDate": open.endDate,
      "location": {
        "@type": "Place",
        "name": isEN ? open.city.en : open.city.pt,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": isEN ? open.city.en : open.city.pt,
          "addressCountry": open.country
        }
      },
      "offers": {
        "@type": "Offer",
        "url": open.link.EUR,
        "price": String(open.amount.EUR),
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    };

    // In-company: preco no mercado do idioma (BRL no PT, EUR no EN).
    const corpCur = isEN ? "EUR" : "BRL";
    course.offers = [{
      "@type": "Offer",
      "url": "https://cassiodeveloper.com.br/IronSoftware/#signup",
      "price": String(OFFERS.corp8.amount[corpCur]),
      "priceCurrency": corpCur,
      "availability": "https://schema.org/InStock",
      "category": "CorporateTraining"
    }];

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

  // ----- Moeda / render das ofertas (fonte unica: OFFERS) -----
  // Turmas europeias (kind "eu"): sempre PLN/EUR. Corporativo (kind "market"): PT=BRL, EN=euCur.
  let euCur = 'PLN';
  try { var savedCur = localStorage.getItem('cur_en'); if (savedCur === 'PLN' || savedCur === 'EUR') euCur = savedCur; } catch (e) {}

  function curFor(kind){
    if (kind === 'eu') return euCur;
    return (document.documentElement.lang === 'en') ? euCur : 'BRL';
  }

  function applyPricing(){
    var isEN = document.documentElement.lang === 'en';
    document.querySelectorAll('[data-of]').forEach(function(el){
      var parts = (el.getAttribute('data-of') || '').split(':');
      var o = OFFERS[parts[0]];
      if (!o) return;
      var field = parts[1];
      var cur = curFor(o.kind);
      if (field === 'date' && o.date) {
        el.innerHTML = isEN ? o.date.en : o.date.pt;
      } else if (field === 'price') {
        var amt = (o.amount[cur] != null) ? o.amount[cur] : o.amount.EUR;
        el.innerHTML = fmtMoney(cur, amt);
      } else if (field === 'buy') {
        var href = o.link && o.link[cur];
        if (href) {
          el.setAttribute('href', href);
          el.innerHTML = (isEN ? 'Buy ticket' : 'Comprar ingresso') + ' <span class="arrow">&rarr;</span>';
        } else {
          el.setAttribute('href', '#signup');
          el.innerHTML = (isEN ? 'Request a quote' : 'Solicitar proposta') + ' <span class="arrow">&rarr;</span>';
        }
      }
    });
    document.querySelectorAll('#curToggle .curbtn').forEach(function(b){
      b.classList.toggle('is-active', b.getAttribute('data-cur') === euCur);
    });
    var tog = document.getElementById('curToggle');
    if (tog) tog.hidden = false; // sempre visivel: turmas europeias usam PLN/EUR nos dois idiomas
  }

  document.querySelectorAll('#curToggle .curbtn').forEach(function(b){
    b.addEventListener('click', function(){
      var c = b.getAttribute('data-cur');
      if (c !== 'PLN' && c !== 'EUR') return;
      euCur = c;
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