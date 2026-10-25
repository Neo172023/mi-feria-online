/* Publicaciones independientes del catálogo de ventas. */
(function(){
 const root=document.getElementById('escritos-preview')||document.getElementById('escritos-list');
 if(!root)return;
 const preview=!!document.getElementById('escritos-preview');
 const empty=document.getElementById(preview?'escritos-preview-empty':'escritos-empty');
 const base=new URL('escritos.html',document.baseURI);
 const formatDate=s=>{const d=new Date(s+'T12:00:00');return Number.isNaN(d.getTime())?'':d.toLocaleDateString('es-AR',{day:'numeric',month:'long',year:'numeric'})};
 function card(p){
  const article=document.createElement('article');article.className='escrito-card';
  if(p.imagen){const img=document.createElement('img');img.src=p.imagen;img.alt=p.titulo||'Imagen de un escrito';img.loading='lazy';article.append(img)}
  const body=document.createElement('div');body.className='escrito-body';
  if(p.titulo){const h=document.createElement('h3');h.textContent=p.titulo;body.append(h)}
  if(p.texto){const t=document.createElement('p');t.textContent=p.texto;body.append(t)}
  if(p.fecha){const date=document.createElement('small');date.className='escrito-date';date.textContent=formatDate(p.fecha);body.append(date)}
  const share=document.createElement('button');share.type='button';share.className='escrito-share';share.textContent='↗ Compartir';
  share.onclick=async()=>{const url=new URL(base);url.searchParams.set('escrito',p.id);const title=p.titulo||'Mis escritos y reflexiones';const text=[p.titulo,p.texto].filter(Boolean).join(' — ');try{if(navigator.share)await navigator.share({title,text,url:url.href});else if(navigator.clipboard){await navigator.clipboard.writeText(url.href);share.textContent='✓ Enlace copiado'}else prompt('Copiá el enlace',url.href)}catch(e){if(e.name!=='AbortError')console.error(e)}};
  body.append(share);article.append(body);return article;
 }
 fetch('escritos.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('No se pudo leer escritos.json');return r.json()}).then(data=>{
  if(!Array.isArray(data))throw Error('Formato incorrecto');
  const all=data.filter(p=>p&&typeof p.id==='string'&&typeof p.titulo==='string'&&typeof p.texto==='string'&&typeof p.imagen==='string'&&(p.titulo.trim()||p.texto.trim()||p.imagen.trim())).sort((a,b)=>(b.fecha||'').localeCompare(a.fecha||''));
  const chosen=new URLSearchParams(location.search).get('escrito');
  const list=preview?all.slice(0,3):chosen&&all.some(p=>p.id===chosen)?all.filter(p=>p.id===chosen):all;
  root.replaceChildren(...list.map(card));if(empty)empty.hidden=list.length>0;
 }).catch(err=>{console.error(err);if(empty){empty.textContent='No se pudieron cargar los escritos. Intentá nuevamente más tarde.';empty.hidden=false}});
})();
