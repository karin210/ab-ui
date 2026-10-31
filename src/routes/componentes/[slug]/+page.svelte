<script lang="ts">
	import UrlBar from '#lib/components/UrlBar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const uiComponent = $derived(data.uiComponent);
</script>

<svelte:head>
	<title>{uiComponent.name} | ABUI</title>
	<meta name="description" content={uiComponent.description} />
</svelte:head>

<main>
	<header class="intro">
		<a class="back" href="/">← Volver al inicio</a>
		<h1 class="title">{uiComponent.name}</h1>
		<p class="lede">{uiComponent.description}</p>
	</header>

	<div class="patterns">
		{#each uiComponent.patterns as pattern (pattern.id)}
			{@const Pattern = pattern.component}
			<section class="pattern" aria-labelledby="pattern-{pattern.id}">
				<h2 id="pattern-{pattern.id}" class="pattern-title">{pattern.name}</h2>
				<p class="pattern-text">{pattern.description}</p>
				<div class="pattern-demo">
					<UrlBar />
					<Pattern />
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

	.intro {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.back {
		align-self: flex-start;
		color: var(--color-primary);
		font-weight: 600;
	}

	.title {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2rem, 1.4rem + 3vw, 3.5rem);
		line-height: 1.1;
		text-wrap: balance;
	}

	.lede,
	.pattern-text {
		margin: 0;
		color: var(--color-text-muted);
	}

	.patterns {
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
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 3vw, 1.5rem);
		padding: clamp(1.25rem, 3vw, 2rem);
		border-radius: 1rem;
		background: var(--color-surface);
		box-shadow: 0 0.25rem 1rem color-mix(in srgb, var(--color-primary) 10%, transparent);
	}
</style>
