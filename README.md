# Supermercado – Gestión de inventario (PFY2202 · Semana 3)

Sitio web de gestión de inventario de un supermercado, desarrollado con **React 18**, **React Router**, **Context API + useReducer** y **Tailwind CSS**.

- **Autor:** Kevin Carrasco
- **Sitio publicado:** https://kevo1612.github.io/supermercado-kevin-carrasco-pfy2202/

## Funcionalidades

1. **Listado de inventario** – tarjetas con nombre, categoría, precio y stock.
2. **Filtro por categoría** – el filtro se calcula a partir del inventario (no lo modifica), por lo que no se pierden datos.
3. **Agregar artículo** – formulario con validaciones.
4. **Detalle de artículo** – al hacer clic en un artículo; permite elegir cantidad y agregar al carrito (descuenta stock).
5. **Carrito** – aumentar/disminuir cantidades, quitar artículos, vaciar y finalizar compra. Cada cambio actualiza el inventario general.

## Estructura

```
src/
├── components/   Navbar, TarjetaArticulo, FiltroCategoria, SelectorCantidad, LineaCarrito, ...
├── context/      InventarioContext.jsx (estado global y reglas de negocio)
├── data/         inventarioInicial.js
├── pages/        ListaArticulos, AgregarArticulo, DetalleArticulo, Carrito
└── App.jsx       Rutas
```

## Cómo ejecutar

```bash
npm install
npm run dev
```

## Publicar en GitHub Pages

```bash
npm run deploy
```

Luego en GitHub: *Settings → Pages → Branch: `gh-pages` / root*.
