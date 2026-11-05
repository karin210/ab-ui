<script lang="ts">
	import type { DemoDocument } from '#lib/data/modalDemos.ts';

	interface Props {
		documents: DemoDocument[];
		ondelete: (document: DemoDocument) => void;
		onrestore: () => void;
	}

	let { documents, ondelete, onrestore }: Props = $props();

	const uid = $props.id();
	let heading: HTMLHeadingElement;

	/** Gives focus a sensible place after the focused row has been removed. */
	export function focusHeading(): void {
		heading.focus();
	}
</script>

<section class="documents" aria-labelledby="{uid}-title">
	<h3 id="{uid}-title" class="title" tabindex="-1" bind:this={heading}>Mis documentos</h3>

	{#if documents.length > 0}
		<ul class="list">
			{#each documents as document (document.id)}
				<li class="row">
					<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						<path d="M7 3h7l5 5v13H7z" />
						<path d="M14 3v5h5" />
					</svg>
					<div class="info">
						<span class="name">{document.name}</span>
						<span class="meta">{document.kind} · {document.updated}</span>
					</div>
					<button type="button" class="delete" onclick={() => ondelete(document)}>
						Eliminar<span class="visually-hidden"> «{document.name}»</span>
					</button>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="empty">
			<p class="empty-text">No quedan documentos.</p>
			<button type="button" class="restore" onclick={onrestore}>Restaurar documentos de ejemplo</button>
		</div>
	{/if}
</section>

<style>
	.documents {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.title {
		margin: 0;
		font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.625rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
	}

	.icon {
		flex: none;
		inline-size: 1.5rem;
		block-size: 1.5rem;
		fill: none;
		stroke: var(--color-primary);
		stroke-width: 1.75;
		stroke-linejoin: round;
	}

	.info {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-inline-size: 0;
	}

	.name {
		font-weight: 600;
		overflow-wrap: anywhere;
	}

	.meta {
		color: var(--color-text-muted);
		font-size: clamp(0.75rem, 0.7375rem + 0.1vw, 0.875rem);
	}

	.delete,
	.restore {
		flex: none;
		padding: 0.375rem 0.75rem;
		border: 1px solid var(--color-error);
		border-radius: 0.5rem;
		background: transparent;
		color: var(--color-error);
		font: inherit;
		font-size: clamp(0.875rem, 0.85rem + 0.15vw, 1rem);
		font-weight: 600;
		cursor: pointer;
	}

	.delete:hover {
		background: color-mix(in srgb, var(--color-error) 8%, transparent);
	}

	.restore {
		align-self: flex-start;
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	.restore:hover {
		background: var(--color-secondary);
	}

	.empty {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.empty-text {
		margin: 0;
		color: var(--color-text-muted);
	}
</style>
