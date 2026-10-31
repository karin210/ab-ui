<script lang="ts">
	import { simulateLogin } from '#lib/utils/simulateLogin.ts';

	const uid = $props.id();

	let email = $state('');
	let password = $state('');
	let remember = $state(false);
	let showPassword = $state(false);
	let submitting = $state(false);
	let signedIn = $state(false);

	const revealLabel = $derived(showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');

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

<section class="card" aria-labelledby="{uid}-title">
<h3 id="{uid}-title" class="title">Entrar</h3>

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
				aria-label={revealLabel}
				title={revealLabel}
				onclick={() => (showPassword = !showPassword)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					{#if showPassword}
						<path
							d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a19.8 19.8 0 0 1 5.06-5.94M9.9 4.24A10.9 10.9 0 0 1 12 5c7 0 11 7 11 7a19.7 19.7 0 0 1-3.17 4.19M1 1l22 22"
						/>
					{:else}
						<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
						<circle cx="12" cy="12" r="3" />
					{/if}
				</svg>
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

<p class="signup">¿No tienes cuenta? <a href="/">Crear una cuenta</a></p>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem);
		line-height: 1.2;
		text-align: center;
	}

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
		display: grid;
		place-items: center;
		padding-inline: 0.875rem;
		border: 0;
		background: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
	}

	.toggle:hover {
		color: var(--color-primary);
	}

	.toggle svg {
		inline-size: 1.25rem;
		block-size: 1.25rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
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

	.options a,
	.signup a {
		color: var(--color-primary);
	}

	.signup {
		margin: 0;
		text-align: center;
		font-size: clamp(0.875rem, 0.85rem + 0.15vw, 1rem);
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
