# Mini-ERP Frontend (Angular 21) - Mock mode

## Objetivo
Proyecto de demostración para arquitectura limpia, rapidez de entrega y buenas prácticas. Implementa un frontend en Angular 21 con componentes standalone, rutas modulares y servicios mock que simulan la API.

## Stack Tecnológico
- Angular 21
- TypeScript
- Standalone Components
- Bootstrap
- RxJS
- Chart.js + ng2-charts
- Angular Router
- HTTP Interceptors

## Características
- Autenticación mock (email/password) con token simulado.
- Roles: Vendedor, Administrador, Gerente.
- Ventas: crear venta, ver mis ventas.
- Admin: ver todas las ventas.
- Gerente: roles CRUD básico y dashboard con Chart.js.
- Mocks en `MockDbService` (BehaviorSubjects) para facilitar desarrollo offline.
- Bootstrap para UI rápida.
- Chart.js + ng2-charts para gráficos.

## Scripts
- `npm install`
- `npm start` (o `ng serve` si usas Angular CLI)
- `npm run build`

## Estructura
- `core/` modelos, servicios y guards.
- `features/` componentes por módulo (auth, ventas, admin, manager).
- `assets/seeds/seed.json` seed inicial.

## Decisiones técnicas
- Componentes Standalone: más simple y modular al usar `bootstrapApplication`.
- Mocks con BehaviorSubject: fácil de sustituir por HttpClient + backend.
- Guards por permiso: la autorización se basa en claims/permissions.
- Simple CQRS: las funciones de creación/lectura están en servicios específicos.

## Próximo paso (backend)
1. Crear backend .NET 10 con Clean Architecture (API, Application, Domain, Infrastructure).
2. Implementar endpoints: /auth/login, /products, /sales, /roles.
3. Sustituir MockDbService por `HttpClient` que apunte a la API.
4. Agregar EF Core + PostgreSQL (migraciones + seed).

## Usuarios de prueba
- seller1@erp.test / 123
- seller2@erp.test / 123
- seller3@erp.test / 123
- admin@erp.test / 123
- manager@erp.test / 123

## Características Principales

### Autenticación
- Login mock (email / password).
- Generación de token simulado (JWT-like).
- Persistencia de sesión en `localStorage`.
- Carga automática del usuario autenticado al refrescar la aplicación.

### Roles
- Vendedor
- Administrador
- Gerente

### Permisos
La autorización se basa en **permisos (claims)** y no únicamente en roles, permitiendo mayor flexibilidad y escalabilidad.

Ejemplos:
- `sales:create`
- `sales:view:own`
- `sales:view:all`
- `roles:manage`
- `dashboard:view`

---
