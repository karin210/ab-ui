<script lang="ts">
	import UrlBar from '#lib/components/showcase/UrlBar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	// Simulated route shown in each pattern's URL bar, keyed by pattern id.
	let routes = $state<Record<string, string>>({});
	const slugComponent = $derived(data.uiComponent);
</script>

<svelte:head>
	<title>{slugComponent.name} | ABUI</title>
	<meta name="description" content={slugComponent.description} />
</svelte:head>

<main>
	<header class="showcase-header">
		<a class="home-link" href="/">← Volver al inicio</a>
		<h1 class="showcase-name">{slugComponent.name}</h1>
		<p class="showcase-description">{slugComponent.description}</p>
	</header>

	<div class="pattern-list">
		{#each slugComponent.patterns as pattern (pattern.id)}
			{@const Pattern = pattern.component}
			<section class="pattern" aria-labelledby="pattern-{pattern.id}">
				<h2 id="pattern-{pattern.id}" class="pattern-title">{pattern.name}</h2>
				<p class="pattern-description">{pattern.description}</p>
				<UrlBar path={routes[pattern.id] ?? slugComponent.defaultRoute} />
				<div class="pattern-demo">
					<Pattern onroutechange={(route) => (routes[pattern.id] = route)} />
				</div>
			</section>
		{/each}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: clamp(2rem, 6vw, 3.5rem);
		max-width: var(--content-max-width);
		margin-inline: auto;
		padding-inline: var(--page-gutter);
		padding-block: clamp(2rem, 6vh, 4rem);
	}

	.showcase-header {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.home-link {
		align-self: flex-start;
		color: var(--color-primary);
		font-weight: 600;
	}

	.showcase-name {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2rem, 1.4rem + 3vw, 3.5rem);
		line-height: 1.1;
		text-wrap: balance;
	}

	.showcase-description,
	.pattern-description {
		margin: 0;
		color: var(--color-text-muted);
	}

	.pattern-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: clamp(1.5rem, 4vw, 2.5rem);
		align-items: start;
	}

	.pattern {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.pattern-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);
	}

	.pattern-demo {
		padding: clamp(1.25rem, 3vw, 2rem);
		border-radius: 1rem;
		background: var(--color-surface);
		box-shadow: 0 0.25rem 1rem color-mix(in srgb, var(--color-primary) 10%, transparent);
	}
</style>
