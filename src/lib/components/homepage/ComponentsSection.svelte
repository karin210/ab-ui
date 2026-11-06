<script lang="ts">
	import { uiComponents } from '#lib/data/uiComponents.ts';
</script>

<section class="components" aria-labelledby="components-title">
	<div class="components-content">
		<h2 id="components-title" class="components-title">Componentes en prueba</h2>
		<ul class="cards">
			{#each uiComponents as component (component.slug)}
				<li>
					<a class="card" href="/showcase/{component.slug}">
						<h3 class="card-title">{component.name}</h3>
						<p class="card-text">{component.description}</p>
						<span class="card-cta">
							Ver {component.patterns.length} patrones <span aria-hidden="true">→</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.components {
		padding-inline: var(--page-gutter);
		padding-block: clamp(2rem, 6vh, 4rem) clamp(3rem, 10vh, 6rem);
	}

	.components-content {
		display: flex;
		flex-direction: column;
		gap: clamp(1.5rem, 4vw, 2.5rem);
		max-width: var(--content-max-width);
		margin-inline: auto;
	}

	.components-title {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
		line-height: 1.2;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
		gap: clamp(1rem, 3vw, 1.5rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		block-size: 100%;
		padding: clamp(1.25rem, 3vw, 1.75rem);
		border-radius: 1rem;
		background: var(--color-secondary);
		color: var(--color-text);
		text-decoration: none;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.card:hover {
		transform: translateY(-0.25rem);
		box-shadow: 0 0.75rem 1.5rem color-mix(in srgb, var(--color-primary) 20%, transparent);
	}

	.card-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem);
		line-height: 1.2;
	}

	.card-text {
		margin: 0;
		color: var(--color-text-muted);
	}

	.card-cta {
		margin-block-start: auto;
		color: var(--color-primary);
		font-weight: 600;
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none;
		}

		.card:hover {
			transform: none;
		}
	}
</style>
