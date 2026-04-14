# NexusNerd — Frontend React

Frontend de la tienda online NexusNerd desarrollado con React + TypeScript. Interfaz de usuario completa con navegación por productos, carrito de compra y proceso de checkout.

---

## Índice

1. [Tecnologías](#tecnologías)
2. [Requisitos previos](#requisitos-previos)
3. [Instalación y ejecución](#instalación-y-ejecución)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Arquitectura y decisiones técnicas](#arquitectura-y-decisiones-técnicas)
6. [Variables de entorno](#variables-de-entorno)
7. [API](#api)
8. [Páginas y rutas](#páginas-y-rutas)
9. [Estado global — Carrito](#estado-global--carrito)
10. [Despliegue en producción](#despliegue-en-producción)
11. [Pendientes y mejoras futuras](#pendientes-y-mejoras-futuras)

---

## Tecnologías

| Tecnología | Versión | Motivo |
|---|---|---|
| React | 18 | Biblioteca principal para construir la UI por componentes |
| TypeScript | 5 | Tipado estático para detectar errores antes de ejecutar |
| Vite | 5 | Herramienta de desarrollo moderna, arranque instantáneo |
| React Router DOM | 6 | Navegación entre páginas sin recargar el navegador (SPA) |
| Bootstrap | 5 | Framework CSS para maquetación y estilos rápidos |
| Font Awesome | 6 | Librería de iconos SVG |
| json-server | 0.17.4 | Fake API para desarrollo sin backend real |

---

## Requisitos previos

- Node.js >= 18
- npm >= 9
- Acceso a la red del instituto con VPN Wireguard activa (para producción)

---

## Instalación y ejecución

### Desarrollo local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/nexus-frontend.git
cd nexus-frontend

# 2. Instalar dependencias
npm install

# 3. Arrancar la fake API (terminal 1)
npm run api

# 4. Arrancar el frontend (terminal 2)
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.
La fake API estará disponible en `http://localhost:3001`.

### Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Arranca el servidor de desarrollo |
| `npm run build` | Genera el build de producción en `/dist` |
| `npm run api` | Arranca json-server con los datos de `db.json` |
| `npm run preview` | Previsualiza el build de producción en local |

---

## Estructura del proyecto

```
nexus-frontend/
├── public/                  # Archivos estáticos
├── src/
│   ├── components/
│   │   └── Navbar/
│   │       └── Navbar.tsx   # Barra de navegación global con contador de carrito
│   ├── context/
│   │   └── CartContext.tsx  # Estado global del carrito (Context API)
│   ├── data/
│   │   └── products.ts      # Datos de productos (usado mientras no hay API real)
│   ├── pages/
│   │   ├── HomePage.tsx     # Página de inicio con hero y features
│   │   ├── ShopPage.tsx     # Listado de productos
│   │   ├── ProductPage.tsx  # Detalle de un producto
│   │   ├── CartPage.tsx     # Carrito de compra
│   │   └── CheckoutPage.tsx # Formulario de finalización de compra
│   ├── services/
│   │   └── api.ts           # Funciones para llamar a la API
│   ├── types/
│   │   └── index.ts         # Interfaces TypeScript globales
│   ├── App.tsx              # Componente raíz con router y providers
│   └── main.tsx             # Punto de entrada de la aplicación
├── db.json                  # Datos de la fake API (json-server)
├── routes.json              # Mapeo de rutas para json-server
├── .env                     # Variables de entorno (desarrollo)
├── .env.production          # Variables de entorno (producción)
└── vite.config.ts           # Configuración de Vite
```

---

## Arquitectura y decisiones técnicas

### ¿Por qué React + TypeScript?

React permite construir interfaces como un árbol de componentes reutilizables. Cada componente es una función que recibe datos (props) y devuelve lo que se muestra en pantalla. TypeScript añade tipado estático encima de JavaScript, lo que significa que el editor avisa de errores de tipo antes de ejecutar el código. En un proyecto con múltiples interfaces de datos (productos, carrito, formularios), esto evita errores difíciles de detectar en tiempo de ejecución.

### ¿Por qué Vite?

Vite arranca el servidor de desarrollo de forma casi instantánea y aplica los cambios en el navegador sin recargar la página completa (Hot Module Replacement). Es la herramienta recomendada en 2025 para proyectos React, sustituyendo a Create React App que está deprecado.

### ¿Por qué React Router?

React es una Single Page Application (SPA): solo existe un `index.html`. React Router simula la navegación entre páginas cambiando lo que se renderiza según la URL, sin recargar el navegador. Esto hace la navegación instantánea y la experiencia de usuario fluida. Se usa `BrowserRouter` con rutas declarativas en `App.tsx`.

### ¿Por qué Context API para el carrito?

El carrito necesita ser accesible desde múltiples páginas simultáneamente: desde la tienda para añadir productos, desde el Navbar para mostrar el contador, y desde el carrito y el checkout para gestionar los items. Pasar el estado como props a través de todos los niveles de componentes (prop drilling) sería complejo y difícil de mantener. Context API permite crear un estado global accesible desde cualquier componente sin pasar props manualmente.

### ¿Por qué el carrito vive en el frontend?

El backend original gestiona el carrito con sesiones de Laravel que requieren autenticación. El proyecto especifica que el usuario es anónimo (compra como Guest). Por tanto, el carrito se gestiona completamente en el estado de React, sin llamadas al backend para esa funcionalidad. Si en el futuro se añade autenticación, habría que migrar el carrito a llamadas API.

### ¿Por qué datos locales en lugar de API?

La API de Laravel está en la rama `feature-api` del repositorio backend y no está desplegada en el servidor de producción. Para que el frontend sea funcional mientras se resuelve esa situación, los datos de productos se sirven desde `src/data/products.ts`. Cuando la API esté disponible, solo hay que modificar `services/api.ts` para hacer fetch real (ver sección [API](#api)).

---

## Variables de entorno

El proyecto usa variables de entorno de Vite (prefijo `VITE_`).

**`.env` (desarrollo):**
```
VITE_API_URL=http://localhost:3001/api
```

**`.env.production` (producción):**
```
VITE_API_URL=http://nexus.daw/api
```

> **Importante:** En el estado actual, `services/api.ts` no usa `VITE_API_URL` porque los datos vienen de `src/data/products.ts`. Cuando se conecte la API real, hay que restaurar el fetch y estas variables entrarán en uso.

---

## API

### Estado actual — datos locales

```ts
// src/services/api.ts
import { mockProducts } from '../data/products'

export const getProducts = async (): Promise<Product[]> => {
  return Promise.resolve(mockProducts)
}

export const getProduct = async (id: number): Promise<Product> => {
  const product = mockProducts.find(p => p.id === id)
  if (!product) throw new Error('Product not found')
  return Promise.resolve(product)
}
```

### Cuando la API real esté disponible

Sustituir `services/api.ts` por:

```ts
const API_URL = import.meta.env.VITE_API_URL

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) throw new Error('Error fetching products')
  return response.json()
}

export const getProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`)
  if (!response.ok) throw new Error('Product not found')
  return response.json()
}
```

### Endpoints esperados de la API Laravel

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/products` | Lista todos los productos |
| GET | `/api/products/{id}` | Detalle de un producto |

### Fake API para desarrollo

El proyecto incluye `db.json` con 8 productos de prueba y `routes.json` para mapear las rutas al formato `/api/products`.

```bash
npm run api  # Arranca json-server en http://localhost:3001
```

---

## Páginas y rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `HomePage` | Página de inicio con hero y sección de características |
| `/shop` | `ShopPage` | Listado de productos con botón de añadir al carrito |
| `/product/:id` | `ProductPage` | Detalle de un producto con imagen, descripción y stock |
| `/cart` | `CartPage` | Carrito con control de cantidades y resumen de precio |
| `/checkout` | `CheckoutPage` | Formulario de envío, método de pago y confirmación |

### Flujo completo de compra

```
HomePage → ShopPage → ProductPage → CartPage → CheckoutPage → Confirmación
```

### Comportamiento de rutas especiales

- Si el carrito está vacío y el usuario va a `/checkout`, se redirige automáticamente a `/cart`.
- Si un producto no existe en `/product/:id`, se muestra un mensaje de error con botón para volver a la tienda.

---

## Estado global — Carrito

El carrito está implementado con Context API en `src/context/CartContext.tsx`.

### API del contexto

```ts
const { 
  items,          // CartItem[] — lista de productos en el carrito
  addToCart,      // (product: Product) => void
  removeFromCart, // (productId: number) => void
  updateQuantity, // (productId: number, quantity: number) => void
  clearCart,      // () => void
  total,          // number — precio total calculado
  itemCount       // number — número total de unidades
} = useCart()
```

### Cómo consumirlo en un componente

```tsx
import { useCart } from '../context/CartContext'

function MyComponent() {
  const { addToCart, itemCount } = useCart()
  // ...
}
```

### Comportamiento de `addToCart`

Si el producto ya existe en el carrito, incrementa la cantidad en 1. Si no existe, lo añade con cantidad 1. Nunca duplica entradas.

### Comportamiento de `updateQuantity`

Si la cantidad es 0 o menor, elimina el producto del carrito automáticamente.

---

## Tipos TypeScript globales

Definidos en `src/types/index.ts`:

```ts
interface Product {
  id: number
  name: string
  price: number
  description?: string
  image_path?: string | null
  stock: number
  available: boolean
  category_id: number
}

interface CartItem {
  product: Product
  quantity: number
}
```

---

## Despliegue en producción

### Entorno actual

| Servicio | URL | IP servidor |
|---|---|---|
| Frontend React | `http://app.nexus.daw` | `10.2.111.211` |
| Backend Laravel | `http://nexus.daw` | `10.2.111.211` |

El acceso requiere VPN Wireguard activa con DNS apuntando a `10.2.241.123`.

### Proceso de despliegue

```bash
# 1. Hacer el build en local
npm run build

# 2. Subir la carpeta dist/ al repositorio
git add dist/
git commit -m "Update production build"
git push

# 3. En el servidor (10.2.111.211)
ssh isard@10.2.111.211
cd /home/isard/nexus-frontend
git pull

# 4. Copiar los archivos al contenedor Nginx
docker exec laravel-nginx mkdir -p /usr/share/nginx/nexus-app
docker cp /home/isard/nexus-frontend/dist/. laravel-nginx:/usr/share/nginx/nexus-app/

# 5. Recargar Nginx
docker exec laravel-nginx nginx -s reload
```

### Configuración Nginx del frontend

Archivo en el contenedor `laravel-nginx`: `/etc/nginx/conf.d/app.nexus.daw.conf`

```nginx
server {
    listen 80;
    server_name app.nexus.daw;

    root /usr/share/nginx/nexus-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

> **Importante:** El `try_files $uri $uri/ /index.html` es imprescindible para que React Router funcione correctamente. Sin él, recargar la página en cualquier ruta que no sea `/` devuelve 404.

---

## Pendientes y mejoras futuras

| Tarea | Descripción |
|---|---|
| Conectar API real | Desplegar rama `feature-api` del backend y restaurar fetch en `services/api.ts` |
| Resolver red Isard | Las máquinas `10.2.241.123` y `10.2.111.211` están en VLANs separadas, impide la conexión LDAP |
| Filtros en ShopPage | Filtrar productos por categoría y buscar por nombre |
| Persistencia del carrito | Guardar el carrito en `localStorage` para que no se pierda al recargar |