<script lang="ts">
	import ClassicSignInForm from '#lib/components/login/ClassicSignInForm.svelte';
	import ClassicSignUpForm from '#lib/components/login/ClassicSignUpForm.svelte';

	interface Props {
		/** Called with the simulated route each time the visible form changes. */
		onroutechange?: (route: string) => void;
	}

	let { onroutechange }: Props = $props();

	type View = 'signIn' | 'signUp';

	const ROUTES: Record<View, string> = { signIn: '/entrar', signUp: '/registrarme' };

	let view = $state<View>('signIn');

	function showView(next: View): void {
		view = next;
		onroutechange?.(ROUTES[next]);
	}
</script>

{#if view === 'signIn'}
	<ClassicSignInForm onsignup={() => showView('signUp')} />
{:else}
	<ClassicSignUpForm onsignin={() => showView('signIn')} />
{/if}
