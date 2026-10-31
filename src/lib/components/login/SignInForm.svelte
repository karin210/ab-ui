<script lang="ts">
	import '#lib/styles/auth-form.css';
	import EmailField from '#lib/components/login/EmailField.svelte';
	import PasswordField from '#lib/components/login/PasswordField.svelte';
	import { SignInForm, type AuthValues } from '#lib/utils/AuthForm.svelte.ts';

	interface Props {
		submitting: boolean;
		errorMessage: string;
		onsubmit: (values: AuthValues) => void;
	}

	let { submitting, errorMessage, onsubmit }: Props = $props();

	const form = new SignInForm();
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
	<PasswordField {form} autocomplete="current-password" bind:this={passwordField} />

	<button type="submit" class="auth-submit" disabled={submitting}>
		{#if submitting}
			<span class="auth-spinner" aria-hidden="true"></span>
			Entrando…
		{:else}
			Iniciar sesión
		{/if}
	</button>

	<p class="auth-error" role="alert" hidden={!errorMessage}>{errorMessage}</p>
</form>
