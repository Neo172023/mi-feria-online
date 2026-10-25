/* Man Simple: presentación editorial de escritos y reflexiones. */
(function () {
  'use strict';
  const AUTHOR = 'Hugo Sebastián Domínguez';
  const SIGNATURE = 'Man Simple';
  const SITE = 'https://neo172023.github.io/mi-feria-online/';
  const root = document.getElementById('escritos-preview') || document.getElementById('escritos-list');
  if (!root) return;
  const preview = root.id === 'escritos-preview';
  const empty = document.getElementById(preview ? 'escritos-preview-empty' : 'escritos-empty');
  const copyright = '© ' + new Date().getFullYear() + ' ' + AUTHOR + '. Todos los derechos reservados. Los poemas, reflexiones y escritos publicados bajo la firma literaria Man Simple son obras de autoría de Hugo Sebastián Domínguez, salvo indicación expresa en contrario. Queda prohibida su reproducción, distribución, modificación o utilización comercial, total o parcial, sin autorización previa y expresa del autor, excepto en los casos permitidos por la legislación vigente. Toda cita deberá reconocer la autoría y mencionar la fuente original.';

  const css = document.createElement('style');
  css.textContent = `
    :root{--ms-ink:#14263d;--ms-gold:#c8a875;--ms-cream:#faf6ee}
    .ms-literary{background:linear-gradient(135deg,#102039,#213b55);color:#fff;border-radius:24px;padding:clamp(28px,5vw,62px);position:relative;overflow:hidden;margin-bottom:30px;box-shadow:0 24px 55px #15273c25}
    .ms-literary:after{content:'“';position:absolute;right:4%;top:-100px;font:normal 360px Georgia,serif;color:#ffffff0a;pointer-events:none}
    .ms-literary>*{position:relative;z-index:1}
    .ms-kicker{display:block;font:700 11px/1.5 system-ui,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:var(--ms-gold);margin-bottom:18px}
    .ms-literary h2,.ms-literary h1{font:normal clamp(34px,5vw,66px)/1.12 Georgia,'Times New Roman',serif;letter-spacing:-.025em;color:white;margin:0 0 18px}
    .ms-literary p{font:italic clamp(17px,2vw,22px)/1.7 Georgia,serif;color:#e6e7eb;max-width:680px;margin:0 0 24px}
    .ms-literary .ms-sign{font:italic 23px Georgia,serif;color:var(--ms-gold)}
    .ms-literary .ms-line{height:1px;background:linear-gradient(90deg,var(--ms-gold),transparent);max-width:230px;margin:20px 0}
    .escritos-section{padding-top:64px;padding-bottom:85px}
    .escritos-section>.heading,.escritos-section>.escritos-intro{display:none}
    .escritos-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
    .escrito-card{background:#fff;border:1px solid #e6dfd3;border-radius:18px;overflow:hidden;box-shadow:0 12px 35px #1b2b3e12;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
    .escrito-card:hover{transform:translateY(-4px);box-shadow:0 18px 42px #1b2b3e20}
    .escrito-card img{display:block;width:100%;max-height:440px;object-fit:contain;background:#eeeae3}
    .escrito-body{padding:26px;display:flex;flex:1;flex-direction:column}
    .escrito-body h3{font:normal 27px/1.2 Georgia,serif;color:#162941;margin:0 0 16px}
    .escrito-body p{white-space:pre-line;font:normal 16px/1.85 Georgia,serif;color:#344256;overflow-wrap:anywhere;margin:0 0 18px}
    .escrito-card.ms-preview .escrito-body p{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:7;overflow:hidden}
    .ms-author{font:italic 19px Georgia,serif;color:#927044;margin-top:auto;padding-top:15px}
    .escrito-date{font-size:12px;color:#718095;margin-top:12px}
    .escrito-share,.escritos-more{display:inline-block;align-self:flex-start;border:1px solid #d7c49e;border-radius:10px;padding:12px 16px;background:#14263d;color:#fff;font:700 13px system-ui,sans-serif;cursor:pointer;margin-top:17px}
    .escritos-more{background:#14263d;color:#fff;padding:16px 24px;margin-top:28px}
    .ms-rights{border-top:1px solid #d9c9a9;margin-top:32px;padding:18px 0 0;font:normal 12px/1.7 system-ui,sans-serif;color:#667085;max-width:850px}
    .ms-rights strong{color:#23384f}
    .escritos-page{padding-top:34px;padding-bottom:80px;min-height:60vh}
    .escritos-page>.eyebrow,.escritos-page>h1,.escritos-page>.escritos-intro{display:none}
    .escritos-page .escritos-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .escritos-page-back{display:inline-block;margin:0 0 20px;color:#947446;font-weight:700}
    .escritos-empty{padding:22px;color:#68778b}
    @media(max-width:850px){.escritos-grid,.escritos-page .escritos-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:600px){.escritos-grid,.escritos-page .escritos-grid{grid-template-columns:1fr}.ms-literary{border-radius:18px}.escrito-body{padding:22px}}
  `;
  document.head.append(css);

  if (preview) {
    document.title = 'Seba Domínguez | Tienda online y blog personal';
    const brand = document.querySelector('.brand-copy');
    if (brand) {
      const small = brand.querySelector('small');
      const strong = brand.querySelector('strong');
      if (small) small.textContent = 'Tienda online y blog personal de';
      if (strong) strong.textContent = 'Seba Domínguez';
    }
  } else {
    document.title = 'Mis escritos y reflexiones | Man Simple';
  }

  if (preview) {
    const homeHero = document.querySelector('.hero');
    const writings = document.getElementById('escritos');
    if (homeHero && writings) {
      homeHero.insertAdjacentElement('afterend', writings);
      const catalog = document.getElementById('catalogo');
      if (catalog) catalog.insertAdjacentElement('beforebegin', writings);
    }
    const compact = document.createElement('style');
    compact.textContent = `
      .hero{padding:clamp(30px,4vw,52px) 0!important}
      .hero h1{font-size:clamp(35px,5vw,58px);margin:10px 0!important;line-height:1.05}
      .hero p{font-size:15px;line-height:1.5;margin:12px 0 18px;max-width:520px}
      .hero .primary{padding:12px 20px}
      .escritos-section{padding-top:18px!important;padding-bottom:25px!important}
      .escritos-section .ms-literary{padding:clamp(22px,3vw,38px)!important;margin-bottom:18px!important}
      .escritos-section .ms-literary h2{font-size:clamp(31px,4vw,48px);margin-bottom:10px}
      .escritos-section .ms-literary p{font-size:clamp(15px,1.8vw,19px);line-height:1.45;margin-bottom:10px}
      .escritos-section .ms-kicker{margin-bottom:9px}
      .escritos-section .ms-line{margin:10px 0}
      .ms-hero-link{display:inline-block;background:#c8a875;color:#14263d!important;border-radius:9px;padding:12px 20px;font:800 14px system-ui,sans-serif;text-decoration:none;margin-top:16px}
      .ms-hero-link:hover{background:#e4c990}
      .catalog{padding-top:35px}
      @media(max-width:600px){.hero{padding:30px 0!important}.hero h1{font-size:37px}.escritos-section{padding-top:12px!important}}
    `;
    compact.textContent += `
      @media(min-width:850px){
        main#inicio{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:18px;align-items:stretch}
        main#inicio>.hero{grid-column:1;grid-row:1;display:flex;align-items:center;padding:30px 0 30px max(24px,calc((100vw - 1160px)/2))!important;min-height:360px}
        main#inicio>.hero>.wrap{max-width:none;width:100%;padding:0 24px 0 0;margin:0}
        main#inicio>.hero h1{font-size:clamp(32px,3.5vw,53px);letter-spacing:-1.7px}
        main#inicio>.hero p{font-size:14px}
        main#inicio>.escritos-section{grid-column:2;grid-row:1;max-width:none;width:auto;margin:0;padding:14px max(24px,calc((100vw - 1160px)/2)) 14px 0!important}
        main#inicio>.escritos-section>.ms-literary{height:100%;min-height:360px;display:flex;flex-direction:column;justify-content:center;padding:clamp(22px,3vw,42px)!important;margin:0!important;border-radius:20px}
        main#inicio>.escritos-section>.ms-literary h2{font-size:clamp(30px,3.2vw,46px)}
        main#inicio>.escritos-section>.ms-literary p{font-size:clamp(15px,1.5vw,18px)}
        main#inicio>.escritos-section>.escritos-grid,
        main#inicio>.escritos-section>.escritos-more,
        main#inicio>.escritos-section>.escritos-empty,
        main#inicio>.escritos-section>.ms-rights{display:none!important}
        main#inicio>.catalog,main#inicio>.cta{grid-column:1/-1}
        .ms-hero-link{align-self:flex-start}
      }
      @media(max-width:849px){
        .ms-literary .ms-sign{display:block}
        .ms-hero-link{margin-top:12px}
      }
    `;
    document.head.append(compact);
  }

  const section = preview ? document.getElementById('escritos') : document.querySelector('.escritos-page');
  if (section) {
    const hero = document.createElement('div');
    hero.className = 'ms-literary';
    const kicker = document.createElement('span'); kicker.className = 'ms-kicker'; kicker.textContent = 'Un espacio para sentir y reflexionar';
    const heading = document.createElement(preview ? 'h2' : 'h1'); heading.textContent = 'Mis escritos y reflexiones';
    const subtitle = document.createElement('p'); subtitle.textContent = 'Hay palabras que nacen del silencio y encuentran su lugar en el corazón de quien las lee.';
    const line = document.createElement('div'); line.className = 'ms-line';
    const sign = document.createElement('span'); sign.className = 'ms-sign'; sign.textContent = 'Man Simple';
    hero.append(kicker,heading,subtitle,line,sign);
    if (preview) { const link = document.createElement('a'); link.className = 'ms-hero-link'; link.href = 'escritos.html'; link.textContent = 'Leer mis escritos →'; hero.append(link); }
    section.insertBefore(hero, preview ? section.firstChild : root);
    const rights = document.createElement('aside'); rights.className = 'ms-rights'; rights.setAttribute('aria-label','Derechos de autor');
    const lead = document.createElement('strong'); lead.textContent = '© Derechos de autor · ';
    rights.append(lead,document.createTextNode(copyright));
    section.append(rights);
  }
  const more = document.querySelector('.escritos-more');
  if (more) more.textContent = 'Explorar todos mis escritos ↗';

  const formatDate = s => {
    const d = new Date(s + 'T12:00:00');
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('es-AR',{day:'numeric',month:'long',year:'numeric'});
  };
  function card(p) {
    const article = document.createElement('article'); article.className = 'escrito-card' + (preview ? ' ms-preview' : '');
    if (p.imagen) {
      const img = document.createElement('img'); img.src = p.imagen; img.alt = p.titulo || 'Imagen de un escrito'; img.loading = 'lazy'; article.append(img);
    }
    const body = document.createElement('div'); body.className = 'escrito-body';
    if (p.titulo) { const h = document.createElement('h3'); h.textContent = p.titulo; body.append(h); }
    if (p.texto) { const t = document.createElement('p'); t.textContent = p.texto; body.append(t); }
    const sign = document.createElement('span'); sign.className = 'ms-author'; sign.textContent = '— ' + SIGNATURE; body.append(sign);
    if (p.fecha) { const date = document.createElement('small'); date.className = 'escrito-date'; date.textContent = formatDate(p.fecha); body.append(date); }
    const share = document.createElement('button'); share.type = 'button'; share.className = 'escrito-share'; share.textContent = preview ? 'Leer y compartir ↗' : '↗ Compartir';
    share.onclick = async () => {
      const url = new URL('escritos.html',SITE); url.searchParams.set('escrito',p.id);
      if (preview) { location.href = url.href; return; }
      const title = p.titulo || 'Mis escritos y reflexiones';
      const text = [p.titulo,p.texto,'— '+SIGNATURE].filter(Boolean).join(' — ');
      try {
        if (navigator.share) await navigator.share({title,text,url:url.href});
        else if (navigator.clipboard) { await navigator.clipboard.writeText(url.href); share.textContent = '✓ Enlace copiado'; }
        else prompt('Copiá el enlace',url.href);
      } catch(e) { if(e.name !== 'AbortError') console.error(e); }
    };
    body.append(share); article.append(body); return article;
  }
  fetch('escritos.json',{cache:'no-store'}).then(r=>{
    if(!r.ok) throw Error('No se pudo leer escritos.json'); return r.json();
  }).then(data=>{
    if(!Array.isArray(data)) throw Error('Formato incorrecto');
    const all = data.filter(p=>p && typeof p.id==='string' && typeof p.titulo==='string' && typeof p.texto==='string' && typeof p.imagen==='string' && (p.titulo.trim()||p.texto.trim()||p.imagen.trim())).sort((a,b)=>(b.fecha||'').localeCompare(a.fecha||''));
    const chosen = new URLSearchParams(location.search).get('escrito');
    const list = preview ? all.slice(0,3) : chosen && all.some(p=>p.id===chosen) ? all.filter(p=>p.id===chosen) : all;
    root.replaceChildren(...list.map(card)); if(empty) empty.hidden = list.length>0;
  }).catch(err=>{
    console.error(err); if(empty){empty.textContent='No se pudieron cargar los escritos. Intentá nuevamente más tarde.';empty.hidden=false;}
  });
})();
