# Ondea

Catálogo de los 100 podcasts musicales más populares de Apple. Se puede filtrar el listado, abrir la ficha de un podcast y reproducir un episodio. Las rutas son enlazables y el botón atrás del navegador funciona.

## Stack

| Pieza                    | Para qué                                                    |
| ------------------------ | ----------------------------------------------------------- |
| Next.js 16 (App Router)  | Rutas, SSR y empaquetado con Turbopack                      |
| React 19                 | UI por componentes                                          |
| TypeScript (`strict`)    | Contratos del dominio y de las props                        |
| Context API              | Estado de interfaz: búsqueda, género y navegación           |
| TanStack Query           | Caché de las respuestas de iTunes, no estado de UI          |
| CSS propio               | Variables, BEM y media queries, sin librería de componentes |
| Vitest + Testing Library | Dominio puro y controles del catálogo                       |
| ESLint + Prettier        | Cero alertas de lint y formato uniforme                     |

Turbopack cumple el papel de Webpack: en `pnpm dev` los assets se sirven sin minificar (con recarga); `pnpm build` los concatena y minifica, y `pnpm start` sirve esa build.

No hay librerías de componentes (antd, MUI, reactstrap ni similares). Cada control visible está escrito en este repositorio. `lucide-react` solo aporta los iconos del toggle de tema.

## Cómo ejecutarlo

Requisitos: Node.js 20+ y pnpm 11+.

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Producción:

```bash
pnpm build
pnpm start
```

`pnpm build && pnpm start` es suficiente para desplegar el mismo artefacto en cualquier host Node. No hace falta un servidor aparte para los datos: las route handlers hacen de proxy.

## Rutas

| Vista               | URL                                        |
| ------------------- | ------------------------------------------ |
| Listado             | `/`                                        |
| Detalle de podcast  | `/podcast/{podcastId}`                     |
| Detalle de episodio | `/podcast/{podcastId}/episode/{episodeId}` |

## Arquitectura

Cada capa tiene una sola razón para cambiar.

```
src/app            rutas y layout (Server Components)
src/app/api        proxy HTTP hacia iTunes
src/components     presentación
src/hooks          lectura de datos en el cliente
src/context        estado de interfaz
src/lib            dominio sin React
src/styles         CSS
```

- **Dominio** (`src/lib`): tipos, mapeo del JSON de iTunes, filtro, fechas, duración y saneado de HTML. No importa React, así que se prueba sin montar la UI.
- **Proxy** (`src/app/api`): el navegador no llama a Apple directamente. iTunes no envía CORS usable desde el origen de la app; el servidor sí puede. Si la petición directa falla, se reintenta vía allorigins.
- **Hooks**: `usePodcasts` y `usePodcastDetail` esconden la query, la clave de caché y el mapeo. Las vistas no conocen la URL de iTunes.
- **Context**: búsqueda, género y el flag del spinner de navegación. Es estado que el usuario cambia y que no viene del servidor.
- **UI**: compone esas piezas. Una vista no filtra el JSON crudo ni decide el TTL.

La frontera entre Context y TanStack Query es deliberada. Context guarda lo que el usuario está haciendo ahora (el texto del filtro). Query guarda lo que iTunes respondió y cuándo caduca. Mezclarlos obligaría a reimplementar deduplicación, reintentos y persistencia dentro del contexto.

## Decisiones de diseño

**SSR con datos iniciales.** Las páginas del listado, del podcast y del episodio piden los datos en el servidor (`loadPodcasts`, `loadPodcastDetail`) y los pasan como `initialData` a los hooks. El primer HTML ya trae el contenido. En el cliente, esa misma respuesta entra en la caché de 24 h, así que no se vuelve a pedir al hidratar.

**Proxy en el cliente, fetch directo en el servidor.** El refetch del navegador sigue yendo a `/api/podcasts`, donde el CORS ya está resuelto. El render de servidor llama a iTunes (o al fallback) sin dar una vuelta HTTP contra sí mismo.

**Controles controlados y tontos.** `CatalogSearchInput` y `CatalogGenreSelect` no leen el contexto. Reciben valor y callback. `HomeCatalog` es el único que une contexto, filtro y grid. Así cada control se prueba sin providers, y cambiar la fuente del estado no obliga a tocar el input.

**Filtro de género.** El enunciado pide filtrar por título y autor. El select es una extensión: con `all` por defecto ese filtro sigue aplicando sobre los 100 podcasts. No sustituye al campo de texto.

**Listado y episodios completos.** El filtro recorre todo el catálogo y la tabla muestra todos los episodios. No hay paginación en la vista: el número del badge es el total filtrado, no el de una página.

