<script lang="ts">
	import { simulateLogin } from '#lib/utils/simulateLogin.ts';

	const uid = $props.id();

	let email = $state('');
	let password = $state('');
	let remember = $state(false);
	let showPassword = $state(false);
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

<form class="login" onsubmit={handleSubmit}>
	<div class="field">
		<label for="{uid}-email">Correo electrónico</label>
		<input
			id="{uid}-email"
			type="email"
			name="email"
			autocomplete="email"
			placeholder="tu@correo.com"
			required
			bind:value={email}
		/>
	</div>

	<div class="field">
		<label for="{uid}-password">Contraseña</label>
		<div class="password-box">
			<input
				id="{uid}-password"
				type={showPassword ? 'text' : 'password'}
				name="password"
				autocomplete="current-password"
				placeholder="Tu contraseña"
				required
				bind:value={password}
			/>
			<button
				type="button"
				class="toggle"
				aria-pressed={showPassword}
				onclick={() => (showPassword = !showPassword)}
			>
				{showPassword ? 'Ocultar' : 'Mostrar'}
			</button>
		</div>
	</div>

	<div class="options">
		<label class="remember">
			<input type="checkbox" name="remember" bind:checked={remember} />
			Recordarme
		</label>
		<a href="/">¿Olvidaste tu contraseña?</a>
	</div>

	<button type="submit" class="submit" disabled={!canSubmit}>
		{submitting ? 'Iniciando sesión…' : 'Iniciar sesión'}
	</button>

	<p class="status" role="status" hidden={!signedIn}>
		{#if signedIn}Sesión iniciada (simulado).{/if}
	</p>
</form>

<style>
	.login {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	label {
		font-size: clamp(0.875rem, 0.85rem + 0.15vw, 1rem);
	}

	input:not([type='checkbox']) {
		padding: 0.75rem 0.875rem;
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		background: var(--color-surface);
		color: var(--color-text);
		font: inherit;
	}

	.password-box {
		display: flex;
		align-items: stretch;
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		background: var(--color-surface);
	}

	.password-box input {
		flex: 1;
		min-inline-size: 0;
		border: 0;
		border-radius: 0.25rem;
	}

	.toggle {
		padding-inline: 0.875rem;
		border: 0;
		background: transparent;
		color: var(--color-primary);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	.options {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		font-size: clamp(0.875rem, 0.85rem + 0.15vw, 1rem);
	}

	.remember {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.options a {
		color: var(--color-primary);
	}

	.submit {
		padding: 0.75rem 1.5rem;
		border: 0;
		border-radius: 0.25rem;
		background: var(--color-primary);
		color: var(--color-surface);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	.submit:disabled {
		background: var(--color-border);
		color: var(--color-text-muted);
		cursor: not-allowed;
	}

	.status {
		margin: 0;
		color: var(--color-text-muted);
	}
</style>
