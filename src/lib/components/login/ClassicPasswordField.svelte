<script lang="ts">
	import '#lib/styles/classic-form.css';

	interface Props {
		value: string;
		autocomplete: 'new-password' | 'current-password';
		placeholder: string;
	}

	let { value = $bindable(), autocomplete, placeholder }: Props = $props();

	const uid = $props.id();

	let showPassword = $state(false);

	const revealLabel = $derived(showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
</script>

<div class="classic-field">
	<label for="{uid}-password">Contraseña</label>
	<div class="password-box">
		<input
			id="{uid}-password"
			class="classic-input"
			type={showPassword ? 'text' : 'password'}
			name="password"
			{autocomplete}
			{placeholder}
			required
			bind:value
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

<style>
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
</style>
