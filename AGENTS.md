# Agents

Work in the package you are changing (`client/` or `server/`). Do not invent folders, libs, or layers. Prefer editing an existing file over adding a new one. No drive-by refactors, no extra docs unless asked.

## Naming and files

**Client**

- Components: PascalCase files (`ProductCard.tsx`). shadcn under `components/ui/` stays kebab-case (`dropdown-menu.tsx`).
- Folders: keep existing names (`product-details`, `filters-panel`, `headerOne`, `headerTwo`).
- Hooks: `useX.ts`, camelCase. Types: PascalCase in `src/types/`. Constants: `UPPER_SNAKE_CASE` in `src/constants/`.
- Default-export components and pages; named-export hooks, utils, API objects, Redux pieces.
- `"use client"` only where the file uses client APIs. Alias: `@/` → `src/`.
- Quotes and formatting: match the file (client is mostly double quotes). Use `cn()` for conditional classes.

**Server**

- `*Routes.ts` → `*Controller.ts` → Prisma. Register new routers in `src/app.ts`.
- camelCase files; PascalCase types. Prettier: single quotes, semicolons, trailing commas.
- Auth cookie via `generateToken`; protect with `protect`. Errors through `errorHandler` / `next(error)`.

Put new UI in the matching feature folder. New API calls go in `client/src/services/`. New async cart/wishlist/feedback work goes through slices + sagas, not ad-hoc `fetch` in components.

## Layers

Keep these separate:

| Layer | Client | Server |
| --- | --- | --- |
| UI | `app/`, `components/` | — |
| State | `hooks/`, `providers/`, `redux/` | — |
| API | `services/`, `constants/api.ts` | `routes/` |
| Domain | `types/` | Prisma models, controllers |
| Persistence | redux-persist (guest) | Prisma → PostgreSQL |

Do not call Prisma from the client. Do not put SQL or Express handlers in React. Do not add new Next route handlers unless the task is those leftover `app/api` files. Store wiring uses `redux/slices/`; some UI still imports `redux/cart/` and `redux/wishlist/` — keep the import path already used in that file.

## Size and splits

UI component files **≤ 120 lines**. Over that, extract a subcomponent, hook, constants, or types. Pages compose; they do not own business logic.

## Quality

Must pass before finishing:

- Client: `npm run lint` in `client/`. Typecheck: `npx tsc --noEmit`.
- Server: `npm run lint` in `server/`. Typecheck: `npx tsc --noEmit` (or `npm run build`).

No unused imports. No new test framework on the client (none is set up). Server Jest is configured; add tests only under `server/**/tests/**/*.test.ts` if asked.

## Secrets and env

Never commit `.env` or `.env.local`. Never paste secrets. Client public names: `NEXT_PUBLIC_SERVER_URL`, `NEXT_PUBLIC_OPENROUTER_*`, `NEXT_PUBLIC_SUPABASE_*`. Server: `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`, `GOOGLE_*`, `AUTH_COOKIE_NAME`, `PORT`, `NODE_ENV`. Axios must keep `withCredentials: true` for auth cookies.
