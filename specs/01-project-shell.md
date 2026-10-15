# SPEC 01 — project-shell

**Estado:** Implementado  
**Depende de:** —  
**Fecha:** 2026-10-15  
**Objetivo:** Crear el esqueleto de la app en `/app/`: estructura de carpetas, router hash-based, home screen con Molly + tiles de actividades, y configuración de deploy en GitHub Pages.

---

## Alcance

### Incluido
- Carpeta `/app/` con `index.html`, `app.js`, `router.js`, `styles/main.css`
- Hash router: `#/` → home, `#/:id` → vista de actividad
- Home screen: héroe con Molly (emoji animado) + al menos 2 tiles de actividad placeholder
- Punto de montaje para actividades (`<div id="activity-root">`)
- Registro estático de rutas: cada actividad es un objeto JS con `id`, `label`, `emoji`, `render()`
- Configuración de GitHub Pages: `.github/workflows/deploy.yml` sirviendo desde `/app/`
- `README.md` con instrucciones de desarrollo local

### No incluido (specs futuros)
- Implementación real de actividades (Math Farm, Touch Farm) — `02-activity-migration`
- Progreso, estrellas, localStorage — `03-activity-engine`
- Audio / síntesis de voz
- Perfil de padre / autenticación
- Migración de los HTML existentes en `/contexto/`

---

## Modelo de datos

Las rutas son un array de objetos de configuración registrados en `router.js`. No hay backend ni persistencia en este spec.

```js
// app/router.js
const ACTIVITIES = [
  {
    id: 'math',
    label: { es: 'Matemáticas', en: 'Math' },
    emoji: '🔢',
    color: '#2E7D32',
    render: (root) => { root.innerHTML = '<p>Math — próximamente</p>'; }
  },
  {
    id: 'touch',
    label: { es: 'La Granja', en: 'The Farm' },
    emoji: '🐄',
    color: '#C8452F',
    render: (root) => { root.innerHTML = '<p>Touch Farm — próximamente</p>'; }
  }
];
```

`render(root)` recibe el `<div id="activity-root">` y es responsable de pintarlo. Este contrato es el que specs futuros deben cumplir.

---

## Plan de implementación

Cada paso deja el sistema funcional (se puede abrir en el browser y no explota).

1. **Crear la estructura de carpetas**
   ```
   /app/
     index.html
     app.js
     router.js
     styles/
       main.css
     activities/
       .gitkeep
     assets/
       .gitkeep
   ```

2. **`app/index.html`** — HTML mínimo: `<div id="home-root">` + `<div id="activity-root" hidden>`, carga `app.js` como módulo ES6. Sin dependencias externas excepto Google Fonts (Baloo 2, ya usado en los prototipos).

3. **`app/styles/main.css`** — Variables CSS de la paleta de Molly (extraídas de Touch Farm 3: `--sky`, `--barn`, `--grass`, `--paper`, etc.), estilos base del shell (bar, screens, tiles).

4. **`app/router.js`** — Exporta `ACTIVITIES[]` y la función `Router` que:
   - En `DOMContentLoaded` y en `hashchange`, lee `location.hash`
   - Si es `#/` o vacío: muestra `#home-root`, oculta `#activity-root`, renderiza `HomeScreen`
   - Si es `#/:id`: busca en `ACTIVITIES`, oculta `#home-root`, muestra `#activity-root`, llama a `activity.render(root)`
   - Si el id no existe: redirige a `#/`

5. **`app/app.js`** — Importa `Router` y lo inicializa. Renderiza `HomeScreen` (Molly emoji + grid de tiles) con los datos de `ACTIVITIES`. Los tiles hacen `location.hash = '#/' + activity.id` al hacer click.

6. **Configuración GitHub Pages**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       permissions:
         pages: write
         id-token: write
       environment:
         name: github-pages
       steps:
         - uses: actions/checkout@v4
         - uses: actions/configure-pages@v4
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./app
         - uses: actions/deploy-pages@v4
   ```
   Activar GitHub Pages con source "GitHub Actions" en la config del repo.

7. **`README.md`** — Instrucciones de dev local:
   - Opción A: VS Code + extensión Live Server → click derecho en `app/index.html` → Open with Live Server
   - Opción B: `python -m http.server 8080 --directory app` → abrir `http://localhost:8080`
   - Nota: NO abrir `index.html` directo con `file://` — los módulos ES6 requieren un servidor HTTP

---

## Criterios de aceptación

- [x] `app/index.html` abre en el browser (via servidor local) sin errores de consola
- [x] Home screen muestra el emoji de Molly animado y los tiles de actividades definidas en `ACTIVITIES`
- [x] Click en un tile cambia la URL a `#/:id` y renderiza la pantalla de la actividad
- [x] Botón back del browser (o `history.back()`) regresa a home con `#/`
- [x] Hash inexistente (ej. `#/xyz`) redirige silenciosamente a `#/`
- [x] La app no usa `npm`, `node_modules`, ni requiere paso de build
- [x] Hacer push a `main` dispara el workflow y la app es accesible en `https://<user>.github.io/<repo>/`
- [x] Los HTML en `/contexto/` no son modificados ni referenciados por la nueva app

---

## Decisiones tomadas

| Decisión | Alternativa descartada | Razón |
|---|---|---|
| Vanilla JS sin build step | Vite, React | Máxima simplicidad para sesiones de 1h/día; cero overhead de tooling |
| Hash routing (`#/`) | History API (pushState) | GitHub Pages no requiere configuración extra de redirects con hash routing |
| App en `/app/`, prototipos en `/contexto/` | App en raíz, repo separado | Mantiene el historial de los prototipos sin contaminar el código productivo |
| Shell solo routing | Shell con estado global | Principio de responsabilidad única; el estado va en SPEC 03 (activity-engine) |
| `render(root)` como contrato de actividad | Importación dinámica | Los dynamic imports no funcionan con `file://`; el contrato síncrono es más simple y compatible |
| Registro estático en `ACTIVITIES[]` | Descubrimiento automático de módulos | Más explícito, más fácil de mantener con 1h/día |

---

## Riesgos identificados

- **Módulos ES6 y `file://`**: los `import` / `export` de ES6 requieren un servidor HTTP. Documentado en README. Riesgo bajo si el desarrollador tiene VS Code con Live Server instalado.
- **GitHub Pages delay**: el primer deploy puede tardar 2-5 minutos. No es bloqueante.
- **Escalado de `ACTIVITIES[]`**: cuando haya 10+ actividades el array crecerá. Aceptable para esta fase; en SPEC 03 o posterior se puede segmentar por área (math, language, logic).
