# Zona Descuentos Mobile V2

Versión adaptada al nuevo diseño mobile:
- producto antes que precio
- cuota referenciada al producto
- proceso con Cabal: elegís producto → calificás → recibís compra → después recibís Cabal
- wizard multipaso
- payload listo para CRM

## Instalación

```bash
npm install
npm run dev
```

## Deploy Vercel

- Framework: Vite
- Build command: npm run build
- Output directory: dist

## CRM

Crear `.env`:

```bash
VITE_API_URL=https://tu-backend.com
```

El frontend envía POST a:

```bash
/lead
```

Si no hay `VITE_API_URL`, imprime el payload en consola.
