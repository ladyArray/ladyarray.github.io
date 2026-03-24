# Regy Portfolio

Portfolio personal de Regy construido con React, Vite, Tailwind CSS, Framer Motion y React Three Fiber.

Dirección visual:
Un digital observatory oscuro y cinematográfico, con capas de luz fría, glassmorphism refinado y una presencia 3D orbital que transmite estructura técnica, profundidad y criterio visual.

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Three Fiber

## Ejecutar en local

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

Preview local:

```bash
npm run preview
```

## Dónde editar contenido

- Copy, navegación, skills, experiencia, proyectos y contacto:
  `src/data/portfolio.js`
- Layout principal:
  `src/App.jsx`
- Hero y escena 3D:
  `src/components/HeroSection.jsx`
  `src/components/SceneCanvas.jsx`
- Estilos globales y sistema visual:
  `src/index.css`

## Notas

- El email se ha dejado como placeholder editable para no publicar una dirección no confirmada.
- La escena 3D se carga de forma diferida para reducir el peso de entrada.
