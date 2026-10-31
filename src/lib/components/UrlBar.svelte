<script lang="ts">
	interface Props {
		/** Route shown after the sample host. */
		path?: string;
		host?: string;
	}

	let { path = '/entrar', host = 'ejemplo.com' }: Props = $props();
</script>

<p class="url-bar">
	<span class="visually-hidden">Dirección de ejemplo:</span>
	<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
		<rect x="4" y="11" width="16" height="10" rx="2" />
		<path d="M8 11V7a4 4 0 0 1 8 0v4" />
	</svg>
	<span class="address"><span class="host">{host}</span>{path}</span>
</p>

<style>
	.url-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		padding: 0.5rem 0.875rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-background);
		color: var(--color-text-muted);
		font-size: clamp(0.8125rem, 0.8rem + 0.1vw, 0.9375rem);
	}

	svg {
		flex: none;
		inline-size: 1rem;
		block-size: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.address {
		min-inline-size: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.host {
		color: var(--color-ink);
	}
</style>
