<script lang="ts">
	import '#lib/styles/auth-form.css';
	import EmailField from '#lib/components/login/EmailField.svelte';
	import PasswordField from '#lib/components/login/PasswordField.svelte';
	import { SignUpForm, type AuthValues } from '#lib/utils/AuthForm.svelte.ts';
	import { generatePassword } from '#lib/utils/generatePassword.ts';
	import { SIGN_UP_PASSWORD_RULES_ATTRIBUTE } from '#lib/validation/auth.ts';

	interface Props {
		submitting: boolean;
		errorMessage: string;
		onsubmit: (values: AuthValues) => void;
	}

	let { submitting, errorMessage, onsubmit }: Props = $props();

	const form = new SignUpForm();
	let emailField: ReturnType<typeof EmailField> | undefined;
	let passwordField: ReturnType<typeof PasswordField> | undefined;

	function handleSubmit(event: SubmitEvent): void {
		event.preventDefault();
		const invalidField = form.validate();
		if (invalidField === 'email') emailField?.focus();
		else if (invalidField === 'password') passwordField?.focus();
		else onsubmit(form.toValues());
	}
</script>

<form class="auth-form" novalidate onsubmit={handleSubmit} aria-busy={submitting}>
	<EmailField {form} bind:this={emailField} />
	<PasswordField
		{form}
		autocomplete="new-password"
		passwordRules={SIGN_UP_PASSWORD_RULES_ATTRIBUTE}
		copyable
		bind:this={passwordField}
	/>

	<button type="button" class="suggest" onclick={() => form.fillPassword(generatePassword())}>
		Usar contraseña sugerida
	</button>

	<button type="submit" class="auth-submit" disabled={submitting}>
		{#if submitting}
			<span class="auth-spinner" aria-hidden="true"></span>
			Creando cuenta…
		{:else}
			Crear cuenta
		{/if}
	</button>

	<p class="auth-error" role="alert" hidden={!errorMessage}>{errorMessage}</p>
</form>

<style>
	.suggest {
		align-self: flex-end;
		padding: 0.375rem 0.75rem;
		border: 1px solid var(--color-primary);
		border-radius: 0.5rem;
		background: transparent;
		color: var(--color-primary);
		font: inherit;
		font-size: clamp(0.8125rem, 0.8rem + 0.1vw, 0.9375rem);
		font-weight: 600;
		cursor: pointer;
	}

	.suggest:hover {
		background: var(--color-secondary);
	}
</style>
