<script lang="ts">
	import '#lib/styles/auth-form.css';
	import type { AuthForm } from '#lib/utils/AuthForm.svelte.ts';

	interface Props {
		form: AuthForm;
		autocomplete: 'new-password' | 'current-password';
		/** Sign-up only: offers a copy button once the password passes validation. */
		copyable?: boolean;
		/** Optional Safari `passwordrules` hint mirroring the sign-up rule. */
		passwordRules?: string;
	}

	let { form, autocomplete, copyable = false, passwordRules }: Props = $props();

	type CopyStatus = 'idle' | 'copied' | 'failed';
	const COPY_FEEDBACK_MS = 2000;

	const uid = $props.id();
	let input: HTMLInputElement | undefined;
	let revealed = $state(false);
	let copyStatus = $state<CopyStatus>('idle');
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	const revealLabel = $derived(revealed ? 'Ocultar contraseña' : 'Mostrar contraseña');
	const copyMessage = $derived(
		copyStatus === 'copied'
			? 'Contraseña copiada'
			: copyStatus === 'failed'
				? 'No se pudo copiar la contraseña'
				: ''
	);

	export function focus(): void {
		input?.focus();
	}

	async function copyPassword(): Promise<void> {
		try {
			await navigator.clipboard.writeText(form.password);
			copyStatus = 'copied';
		} catch {
			copyStatus = 'failed';
		}
		clearTimeout(copyTimer);
		copyTimer = setTimeout(() => (copyStatus = 'idle'), COPY_FEEDBACK_MS);
	}
</script>

<div class="auth-field">
	<label class="auth-label" for="{uid}-password">Contraseña</label>
	<div class="input-wrap" style:--controls-space={copyable ? '5.5rem' : '3rem'}>
		<input
			id="{uid}-password"
			class="auth-input"
			class:valid={form.isValid('password')}
			type={revealed ? 'text' : 'password'}
			name="password"
			{autocomplete}
			{...passwordRules ? { passwordrules: passwordRules } : {}}
			bind:this={input}
			bind:value={form.password}
			oninput={() => form.touch('password')}
			onblur={() => form.leave('password')}
			data-mark={form.mark('password')}
			aria-invalid={form.guidance('password') ? 'true' : undefined}
			aria-describedby="{uid}-guidance"
		/>
		<div class="controls">
			{#if copyable}
				<button
					type="button"
					class="control"
					class:visible={form.isValid('password')}
					aria-label="Copiar contraseña"
					title="Copiar contraseña"
					onclick={copyPassword}
				>
					<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						{#if copyStatus === 'copied'}
							<path d="M20 6 9 17l-5-5" />
						{:else}
							<rect x="9" y="9" width="13" height="13" rx="2" />
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
						{/if}
					</svg>
				</button>
			{/if}
			<button
				type="button"
				class="control"
				class:visible={form.password.length > 0}
				aria-pressed={revealed}
				aria-label={revealLabel}
				title={revealLabel}
				onclick={() => (revealed = !revealed)}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					{#if revealed}
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
	<span class="visually-hidden" role="status">{copyMessage}</span>
	<p
		id="{uid}-guidance"
		class="auth-guidance"
		aria-live="polite"
		hidden={!form.guidance('password')}
	>
		{form.guidance('password')}
	</p>
</div>

<style>
	.input-wrap {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	/* One absolutely positioned wrapper holds the buttons; they keep their normal flow inside it. */
	.controls {
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.control {
		display: grid;
		place-items: center;
		inline-size: 2.25rem;
		block-size: 2.25rem;
		padding: 0;
		border: 0;
		border-radius: 0.375rem;
		background: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
		opacity: 0;
		visibility: hidden;
		transform: scale(0.8);
		transition:
			opacity 0.15s ease,
			transform 0.15s ease,
			visibility 0.15s;
	}

	.control.visible {
		opacity: 1;
		visibility: visible;
		transform: none;
	}

	.control:hover {
		color: var(--color-primary);
	}

	svg {
		inline-size: 1.25rem;
		block-size: 1.25rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	@media (prefers-reduced-motion: reduce) {
		.control {
			transition: none;
		}
	}
</style>
