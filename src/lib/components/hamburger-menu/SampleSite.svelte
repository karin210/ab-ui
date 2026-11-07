<script lang="ts">
	import type { PatternProps } from '#lib/data/uiComponents.ts';

	interface Props extends PatternProps {
		/** Where the menu button sits: always left, always right, or right on phones and left from tablets up. */
		placement: 'left' | 'right' | 'hybrid';
	}

	interface SamplePage {
		route: string;
		label: string;
		heading: string;
		text: string;
	}

	let { placement, onroutechange }: Props = $props();

	const pages: SamplePage[] = [
		{
			route: '/',
			label: 'Inicio',
			heading: 'Diseñamos espacios que inspiran',
			text: 'Interiorismo y reformas para hogares y oficinas, del primer boceto a la entrega de llaves.'
		},
		{
			route: '/servicios',
			label: 'Servicios',
			heading: 'Nuestros servicios',
			text: 'Diseño de interiores, reformas integrales y asesoría de color y mobiliario.'
		},
		{
			route: '/proyectos',
			label: 'Proyectos',
			heading: 'Proyectos recientes',
			text: 'Un ático luminoso, una cafetería de barrio y un estudio de arquitectura renovado.'
		},
		{
			route: '/contacto',
			label: 'Contacto',
			heading: 'Hablemos de tu proyecto',
			text: 'Escríbenos y te respondemos en menos de 24 horas con una primera propuesta.'
		}
	];

	const highlights = ['Interiorismo', 'Reformas', 'Asesoría'];

	let current = $state.raw(pages[0]);
	let menuOpen = $state(false);
	let menu: HTMLDetailsElement | undefined = $state();

	function navigate(event: MouseEvent, page: SamplePage): void {
		event.preventDefault();
		current = page;
		menuOpen = false;
		onroutechange?.(page.route);
	}

	function closeOnEscape(event: KeyboardEvent): void {
		if (event.key !== 'Escape' || !menuOpen) return;
		const focusWasInMenu = menu?.contains(document.activeElement) ?? false;
		menuOpen = false;
		if (focusWasInMenu) menu?.querySelector('summary')?.focus();
	}

	function closeOnOutsideClick(event: MouseEvent): void {
		if (menuOpen && !menu?.contains(event.target as Node)) menuOpen = false;
	}
</script>

<svelte:document onclick={closeOnOutsideClick} onkeydown={closeOnEscape} />

{#snippet brand()}
	<a class="site-brand" href="/" onclick={(event) => navigate(event, pages[0])}>Estudio Nube</a>
{/snippet}

{#snippet menuButton()}
	<details class="site-menu" bind:open={menuOpen} bind:this={menu}>
		<summary class="menu-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
			<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
				{#if menuOpen}
					<path d="M6 6l12 12M18 6L6 18" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" />
				{/if}
			</svg>
		</summary>
		<nav class="menu-panel" aria-label="Menú principal">
			<ul class="menu-links">
				{#each pages as page (page.route)}
					<li>
						<a
							class="menu-link"
							href={page.route}
							aria-current={page === current ? 'page' : undefined}
							onclick={(event) => navigate(event, page)}
						>
							{page.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</details>
{/snippet}

<div class="sample-site" data-placement={placement}>
	<!-- DOM order follows the visual order on the screens where each placement is fixed. -->
	<header class="site-header">
		{#if placement === 'right'}
			{@render brand()}
			{@render menuButton()}
		{:else}
			{@render menuButton()}
			{@render brand()}
		{/if}
	</header>

	<article class="site-page">
		<h3 class="site-page-heading">{current.heading}</h3>
		<p class="site-page-text">{current.text}</p>
		<ul class="site-highlights">
			{#each highlights as highlight (highlight)}
				<li class="site-highlight">{highlight}</li>
			{/each}
		</ul>
	</article>
</div>

<style>
	.sample-site {
		--site-header-height: 4rem;

		container: sample-site / inline-size;
		position: relative;
		display: flex;
		flex-direction: column;
		block-size: 100%;
		overflow: hidden;
		background: var(--color-background);
		color: var(--color-text);
	}

	.site-header {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		block-size: var(--site-header-height);
		padding-inline: 0.75rem 1.25rem;
		background: var(--color-primary);
		color: var(--color-ink);
	}

	/* Focus ring in ink: the global primary ring would vanish on the primary header. */
	.site-header :focus-visible {
		outline-color: var(--color-ink);
	}

	.site-brand {
		color: inherit;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.125rem, 1rem + 0.75cqi, 1.5rem);
		text-decoration: none;
	}

	/* Placement A: button and brand side by side on the left. */
	[data-placement='left'] .site-header {
		justify-content: flex-start;
	}

	/* Placement C, mobile first: the button goes to the right like placement B... */
	[data-placement='hybrid'] .site-menu {
		order: 1;
	}

	.menu-button {
		display: grid;
		place-items: center;
		inline-size: 3rem;
		block-size: 3rem;
		border-radius: 0.5rem;
		list-style: none;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.menu-button::-webkit-details-marker {
		display: none;
	}

	.menu-button:hover {
		background: color-mix(in srgb, var(--color-surface) 25%, transparent);
	}

	.menu-button svg {
		inline-size: 1.75rem;
		block-size: 1.75rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
	}

	/* The drawer opens below the header, on the same side as the button. */
	.menu-panel {
		position: absolute;
		inset-block: var(--site-header-height) 0;
		inset-inline-end: 0;
		z-index: 1;
		inline-size: min(80%, 20rem);
		padding: 1rem;
		background: var(--color-surface);
		box-shadow: 0 0.75rem 2rem color-mix(in srgb, var(--color-ink) 20%, transparent);
	}

	[data-placement='left'] .menu-panel {
		inset-inline: 0 auto;
	}

	/* ...and from tablet widths up it moves to the left like placement A. */
	@container sample-site (min-width: 48rem) {
		[data-placement='hybrid'] .site-header {
			justify-content: flex-start;
		}

		[data-placement='hybrid'] .site-menu {
			order: 0;
		}

		[data-placement='hybrid'] .menu-panel {
			inset-inline: 0 auto;
		}
	}

	.menu-links {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.menu-link {
		display: block;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		color: var(--color-ink);
		font-size: clamp(1rem, 0.95rem + 0.25cqi, 1.125rem);
		font-weight: 500;
		text-decoration: none;
	}

	.menu-link:hover,
	.menu-link[aria-current='page'] {
		background: var(--color-secondary);
	}

	.menu-link[aria-current='page'] {
		font-weight: 700;
	}

	.site-page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: clamp(1.5rem, 4cqi, 4rem) clamp(1.25rem, 5cqi, 5rem);
	}

	.site-page-heading {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.75rem, 1rem + 3cqi, 3rem);
		line-height: 1.15;
		text-wrap: balance;
	}

	.site-page-text {
		margin: 0;
		max-inline-size: 40rem;
		color: var(--color-text-muted);
		font-size: clamp(1rem, 0.95rem + 0.25cqi, 1.125rem);
	}

	.site-highlights {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.site-highlight {
		padding: 1.5rem 1.25rem;
		border-radius: 0.75rem;
		background: var(--color-surface);
		font-weight: 600;
		font-size: clamp(1rem, 0.95rem + 0.25cqi, 1.125rem);
	}
</style>
