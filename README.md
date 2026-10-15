# 🐄 Molly's Farm

Aplicación educativa adaptativa para niños en edad preescolar y primaria.
Personaje principal: **Molly la Vaca** y sus amigos de la granja.
Bilingual ES/EN · Vanilla JS · Sin build step.

---

## Desarrollo local

Los módulos ES6 requieren un servidor HTTP — no abrir `index.html` directo con `file://`.

**Opción A — Python (recomendado)**

```bash
python -m http.server 8080 --directory app
```

Abrir: `http://localhost:8080`

**Opción B — VS Code Live Server**

1. Abrir `app/index.html` en VS Code
2. Click derecho → "Open with Live Server"

---

## Estructura del proyecto

```
molly/
├── app/                  ← App productiva
│   ├── index.html        ← Entry point
│   ├── app.js            ← Inicialización + home screen
│   ├── router.js         ← Hash router + registro de actividades
│   ├── styles/
│   │   └── main.css      ← Paleta Molly + estilos del shell
│   ├── activities/       ← Un módulo por actividad (specs futuros)
│   └── assets/           ← Sprites, audio
├── contexto/             ← Prototipos HTML (referencia, no tocar)
├── specs/                ← Specs del proyecto
└── .github/workflows/    ← Deploy automático a GitHub Pages
```

## Agregar una actividad

1. Agregar un objeto a `ACTIVITIES[]` en `app/router.js`:

```js
{
  id: 'letters',
  label: { es: 'Letras', en: 'Letters' },
  emoji: '🔤',
  color: '#1565C0',
  tileBackground: '#E3F2FD',
  sub: { es: 'El abecedario con Molly', en: 'The alphabet with Molly' },
  render(root) { /* lógica de la actividad */ }
}
```

2. La actividad aparece automáticamente como tile en la home screen.

## Deploy

Push a `main` → GitHub Actions publica `/app` en GitHub Pages automáticamente.

Activar Pages en el repo: **Settings → Pages → Source: GitHub Actions**

---

## Specs

| # | Nombre | Estado |
|---|--------|--------|
| 01 | project-shell | Aprobado |