**Autor, imagen y título.** En la ficha, los tres vuelven a `/podcast/{id}`. Desde un episodio se regresa al podcast sin salir a Apple.

**Apariencia.** El tema claro es la referencia: fondo gris, cabecera blanca, enlace azul, badge rojo y tarjetas blancas con la imagen circular superpuesta. El tema oscuro reinterpreta esos mismos papeles (azul de enlace, rojo de badge, tarjetas sobre fondo oscuro) sin cambiar la estructura. Los dos viven en variables CSS (`src/styles/tokens.css`); los componentes no repiten hexadecimales. El toggle usa iconos de `lucide-react` y guarda la elección en `localStorage`. Por defecto se muestra el tema claro.

**HTML de episodios.** La descripción puede traer markup. Se sanea antes de pintarla (`isomorphic-dompurify`) para no ejecutar lo que venga en el feed.

## Componentes

| Componente                        | Por qué existe aparte                                                     |
| --------------------------------- | ------------------------------------------------------------------------- |
| `HomeCatalog`                     | Orquesta datos, filtro y grid. No pinta el input ni el select.            |
| `CatalogSearchInput`              | Un solo trabajo: avisar el texto escrito.                                 |
| `CatalogGenreSelect`              | Un solo trabajo: ofrecer `All genres` y avisar el género.                 |
| `PodcastCard`                     | La unidad repetida del grid (imagen, título, autor, enlace).              |
| `PodcastSidebar`                  | La ficha izquierda se repite en podcast y en episodio.                    |
| `PodcastDetailView`               | Tabla y lista móvil de episodios.                                         |
| `EpisodeDetailView`               | Título, descripción y `<audio>`.                                          |
| `AppHeader`                       | Logo a inicio, spinner y toggle de tema.                                  |
| `ThemeToggle`                     | Alterna claro y oscuro. Solo cambia la clase `dark`.                      |
| `Spinner`                         | El indicador de carga, independiente de dónde se coloque.                 |
| `LoadError`                       | El fallo de red se muestra en la vista, con reintento, y no en `console`. |
| `RichDescription` / `EpisodeHtml` | Texto de ficha frente a HTML saneado del episodio.                        |

## Caché

Hay dos sitios y un mismo plazo de 24 horas (`DAY_MS` / `revalidate: 86400`).

1. **Cliente.** TanStack Query marca listado (`["podcasts"]`) y detalle (`["podcast", id]`) como frescos durante 24 h, sin refetch al enfocar la ventana. `PersistQueryClientProvider` copia esa caché a `localStorage` (`ondea-query-cache`, `maxAge` 24 h). Volver a un podcast ya abierto no espera a la red.
2. **Servidor.** `fetch` de Next revalida la respuesta de iTunes a las 24 h. El HTML de la primera visita y los refetch del proxy reutilizan esa copia.

Qué se gana: menos llamadas a una API pública que no está pensada para ser golpeada en cada navegación, vuelta instantánea a un podcast ya visto, y un primer render con datos sin un spinner obligatorio.

`buster: "ondea-v4"` invalida de golpe las copias viejas de `localStorage` cuando cambia la forma de lo guardado. Subir el buster es la estrategia de invalidación; no hace falta borrar el almacenamiento a mano.

`isCacheFresh` expresa la misma regla de TTL y la cubren los tests. La caducidad en runtime la aplican Query (`staleTime`) y `revalidate`, no una lectura manual en cada componente.

## Tests, lint y formato

```bash
pnpm test:run
pnpm lint
pnpm format
```

El filtro de dominio, que es el comportamiento que el usuario nota al escribir, se prueba sin montar React:

```ts
it("filters by title immediately", () => {
  expect(
    filterPodcasts(podcasts, "song", "all").map((item) => item.id),
  ).toEqual(["1", "2"]);
});

it("filters by author", () => {
  expect(filterPodcasts(podcasts, "npr", "all")).toHaveLength(2);
});
```

Los controles del toolbar tienen sus propios tests (`catalog-search-input.test.tsx`, `catalog-genre-select.test.tsx`): escribir notifica el string, y elegir un género notifica ese valor. No levantan el catálogo ni el contexto.

## Git

Commits en [Conventional Commits](https://www.conventionalcommits.org/): `feat` para comportamiento nuevo, `fix` para correcciones, `refactor` para cambios sin cambio de comportamiento, `test` y `docs` para lo que dicen. El asunto va en imperativo y el cuerpo, si hace falta, explica el porqué.

Ramas: `feat/…` y `fix/…` salen de `main`. El trabajo se integra con pull request cuando hay remoto.
