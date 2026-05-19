# Zona Descuentos MVP

Landing React/Vite lista para subir a GitHub/Vercel.

## Instalar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## CRM

Por defecto imprime el payload en consola.

Para conectar backend/CRM, crear `.env`:

```bash
VITE_API_URL=https://tu-backend.com
```

El frontend enviará POST a:

```bash
POST /lead
```

## Cambiar productos

Editar `PRODUCTS` en:

```bash
src/App.jsx
```

## Marca

Usa:
- Zona Descuentos
- asociada a credizona
