<script lang="ts">
	import '#lib/styles/classic-form.css';
	import ClassicPasswordField from '#lib/components/login/ClassicPasswordField.svelte';
	import { simulateLogin } from '#lib/utils/simulateLogin.ts';

	interface Props {
		onsignin: () => void;
	}

	let { onsignin }: Props = $props();

	const uid = $props.id();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let submitting = $state(false);
	let created = $state(false);

	// Standard convention: submit stays disabled until every field has content.
	const canSubmit = $derived(
		name.trim() !== '' && email.trim() !== '' && password !== '' && !submitting
	);

	async function handleSubmit(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		submitting = true;
		try {
			await simulateLogin();
			created = true;
		} finally {
			submitting = false;
		}
	}
</script>

<section class="classic-card" aria-labelledby="{uid}-title">
	<h3 id="{uid}-title" class="classic-title">Regístrate</h3>

	<form class="classic-form" onsubmit={handleSubmit}>
		<div class="classic-field">
			<label for="{uid}-name">Nombre</label>
			<input
				id="{uid}-name"
				class="classic-input"
				type="text"
				name="name"
				autocomplete="name"
				placeholder="Tu nombre"
				required
				bind:value={name}
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
				placeholder="tu@correo.com"
				required
				bind:value={email}
			/>
		</div>

		<ClassicPasswordField
			bind:value={password}
			autocomplete="new-password"
			placeholder="Crea una contraseña"
		/>

		<button type="submit" class="classic-submit" disabled={!canSubmit}>
			{submitting ? 'Creando cuenta…' : 'Crear cuenta'}
		</button>

		<p class="classic-status" role="status" hidden={!created}>
			{#if created}Cuenta creada (simulado).{/if}
		</p>
	</form>

	<p class="classic-switch">
		¿Ya tienes cuenta?
		<button type="button" class="classic-link" onclick={onsignin}>Entrar</button>
	</p>
</section>
