<script lang="ts">
	import type { Profile } from '#lib/data/modalDemos.ts';

	interface Props {
		profile: Profile;
		onedit: () => void;
	}

	let { profile, onedit }: Props = $props();

	const uid = $props.id();
	const initials = $derived(
		profile.name
			.split(/\s+/)
			.slice(0, 2)
			.map((word) => word.charAt(0).toUpperCase())
			.join('')
	);
</script>

<article class="profile" aria-labelledby="{uid}-name">
	<header class="profile-header">
		<span class="avatar" aria-hidden="true">{initials}</span>
		<div class="identity">
			<h3 id="{uid}-name" class="name">{profile.name}</h3>
			<p class="email">{profile.email}</p>
		</div>
	</header>

	<p class="bio">{profile.bio || 'Sin biografía.'}</p>

	<button type="button" class="edit" onclick={onedit}>Editar perfil</button>
</article>

<style>
	.profile {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.profile-header {
		display: flex;
		align-items: center;
		gap: 0.875rem;
	}

	.avatar {
		display: grid;
		flex: none;
		place-items: center;
		inline-size: 3rem;
		block-size: 3rem;
		border-radius: 50%;
		background: var(--color-primary);
		color: var(--color-surface);
		font-weight: 600;
	}

	.identity {
		min-inline-size: 0;
	}

	.name {
		margin: 0;
		font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
		line-height: 1.3;
	}

	.email,
	.bio {
		margin: 0;
		color: var(--color-text-muted);
		overflow-wrap: anywhere;
	}

	/* Settings-related action: tertiary button. */
	.edit {
		align-self: flex-start;
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-primary);
		border-radius: 0.5rem;
		background: transparent;
		color: var(--color-primary);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	.edit:hover {
		background: var(--color-secondary);
	}
</style>
