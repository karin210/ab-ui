<script lang="ts">
	import '#lib/styles/classic-modal.css';
	import DocumentList from '#lib/components/modals/DocumentList.svelte';
	import { SAMPLE_DOCUMENTS, type DemoDocument } from '#lib/data/modalDemos.ts';
	import { simulateRequest } from '#lib/utils/simulateRequest.ts';
	import type { PatternProps } from '#lib/data/uiComponents.ts';

	// Accepts the shared pattern props; the modal opens over the same route, so it never reports a change.
	let {}: PatternProps = $props();

	const uid = $props.id();

	let dialog: HTMLDialogElement;
	let documents = $state<DemoDocument[]>([...SAMPLE_DOCUMENTS]);
	let pending = $state<DemoDocument | null>(null);
	let deleting = $state(false);

	function openModal(document: DemoDocument): void {
		pending = document;
		dialog.showModal();
	}

	function closeModal(): void {
		dialog.close();
	}

	// Standard convention: a click on the backdrop closes the modal.
	// `closedby="any"` does it natively; this covers browsers without it.
	function closeOnBackdrop(event: MouseEvent): void {
		if (event.target === dialog) closeModal();
	}

	async function confirmDelete(): Promise<void> {
		if (!pending) return;
		const target = pending;

		deleting = true;
		try {
			await simulateRequest();
			documents = documents.filter((document) => document.id !== target.id);
			closeModal();
		} finally {
			deleting = false;
		}
	}
</script>

<DocumentList
	{documents}
	ondelete={openModal}
	onrestore={() => (documents = [...SAMPLE_DOCUMENTS])}
/>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class="classic-modal"
	closedby="any"
	aria-labelledby="{uid}-title"
	aria-describedby="{uid}-text"
	onclick={closeOnBackdrop}
>
	<div class="classic-modal-body">
		<header class="classic-modal-header">
			<h2 id="{uid}-title" class="classic-modal-title">¿Estás seguro?</h2>
			<button type="button" class="classic-modal-close" aria-label="Cerrar" onclick={closeModal}>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
		</header>

		<p id="{uid}-text" class="classic-modal-text">Esta acción no se puede deshacer.</p>

		<footer class="classic-modal-footer">
			<button type="button" class="classic-modal-cancel" disabled={deleting} onclick={closeModal}>
				Cancelar
			</button>
			<button type="button" class="classic-modal-confirm" disabled={deleting} onclick={confirmDelete}>
				{deleting ? 'Eliminando…' : 'Aceptar'}
			</button>
		</footer>
	</div>
</dialog>
