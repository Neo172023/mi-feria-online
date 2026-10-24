const $=s=>document.querySelector(s);let items=[];const storage='hugo_ventas_draft_v1';const fields=['id','nombre','categoria','descripcion','precio','precioAnterior','imagen','emoji','estado'];const clean=p=>({id:String(p.id||''),nombre:String(p.nombre||''),categoria:String(p.categoria||''),descripcion:String(p.descripcion||''),precio:Number(p.precio),precioAnterior:p.precioAnterior==null||p.precioAnterior===''?null:Number(p.precioAnterior),imagen:String(p.imagen||''),imagenes:Array.isArray(p.imagenes)?p.imagenes.map(String).filter(Boolean).slice(0,3):[],emoji:String(p.emoji||'📦'),estado:['Disponible','Reservado','Vendido'].includes(p.estado)?p.estado:'Disponible',fecha:String(p.fecha||new Date().toISOString().slice(0,10))});function valid(a){if(!Array.isArray(a)||a.length>2000)throw Error('El archivo debe contener una lista de hasta 2000 productos.');let ids=new Set();return a.map(x=>{let p=clean(x);if(!p.id||!p.nombre||!p.categoria||!Number.isFinite(p.precio)||p.precio<0||ids.has(p.id))throw Error('Producto inválido o identificador duplicado.');if(p.imagen&&!(/^(assets\/[\w.\-/%]+|https:\/\/[^\s]+)$/.test(p.imagen)))throw Error('Ruta de foto inválida: '+p.nombre);if(!p.imagenes.length&&p.imagen)p.imagenes=[p.imagen];if(p.imagenes.length>3||p.imagenes.some(src=>!(/^(assets\/[\w.\-/%]+|https:\/\/[^\s]+)$/.test(src))))throw Error('Fotografías inválidas: '+p.nombre);ids.add(p.id);return p})}function save(){localStorage.setItem(storage,JSON.stringify(items));render()}function msg(s){$('#message').textContent=s}function reset(){$('#form').reset();$('#id').value='';$('#formTitle').textContent='Nuevo producto'}function render(){$('#count').textContent=items.length;$('#listing').replaceChildren();items.forEach(p=>{let row=document.createElement('div');row.className='item-row';let info=document.createElement('div');let strong=document.createElement('strong');strong.textContent=p.nombre;let small=document.createElement('small');small.textContent=p.categoria+' · $ '+p.precio.toLocaleString('es-AR')+' · '+p.estado;info.append(strong,small);let buttons=document.createElement('div');let edit=document.createElement('button');edit.textContent='Editar';edit.className='secondary';edit.onclick=()=>{reset();fields.forEach(k=>{$('#'+k).value=p[k]??''});$('#imagenesExtras').value=(p.imagenes||[]).filter(x=>x!==p.imagen).join('\n');selectedPhotos=[...(pendingPhotos.get(p.id)||[])];showPhotos();$('#formTitle').textContent='Editar producto';window.scrollTo({top:0,behavior:'smooth'})};let del=document.createElement('button');del.textContent='Eliminar';del.className='secondary';del.onclick=()=>{if(confirm('¿Eliminar '+p.nombre+'?')){items=items.filter(x=>x.id!==p.id);pendingPhotos.delete(p.id);save();reset()}};let share=document.createElement('button');share.textContent='📤 Compartir';share.className='secondary';share.type='button';share.onclick=()=>shareStoreProduct(p);buttons.append(edit,share,del);row.append(info,buttons);$('#listing').append(row)})}$('#form').onsubmit=e=>{e.preventDefault();try{let old=$('#id').value;let p=clean(Object.fromEntries(fields.map(k=>[k,$('#'+k).value])));p.imagenes=[p.imagen,...$('#imagenesExtras').value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean)].filter(Boolean);if(p.imagenes.length>3)throw Error('Máximo 3 fotos');p.id=old||'art-'+Date.now().toString(36);p.fecha=new Date().toISOString().slice(0,10);let next=old?items.map(x=>x.id===old?p:x):[p,...items];items=valid(next);const kept=selectedPhotos.filter(x=>p.imagenes.includes('assets/'+x.filename));if(kept.length)pendingPhotos.set(p.id,kept);else pendingPhotos.delete(p.id);save();reset();msg('Producto guardado. Las fotos nuevas están listas para publicar en esta pestaña.')}catch(err){msg(err.message)}};$('#clear').onclick=reset;$('#download').onclick=()=>{let blob=new Blob([JSON.stringify(items,null,2)+'\n'],{type:'application/json'});let url=URL.createObjectURL(blob);let a=document.createElement('a');a.href=url;a.download='productos.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);msg('Archivo descargado. Reemplazá productos.json en GitHub para publicar los cambios.')};$('#import').onclick=()=>$('#file').click();$('#file').onchange=async e=>{let f=e.target.files[0];if(!f)return;try{items=valid(JSON.parse(await f.text()));pendingPhotos.clear();baseCommit=null;save();reset();msg('Catálogo importado correctamente.')}catch(err){msg('Error: '+err.message)}e.target.value=''};async function published(){let r=await fetch('productos.json?fresh='+Date.now(),{cache:'no-store'});if(!r.ok)throw Error('No se pudo abrir productos.json');return valid(await r.json())}$('#restore').onclick=async()=>{if(!confirm('¿Reemplazar los cambios locales con el catálogo publicado?'))return;try{items=await published();pendingPhotos.clear();baseCommit=null;save();reset();msg('Catálogo publicado cargado.')}catch(e){msg(e.message)}};(async()=>{try{let draft=localStorage.getItem(storage);items=draft?valid(JSON.parse(draft)):await published();render()}catch(e){msg('No se pudo cargar el catálogo. Usá Importar catálogo JSON. '+e.message)}})();


let selectedPhotos=[],photoUrls=[];
const pendingPhotos = new Map();
let baseCommit = null;
const isProtectedPanel = location.origin === 'https://ventas-hugo-admin-api.hugominguezkhal.workers.dev' && location.pathname === '/panel';
function photoReset(){selectedPhotos=[];$('#photoFile').value='';photoUrls.forEach(u=>URL.revokeObjectURL(u));photoUrls=[];$('#photoArea').hidden=true;$('#photoPreviews').replaceChildren();}
const oldReset=reset;reset=function(){oldReset();photoReset();$('#imagenesExtras').value=''};
function showPhotos(){
 const paths=[$('#imagen').value.trim(),...$('#imagenesExtras').value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean)].filter(Boolean);
 photoUrls.forEach(URL.revokeObjectURL);photoUrls=[];$('#photoPreviews').replaceChildren();
 $('#photoArea').hidden=!paths.length;$('#photoName').textContent=paths.length+' de 3 fotos';
 paths.forEach((path,i)=>{
  const wrap=document.createElement('div');wrap.className='photo-card';
  const img=document.createElement('img');const local=selectedPhotos.find(p=>'assets/'+p.filename===path);
  if(local){img.src=URL.createObjectURL(local.file);photoUrls.push(img.src);}
  else img.src=/^https:\/\//.test(path)?path:'https://neo172023.github.io/mi-feria-online/'+path;
  img.alt='Foto '+(i+1);
  const btn=document.createElement('button');btn.type='button';btn.className='secondary';btn.textContent='Quitar foto';
  btn.onclick=()=>{const next=paths.filter((_,j)=>j!==i);selectedPhotos=selectedPhotos.filter(p=>'assets/'+p.filename!==path);$('#imagen').value=next[0]||'';$('#imagenesExtras').value=next.slice(1).join('\n');showPhotos();};
  wrap.append(img,btn);$('#photoPreviews').append(wrap);
 });
}
$('#imagen').addEventListener('input',showPhotos);
$('#imagenesExtras').addEventListener('input',showPhotos);
$('#photoFile').addEventListener('change',e=>{
 const files=[...e.target.files];if(!files.length)return;
 const paths=[$('#imagen').value.trim(),...$('#imagenesExtras').value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean)].filter(Boolean);
 if(paths.length+files.length>3||files.some(f=>!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>5*1024*1024)){msg('Máximo 3 fotos JPG, PNG o WebP de hasta 5 MB. Quitá una foto antes de reemplazarla.');e.target.value='';return;}
 const stamp=Date.now().toString(36);
 const added=files.map((file,i)=>({file,filename:'foto-'+stamp+'-'+i+'.'+({'image/jpeg':'jpg','image/png':'png','image/webp':'webp'})[file.type]}));
 selectedPhotos.push(...added);const next=[...paths,...added.map(p=>'assets/'+p.filename)];
 $('#imagen').value=next[0];$('#imagenesExtras').value=next.slice(1).join('\n');showPhotos();e.target.value='';
 msg('Foto agregada. Guardá el producto antes de publicar.');
});
$('#photoDownload').onclick=()=>{selectedPhotos.forEach((p,i)=>{const u=URL.createObjectURL(p.file);setTimeout(()=>{const a=document.createElement('a');a.href=u;a.download=p.filename;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)},i*400)});msg('Se inició la descarga. El navegador podría pedir permiso para descargar varios archivos.')};

