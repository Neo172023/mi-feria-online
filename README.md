# Ventas de Hugo Domínguez

Catálogo de ventas particulares listo para publicar en GitHub Pages, sin backend.

## Publicación
1. Creá un repositorio público en GitHub (por ejemplo `mi-feria-online`).
2. Subí **todos los archivos de esta carpeta a la raíz del repositorio** (incluido `productos.json`).
3. En **Settings → Pages → Build and deployment**, elegí **Deploy from a branch**, rama **main**, carpeta **/(root)** y guardá.
4. Esperá a que GitHub publique el sitio en `https://TU-USUARIO.github.io/mi-feria-online/`.

## Personalización
- En `config.js`, cambiá `whatsapp`, `nombre` y `moneda`.
- En `productos.json`, editá el catálogo: `id` (único y estable), `nombre`, `categoria`, `descripcion`, `precio`, `precioAnterior` (opcional), `imagen`, `emoji`, `estado` (Disponible, Reservado o Vendido), `fecha` (AAAA-MM-DD).
- Guardá las fotos en `assets/` y usá rutas como `assets/taladro.jpg` en `imagen`.
- Los tres artículos incluidos son **ejemplos ficticios**: reemplazalos antes de compartir la página.
- Para publicar cambios, editá `productos.json` en GitHub y confirmá (Commit changes).

## Panel visual de administración
1. Abrí `admin.html` desde tu sitio publicado o desde un servidor local.
2. Editá, agregá, eliminá o cambiá el estado de los productos. Se guardan temporalmente en el navegador.
3. Pulsá **Descargar productos.json**.
4. En GitHub, reemplazá `productos.json` por el descargado y confirmá los cambios (commit).
5. Para fotografías nuevas, subilas por separado a `assets/` y usá su ruta en el formulario.

**Seguridad y límites:** `admin.html` es una herramienta de edición local pública, no un panel privado con autenticación. No guarda contraseñas ni tokens, no actualiza GitHub automáticamente y sus borradores quedan solo en el navegador utilizado. El catálogo publicado cambia únicamente cuando el propietario hace commit en el repositorio. Para edición privada sincronizada entre dispositivos y publicación automática se necesita autenticación y un servicio externo/backend.

## Notas importantes
- Los enlaces `?producto=...` filtran el catálogo al artículo elegido. Para vista previa personalizada al compartir en redes sociales (imagen y título por artículo) se requiere una solución adicional de generación de páginas estáticas.
- GitHub Pages aloja sitios estáticos. Este proyecto **no incluye login, panel privado autenticado, pagos online ni base de datos**.
- Para probar localmente, ejecutá `python -m http.server 8000` dentro de esta carpeta y abrí `http://localhost:8000`.
- Antes de publicar, verificá que el número de WhatsApp sea el correcto.
