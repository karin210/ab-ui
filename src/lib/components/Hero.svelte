<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="hero-content">
		<h1 id="hero-title" class="hero-title">{title}</h1>
	</div>
</section>

<style>
	.hero {
		box-sizing: border-box;
		display: grid;
		place-items: center;
		min-height: clamp(28rem, 80vh, 48rem);
		padding-inline: var(--page-gutter);
		padding-block: clamp(4rem, 12vh, 8rem);
		background:
			radial-gradient(circle at 15% 20%, var(--color-secondary), transparent 55%),
			radial-gradient(circle at 85% 80%, var(--color-secondary), transparent 50%),
			var(--color-background);
	}

	.hero-content {
		width: 100%;
		max-width: var(--content-max-width);
		text-align: center;
	}

	.hero-title {
		margin: 0;
		max-width: 22ch;
		margin-inline: auto;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(2.25rem, 1.5rem + 3.5vw, 4.5rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--color-text);
		text-wrap: balance;
	}
</style>
