<script lang="ts">
	import { tick } from 'svelte';
	import SignInForm from '#lib/components/login/SignInForm.svelte';
	import SignUpForm from '#lib/components/login/SignUpForm.svelte';
	import { simulateLogin } from '#lib/utils/simulateLogin.ts';

	type Mode = 'signUp' | 'signIn';

	// Tabs say who the user is; sign-up comes first and is the default because most visitors are new.
	const MODES: { id: Mode; label: string; heading: string }[] = [
		{ id: 'signUp', label: 'Soy nuevo', heading: 'Crea tu cuenta' },
		{ id: 'signIn', label: 'Ya tengo cuenta', heading: 'Inicia sesión' }
	];

	const uid = $props.id();
	const tabs: HTMLButtonElement[] = [];

	let mode = $state<Mode>('signUp');
	let submitting = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	const activeMode = $derived(MODES.find((candidate) => candidate.id === mode) ?? MODES[0]);

	function selectMode(next: Mode): void {
		mode = next;
		errorMessage = '';
		successMessage = '';
	}

	async function handleTabKeydown(event: KeyboardEvent, index: number): Promise<void> {
		const lastIndex = MODES.length - 1;
		const targets: Record<string, number> = {
			ArrowLeft: index === 0 ? lastIndex : index - 1,
			ArrowRight: index === lastIndex ? 0 : index + 1,
			Home: 0,
			End: lastIndex
		};
		const target = targets[event.key];
		if (target === undefined) return;

		event.preventDefault();
		selectMode(MODES[target].id);
		await tick();
		tabs[target]?.focus();
	}

	async function handleSubmit(): Promise<void> {
		submitting = true;
		errorMessage = '';
		successMessage = '';
		try {
			await simulateLogin();
			successMessage = mode === 'signUp' ? 'Cuenta creada (simulado).' : 'Sesión iniciada (simulado).';
		} catch {
			errorMessage = 'No pudimos completar la solicitud. Inténtalo de nuevo en un momento.';
		} finally {
			submitting = false;
		}
	}
</script>

<section class="auth-card" aria-labelledby="{uid}-title">
	<div class="tabs" role="tablist" aria-label="Elige cómo continuar">
		{#each MODES as candidate, index (candidate.id)}
			<button
				bind:this={tabs[index]}
				id="{uid}-tab-{candidate.id}"
				type="button"
				role="tab"
				class="tab"
				aria-selected={mode === candidate.id}
				aria-controls="{uid}-panel"
				tabindex={mode === candidate.id ? 0 : -1}
				onclick={() => selectMode(candidate.id)}
				onkeydown={(event) => handleTabKeydown(event, index)}
			>
				{candidate.label}
			</button>
		{/each}
	</div>

	<h3 id="{uid}-title" class="title">{activeMode.heading}</h3>

	<div id="{uid}-panel" role="tabpanel" aria-labelledby="{uid}-tab-{mode}">
		{#if mode === 'signUp'}
			<SignUpForm {submitting} {errorMessage} onsubmit={handleSubmit} />
		{:else}
			<SignInForm {submitting} {errorMessage} onsubmit={handleSubmit} />
		{/if}
	</div>

	<p class="success" role="status" hidden={!successMessage}>{successMessage}</p>
</section>

<style>
	.auth-card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.tabs {
		display: flex;
		gap: 0.5rem;
	}

	.tab {
		flex: 1;
		padding: 0.625rem 0.75rem;
		border: 1px solid var(--color-primary);
		border-radius: 0.5rem;
		background: var(--color-secondary);
		color: var(--color-ink);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	.tab:hover,
	.tab[aria-selected='true'] {
		background: var(--color-primary);
		color: var(--color-surface);
	}

	.title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem);
		line-height: 1.2;
		text-align: center;
	}

	.success {
		margin: 0;
		color: var(--color-brand-green-strong);
	}
</style>