/* Revisión previa: sin publicar ni enviar credenciales */
$('#publishPreview').onclick=()=>{
 const area=$('#publishReview');area.replaceChildren();
 const title=document.createElement('strong');title.textContent='Revisión del catálogo local';area.append(title);
 const summary=document.createElement('p');summary.textContent=items.length+' productos · '+items.filter(p=>p.estado==='Disponible').length+' disponibles · '+items.filter(p=>p.estado==='Reservado').length+' reservados · '+items.filter(p=>p.estado==='Vendido').length+' vendidos';area.append(summary);
 const ul=document.createElement('ul');
 for(const p of items){const li=document.createElement('li');const photos=(p.imagenes?.length?p.imagenes:[p.imagen]).filter(Boolean);li.textContent=p.nombre+' — $ '+p.precio.toLocaleString('es-AR')+' — '+p.estado+' — '+photos.length+' foto(s)';ul.append(li)}
 area.append(ul);const note=document.createElement('p');note.className='hint';note.textContent='Esta vista muestra el borrador guardado en este navegador. No modifica la tienda pública.';area.append(note);area.hidden=!area.hidden;
};

/* Publicación autenticada: disponible únicamente desde /panel en Cloudflare. */
const publishButton = $('#publishDirect');
const publishStatus = $('#publishStatus');
if (isProtectedPanel) {
  publishButton.disabled = false;
  publishButton.textContent = '🚀 Publicar cambios';
  publishButton.removeAttribute('title');
  publishStatus.textContent = 'Administrador protegido · conectado a Cloudflare';
} else {
  publishStatus.textContent = 'Para publicar, ingresá desde el administrador protegido de Cloudflare.';
}
async function apiCatalog() {
  const response = await fetch('https://ventas-hugo-admin-api.hugominguezkhal.workers.dev/api/catalog', {credentials:'include',cache:'no-store'});
  const data = await response.json();
  if (!response.ok) throw Error(data.error || 'No se pudo consultar GitHub');
  return data;
}
async function fileBase64(file) {
  const buffer = new Uint8Array(await file.arrayBuffer());
  let binary = '';
  for (let i = 0; i < buffer.length; i += 8192) {
    binary += String.fromCharCode(...buffer.subarray(i,i+8192));
  }
  return btoa(binary);
}
if (isProtectedPanel) {
  apiCatalog().then(data => {
    baseCommit = data.baseCommit;
    const draft = localStorage.getItem(storage);
    if (!draft) {
      items = valid(data.products);
      save();
    }
    publishStatus.textContent = 'Conectado · catálogo verificado';
  }).catch(err => {
    publishButton.disabled = true;
    publishStatus.textContent = 'Error al consultar GitHub: ' + err.message;
  });
}
publishButton.addEventListener('click', async () => {
  if (!isProtectedPanel) return;
  if (pendingPhotos.size && !confirm('Las fotos nuevas solo están disponibles en esta pestaña. ¿Continuar con la publicación?')) return;
  if (!confirm('¿Publicar el catálogo y las fotografías en la tienda pública?')) return;
  publishButton.disabled = true;
  publishStatus.textContent = 'Verificando el catálogo…';
  try {
    const remote = await apiCatalog();
    if (baseCommit && remote.baseCommit !== baseCommit) throw Error('GitHub cambió desde que abriste el panel. No se publicó nada. Guardá una copia del JSON y revisá los cambios.');
    if (!baseCommit) throw Error('No se pudo verificar la versión inicial. Recargá el panel antes de publicar.');
    const photos = [];
    for (const [id, files] of pendingPhotos) {
      if (!items.some(p => p.id === id)) continue;
      for (const photo of files) {
        if(!items.find(p=>p.id===id)?.imagenes.includes('assets/'+photo.filename))continue;
        photos.push({path:'assets/'+photo.filename,type:photo.file.type,base64:await fileBase64(photo.file)});
      }
    }
    const payload = {products:valid(items),photos,baseCommit};
    publishStatus.textContent = 'Publicando en GitHub…';
    const response = await fetch('https://ventas-hugo-admin-api.hugominguezkhal.workers.dev/api/publish',{
      method:'POST',credentials:'include',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok || !result.published) throw Error(result.error || 'No se pudo publicar');
    baseCommit = result.commit;
    pendingPhotos.clear();
    publishStatus.textContent = 'Publicado correctamente · '+result.products+' productos · '+result.photos+' fotografías nuevas';
    msg('¡Publicado en GitHub! La tienda puede tardar unos minutos en actualizarse.');
  } catch (err) {
    publishStatus.textContent = 'No se publicó: '+err.message;
    msg('Los cambios locales se conservaron. '+err.message);
  } finally {
    publishButton.disabled = false;
  }
});

/* Compartir desde el administrador sin exponer permisos de edición. */
const publicStoreUrl='https://neo172023.github.io/mi-feria-online/';
async function shareStoreContent({title,text,url}){
 try{
  if(navigator.share){await navigator.share({title,text,url});return;}
  if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text+'\n'+url);msg('Enlace y descripción copiados. Pegalos en tu red social.');return;}
  prompt('Copiá este mensaje para compartir:',text+'\n'+url);
 }catch(err){if(err.name!=='AbortError')msg('No se pudo compartir: '+err.message)}
}
function shareStoreProduct(p){
 const url=publicStoreUrl+'?producto='+encodeURIComponent(p.id);
 const text=p.nombre+' · $ '+Number(p.precio).toLocaleString('es-AR')+' · '+p.estado+'\n'+p.descripcion;
 shareStoreContent({title:p.nombre,text,url});
}
(function(){
 const area=document.querySelector('.admin');
 if(!area)return;
 const panel=document.createElement('section');panel.className='panel';panel.style.marginBottom='20px';
 const heading=document.createElement('h2');heading.textContent='📣 Compartir mi tienda';
 const info=document.createElement('p');info.className='hint';info.textContent='Compartí toda la tienda o usá el botón Compartir de cada producto publicado.';
 const btn=document.createElement('button');btn.type='button';btn.textContent='📤 Compartir tienda completa';
 btn.onclick=()=>shareStoreContent({title:'Tienda online de Hugo Sebastián Domínguez',text:'Visitá mi tienda online y consultá los productos disponibles.',url:publicStoreUrl});
 panel.append(heading,info,btn);area.insertBefore(panel,area.querySelector('.admin-grid'));
})();
