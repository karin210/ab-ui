<script lang="ts">
	import { page } from '$app/state';

	const isNotFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? 'Página no encontrada' : 'Algo salió mal'} | ABUI</title>
</svelte:head>

<main>
	<h1>{isNotFound ? 'Esta página no existe' : 'Algo salió mal'}</h1>
	<p>
		{isNotFound
			? 'No encontramos lo que buscas. Puede que el enlace haya cambiado.'
			: 'Tuvimos un problema de nuestro lado. Inténtalo de nuevo en un momento.'}
	</p>
	<a href="/">Volver al inicio</a>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		min-height: 100vh;
		padding-inline: var(--page-gutter);
		text-align: center;
	}

	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2rem, 1.4rem + 3vw, 3.5rem);
	}

	p {
		margin: 0;
		color: var(--color-text-muted);
	}

	a {
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		background: var(--color-primary);
		color: var(--color-surface);
		font-weight: 600;
		text-decoration: none;
	}
</style>
