<script lang="ts">
	import LoadingSpinner from '#lib/components/LoadingSpinner.svelte';
	import ProfileCard from '#lib/components/modals/ProfileCard.svelte';
	import { SAMPLE_PROFILE, type Profile } from '#lib/data/modalDemos.ts';
	import { ProfileForm, type ProfileField } from '#lib/utils/ProfileForm.svelte.ts';
	import { simulateRequest } from '#lib/utils/simulateRequest.ts';
	import { MAX_BIO_LENGTH } from '#lib/validation/profile.ts';
	import type { PatternProps } from '#lib/data/uiComponents.ts';

	// Accepts the shared pattern props; the modal opens over the same route, so it never reports a change.
	let {}: PatternProps = $props();

	const uid = $props.id();
	const form = new ProfileForm(SAMPLE_PROFILE);
	const fields: Partial<Record<ProfileField, HTMLInputElement | HTMLTextAreaElement>> = {};

	let dialog: HTMLDialogElement;
	let profile = $state<Profile>({ ...SAMPLE_PROFILE });
	let saving = $state(false);
	let errorMessage = $state('');
	let statusMessage = $state('');

	function openModal(): void {
		form.load(profile);
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

	async function handleSubmit(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		const invalidField = form.validate();
		if (invalidField) {
			fields[invalidField]?.focus();
			return;
		}

		saving = true;
		errorMessage = '';
		try {
			await simulateRequest();
			profile = form.toProfile();
			closeModal();
			statusMessage = 'Perfil actualizado.';
		} catch {
			errorMessage = 'No pudimos guardar los cambios. Inténtalo de nuevo en un momento.';
		} finally {
			saving = false;
		}
	}
</script>

<ProfileCard {profile} onedit={openModal} />

<p class="status" role="status">{statusMessage}</p>

<dialog
	bind:this={dialog}
	class="modal"
	closedby="none"
	aria-labelledby="{uid}-title"
	oncancel={blockCancel}
>
	<form class="modal-body" novalidate onsubmit={handleSubmit} aria-busy={saving}>
		<h2 id="{uid}-title" class="modal-title">Editar perfil</h2>

		<div class="modal-field">
			<label class="modal-label" for="{uid}-name">Nombre</label>
			<input
				bind:this={fields.name}
				id="{uid}-name"
				class="modal-input"
				type="text"
				name="name"
				autocomplete="name"
				data-mark={form.mark('name')}
				aria-invalid={form.guidance('name') !== ''}
				aria-describedby="{uid}-name-guidance"
				bind:value={form.name}
				oninput={() => form.touch('name')}
				onblur={() => form.leave('name')}
			/>
			<p
				id="{uid}-name-guidance"
				class="modal-guidance"
				aria-live="polite"
				hidden={!form.guidance('name')}
			>
				{form.guidance('name')}
			</p>
		</div>

		<div class="modal-field">
			<label class="modal-label" for="{uid}-email">Correo electrónico</label>
			<input
				bind:this={fields.email}
				id="{uid}-email"
				class="modal-input"
				type="email"
				name="email"
				autocomplete="email"
				data-mark={form.mark('email')}
				aria-invalid={form.guidance('email') !== ''}
				aria-describedby="{uid}-email-guidance"
				bind:value={form.email}
				oninput={() => form.touch('email')}
				onblur={() => form.leave('email')}
			/>
			<p
				id="{uid}-email-guidance"
				class="modal-guidance"
				aria-live="polite"
				hidden={!form.guidance('email')}
			>
				{form.guidance('email')}
			</p>
		</div>

		<div class="modal-field">
			<label class="modal-label" for="{uid}-bio">Biografía (opcional)</label>
			<textarea
				bind:this={fields.bio}
				id="{uid}-bio"
				class="modal-input"
				name="bio"
				data-mark={form.mark('bio')}
				aria-invalid={form.guidance('bio') !== ''}
				aria-describedby="{uid}-bio-guidance {uid}-bio-count"
				bind:value={form.bio}
				oninput={() => form.touch('bio')}
				onblur={() => form.leave('bio')}
			></textarea>
			<p id="{uid}-bio-count" class="count">{form.bio.trim().length} / {MAX_BIO_LENGTH}</p>
			<p
				id="{uid}-bio-guidance"
				class="modal-guidance"
				aria-live="polite"
				hidden={!form.guidance('bio')}
			>
				{form.guidance('bio')}
			</p>
		</div>

		<p class="modal-error" role="alert" hidden={!errorMessage}>{errorMessage}</p>

		<div class="modal-actions">
			<button type="button" class="modal-btn modal-btn-cancel" disabled={saving} onclick={closeModal}>
				Cancelar
			</button>
			<button type="submit" class="modal-btn modal-btn-primary" disabled={saving}>
				{#if saving}
					<LoadingSpinner />
					Guardando…
				{:else}
					Guardar cambios
				{/if}
			</button>
		</div>
	</form>
</dialog>

<style>
	.status {
		margin: 0;
		color: var(--color-brand-green-strong);
	}

	.status:empty {
		display: none;
	}

	.count {
		margin: 0;
		align-self: flex-end;
		color: var(--color-text-muted);
		font-size: clamp(0.75rem, 0.7375rem + 0.1vw, 0.875rem);
	}
</style>
