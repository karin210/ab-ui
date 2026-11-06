<script lang="ts">
	import LoadingSpinner from '#lib/components/global/LoadingSpinner.svelte';
	import DocumentList from '#lib/components/modals/DocumentList.svelte';
	import { SAMPLE_DOCUMENTS, type DemoDocument } from '#lib/data/modalDemos.ts';
	import { simulateRequest } from '#lib/utils/simulateRequest.ts';
	import type { PatternProps } from '#lib/data/uiComponents.ts';

	// Accepts the shared pattern props; the modal opens over the same route, so it never reports a change.
	let {}: PatternProps = $props();

	const uid = $props.id();

	let dialog: HTMLDialogElement;
	let list: ReturnType<typeof DocumentList> | undefined;
	let documents = $state<DemoDocument[]>([...SAMPLE_DOCUMENTS]);
	let pending = $state<DemoDocument | null>(null);
	let deleting = $state(false);
	let errorMessage = $state('');
	let statusMessage = $state('');

	function openModal(document: DemoDocument): void {
		pending = document;
		errorMessage = '';
		statusMessage = '';
		dialog.showModal();
	}

	function closeModal(): void {
		dialog.close();
	}

	// Non-dismissible: `closedby="none"` ignores Escape and outside clicks; browsers without it
	// still fire `cancel` on Escape, so block it here too.
	function blockCancel(event: Event): void {
		event.preventDefault();
	}

	async function deleteDocument(): Promise<void> {
		if (!pending) return;
		const target = pending;

		deleting = true;
		errorMessage = '';
		try {
			await simulateRequest();
			documents = documents.filter((document) => document.id !== target.id);
			closeModal();
			statusMessage = `Se eliminó «${target.name}».`;
			// The focused "Eliminar" button no longer exists; move focus to the list heading.
			list?.focusHeading();
		} catch {
			errorMessage = 'No pudimos eliminar el documento. Inténtalo de nuevo en un momento.';
		} finally {
			deleting = false;
		}
	}

	function restoreDocuments(): void {
		documents = [...SAMPLE_DOCUMENTS];
		statusMessage = '';
	}
</script>

<DocumentList bind:this={list} {documents} ondelete={openModal} onrestore={restoreDocuments} />

<p class="status" role="status">{statusMessage}</p>

<dialog
	bind:this={dialog}
	class="modal"
	closedby="none"
	aria-labelledby="{uid}-title"
	aria-describedby="{uid}-text"
	oncancel={blockCancel}
>
	<div class="modal-body" aria-busy={deleting}>
		<h2 id="{uid}-title" class="modal-title">¿Eliminar «{pending?.name}»?</h2>
		<p id="{uid}-text" class="modal-text">
			El documento se eliminará de forma permanente y no podrás recuperarlo.
		</p>

		<p class="modal-error" role="alert" hidden={!errorMessage}>{errorMessage}</p>

		<div class="modal-actions">
			<button
				type="button"
				class="modal-btn modal-btn-cancel"
				disabled={deleting}
				onclick={closeModal}
			>
				Cancelar
			</button>
			<button
				type="button"
				class="modal-btn modal-btn-danger"
				disabled={deleting}
				onclick={deleteDocument}
			>
				{#if deleting}
					<LoadingSpinner />
					Eliminando…
				{:else}
					Eliminar documento
				{/if}
			</button>
		</div>
	</div>
</dialog>

<style>
	.status {
		margin: 0;
		color: var(--color-text-muted);
	}

	.status:empty {
		display: none;
	}
</style>
