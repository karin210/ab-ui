<script lang="ts">
	import '#lib/styles/classic-form.css';
	import ClassicPasswordField from '#lib/components/login/ClassicPasswordField.svelte';
	import { simulateLogin } from '#lib/utils/simulateLogin.ts';

	interface Props {
		onsignup: () => void;
	}

	let { onsignup }: Props = $props();

	const uid = $props.id();

	let email = $state('');
	let password = $state('');
	let remember = $state(false);
	let submitting = $state(false);
	let signedIn = $state(false);

	// Standard convention: submit stays disabled until both fields have content.
	const canSubmit = $derived(email.trim() !== '' && password !== '' && !submitting);

	async function handleSubmit(event: SubmitEvent): Promise<void> {
		event.preventDefault();
		submitting = true;
		try {
			await simulateLogin();
			signedIn = true;
		} finally {
			submitting = false;
		}
	}
</script>

<section class="classic-card" aria-labelledby="{uid}-title">
	<h3 id="{uid}-title" class="classic-title">Entrar</h3>

	<form class="classic-form" onsubmit={handleSubmit}>
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
			autocomplete="current-password"
			placeholder="Tu contraseña"
		/>

		<div class="classic-options">
			<label class="classic-remember">
				<input type="checkbox" name="remember" bind:checked={remember} />
				Recordarme
			</label>
			<a href="/">¿Olvidaste tu contraseña?</a>
		</div>

		<button type="submit" class="classic-submit" disabled={!canSubmit}>
			{submitting ? 'Iniciando sesión…' : 'Iniciar sesión'}
		</button>

		<p class="classic-status" role="status" hidden={!signedIn}>
			{#if signedIn}Sesión iniciada (simulado).{/if}
		</p>
	</form>

	<p class="classic-switch">
		¿No tienes cuenta?
		<button type="button" class="classic-link" onclick={onsignup}>Crear una cuenta</button>
	</p>
</section>
