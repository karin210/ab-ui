<script lang="ts">
	import '#lib/styles/classic-form.css';
	import '#lib/styles/classic-modal.css';
	import ProfileCard from '#lib/components/modals/ProfileCard.svelte';
	import { SAMPLE_PROFILE, type Profile } from '#lib/data/modalDemos.ts';
	import { simulateRequest } from '#lib/utils/simulateRequest.ts';
	import type { PatternProps } from '#lib/data/uiComponents.ts';

	// Accepts the shared pattern props; the modal opens over the same route, so it never reports a change.
	let {}: PatternProps = $props();

	const uid = $props.id();

	let dialog: HTMLDialogElement;
	let profile = $state<Profile>({ ...SAMPLE_PROFILE });
	let draft = $state<Profile>({ ...SAMPLE_PROFILE });
	let saving = $state(false);
	let saved = $state(false);

	function openModal(): void {
		draft = { ...profile };
		saved = false;
		dialog.showModal();
	}

	function closeModal(): void {
		dialog.close();
	}

	// Standard convention: a click on the backdrop closes the modal and discards the changes.
	// `closedby="any"` does it natively; this covers browsers without it.
	function closeOnBackdrop(event: MouseEvent): void {
		if (event.target === dialog) closeModal();
	}

	async function handleSubmit(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		saving = true;
		try {
			await simulateRequest();
			profile = { ...draft };
			closeModal();
			saved = true;
		} finally {
			saving = false;
		}
	}
</script>

<ProfileCard {profile} onedit={openModal} />

<p class="classic-status" role="status" hidden={!saved}>
	{#if saved}Cambios guardados.{/if}
</p>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class="classic-modal"
	closedby="any"
	aria-labelledby="{uid}-title"
	onclick={closeOnBackdrop}
>
	<form class="classic-modal-body" onsubmit={handleSubmit}>
		<header class="classic-modal-header">
			<h2 id="{uid}-title" class="classic-modal-title">Editar perfil</h2>
			<button type="button" class="classic-modal-close" aria-label="Cerrar" onclick={closeModal}>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
		</header>

		<div class="classic-field">
			<label for="{uid}-name">Nombre</label>
			<input
				id="{uid}-name"
				class="classic-input"
				type="text"
				name="name"
				autocomplete="name"
				required
				bind:value={draft.name}
			/>
		</div>

		<div class="classic-field">
			<label for="{uid}-email">Correo electrónico</label>
			<input
				id="{uid}-email"
				class="classic-input"
				type="email"
				name="email"
				autocomplete="email"
				required
				bind:value={draft.email}
			/>
		</div>

		<div class="classic-field">
			<label for="{uid}-bio">Biografía</label>
			<textarea id="{uid}-bio" class="classic-input" name="bio" rows="4" bind:value={draft.bio}
			></textarea>
		</div>

		<footer class="classic-modal-footer">
			<button type="button" class="classic-modal-cancel" disabled={saving} onclick={closeModal}>
				Cancelar
			</button>
			<button type="submit" class="classic-modal-confirm" disabled={saving}>
				{saving ? 'Guardando…' : 'Guardar'}
			</button>
		</footer>
	</form>
</dialog>
