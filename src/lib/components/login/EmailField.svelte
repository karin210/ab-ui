<script lang="ts">
	import '#lib/styles/auth-form.css';
	import type { AuthForm } from '#lib/utils/AuthForm.svelte.ts';

	interface Props {
		form: AuthForm;
	}

	let { form }: Props = $props();

	const uid = $props.id();
	let input: HTMLInputElement | undefined;

	export function focus(): void {
		input?.focus();
	}
</script>

<div class="auth-field">
	<label class="auth-label" for="{uid}-email">Correo electrónico</label>
	<input
		id="{uid}-email"
		class="auth-input"
		class:valid={form.isValid('email')}
		type="email"
		name="email"
		autocomplete="username"
		bind:this={input}
		bind:value={form.email}
		oninput={() => form.touch('email')}
		onblur={() => form.leave('email')}
		data-mark={form.mark('email')}
		aria-invalid={form.guidance('email') ? 'true' : undefined}
		aria-describedby="{uid}-example {uid}-guidance"
	/>
	<p id="{uid}-example" class="auth-example">
		Ejemplo:
		{#each form.emailParts as part (part.kind)}
			<span class:met={form.isEdited('email') && part.met} class:missing={form.isEdited('email') && !part.met}
				>{part.example}</span
			>{#if form.isEdited('email')}<span class="visually-hidden">
					{part.met ? '(listo)' : '(falta)'}</span
				>{/if}
		{/each}
	</p>
	<p id="{uid}-guidance" class="auth-guidance" aria-live="polite" hidden={!form.guidance('email')}>
		{form.guidance('email')}
	</p>
</div>
