# abui-website

## Project description

abui is a website for A/B testing UI components. Each component page shows two or more working implementations ("patterns") of the same UI element side by side, so visitors can try them and vote for the one they find better. The goal is to compare UX conventions with real user feedback (e.g. a login form that validates as you type and never disables its button vs. the classic form with a disabled submit button and a "remember me" checkbox).

The site's UI copy is in Spanish.

## Stack

- **SvelteKit** with **Svelte 5** (runes mode is forced for project files in `vite.config.ts`), **TypeScript** and **Vite**. This is not a Nuxt project; follow the SvelteKit conventions from the global instructions.
- Currently uses `@sveltejs/adapter-auto`. The frontend has no server code (no `+server.ts`, `+page.server.ts` or `hooks.server.ts`), so it can be deployed as a static site.
- Local imports use the `#lib` / `#lib/*` subpath imports (mapped to `src/lib/` in `package.json`).

## Structure

- `src/routes/+page.svelte`: home page (hero and the list of components to compare).
- `src/routes/showcase/[slug]/`: one page per UI component, rendering its patterns. Unknown slugs throw a `404`.
- `src/routes/+error.svelte`: custom branded error / 404 page.
- `src/lib/data/uiComponents.ts`: the catalogue. Each `UiComponent` has a `slug`, `name`, `description` and a list of `ComponentPattern`s (`id`, `name`, `description`, Svelte `component`). Add a new component to compare by adding an entry here.
- `src/lib/components/`: no loose files. `homepage/` (`Hero`, `ComponentsSection`) holds components used only on the home page, `showcase/` (`UrlBar`) those used only on the component pages, and `global/` (`LoadingSpinner`) those imported by several pages or components. The pattern implementations are grouped by component (e.g. `login/`, `modals/`).
- `src/lib/validation/`: shared validation rules (e.g. `auth.ts` for email and password rules).
- `src/lib/utils/`: helpers and form state classes (e.g. `AuthForm.svelte.ts`, `generatePassword.ts`).
- `src/styles/app.css`: global styles (`:root` tokens, resets, typography, shared `.modal-*` classes), imported once in `src/routes/+layout.svelte` via `#styles/app.css`.
- `src/lib/styles/`: per-pattern stylesheets, imported by the pattern components that use them.

## Patterns

- Patterns are self-contained demos. They don't call a real backend; async actions are simulated (`simulateLogin.ts`).
- A pattern that simulates navigation (e.g. moving from sign-in to sign-up) reports the new route through the `onroutechange` prop, and the page shows it in a sample URL bar (`UrlBar`). Each catalogue entry's `defaultRoute` is the initial route shown.
- Modal patterns use native `<dialog>` with `showModal()` (full-page). Our modals use the shared `.modal-*` classes in `src/styles/app.css`; the conventional ones use `classic-modal.css`.

## Planned

- A **separate backend** (not part of this repo) will store visitors' votes for the patterns and let people create a profile. The backend technology and hosting are not decided yet.
- When it is added: one vote per user per component, votes and profile fields re-validated on the server, rate limiting / bot protection on voting, and CORS restricted to the site's domain.
