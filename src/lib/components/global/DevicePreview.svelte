<script lang="ts">
	import type { Snippet } from 'svelte';
	import { deviceKinds, devices, screenInsets, type DeviceKind } from '#lib/data/devices.ts';

	interface Props {
		/** Accessible name of the device tabs (e.g. "Dispositivo del patrón A"). */
		label: string;
		/** Live content shown on the device screen, laid out at the device's viewport width. */
		children: Snippet;
	}

	let { label, children }: Props = $props();

	const id = $props.id();
	const name = `device-${id}`;
	let selected: DeviceKind = $state('desktop');
	let screenWidth = $state(0);
	let screenHeight = $state(0);

	// Width / height of the tallest device: the stage reserves that much height.
	const tallestRatio = Math.min(...deviceKinds.map((kind) => devices[kind].width / devices[kind].height));

	const device = $derived(devices[selected]);
	// The content is laid out at the real device width, then scaled down to the frame's screen.
	const scale = $derived(screenWidth / device.viewportWidth);
</script>

<div class="device-preview">
	<fieldset class="device-tabs">
		<legend class="visually-hidden">{label}</legend>
		{#each deviceKinds as kind (kind)}
			<label class="device-tab">
				<input class="visually-hidden" type="radio" {name} value={kind} bind:group={selected} />
				{devices[kind].label}
			</label>
		{/each}
	</fieldset>

	<figure class="device-stage" style:--tallest-ratio={tallestRatio}>
		<div class="device" style:aspect-ratio="{device.width} / {device.height}">
			<div class="device-screen" style:padding={screenInsets(device)}>
				<div class="screen-fit" bind:clientWidth={screenWidth} bind:clientHeight={screenHeight}>
					{#if scale > 0}
						<div
							class="screen-viewport"
							style:width="{device.viewportWidth}px"
							style:height="{screenHeight / scale}px"
							style:scale
						>
							{@render children()}
						</div>
					{/if}
				</div>
			</div>
			<img class="device-frame" src={device.frame} alt="" width={device.width} height={device.height} />
		</div>
	</figure>
</div>

<style>
	/* A size container, so the device is sized from the space it actually gets, not from the window. */
	.device-preview {
		container: device-preview / inline-size;
		display: grid;
		gap: 0.75rem;
	}

	.device-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		justify-self: start;
		margin: 0;
		padding: 0.25rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-background);
	}

	.device-tab {
		border-radius: 999px;
		padding: 0.25rem 0.875rem;
		color: var(--color-text-muted);
		font-size: clamp(0.8125rem, 0.8rem + 0.1vw, 0.9375rem);
		font-weight: 600;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.device-tab:hover {
		color: var(--color-text);
	}

	/* Ink on primary keeps AA contrast for small text. */
	.device-tab:has(input:checked) {
		background: var(--color-primary);
		color: var(--color-ink);
	}

	.device-tab:has(input:focus-visible) {
		outline: 3px solid var(--color-primary);
		outline-offset: 2px;
	}

	/* The stage is as tall as the tallest device so switching devices never moves the content below. */
	.device-stage {
		--device-width: min(92cqi, 750px);
		display: grid;
		place-items: center;
		min-height: calc(var(--device-width) / var(--tallest-ratio));
		margin: 0;
		border-radius: 1rem;
		background: var(--color-secondary);
	}

	/*
	 * Screen and frame share one grid cell: the frame sits on top of the screen.
	 * Every device is 92% of the preview's width on small screens and at most 750px on larger ones.
	 */
	.device {
		display: grid;
		grid-template: minmax(0, 1fr) / minmax(0, 1fr);
		width: var(--device-width);
		/* The frame's pixel size must not feed back into the box: width and aspect-ratio decide it. */
		contain: size;
		min-height: 0;
	}

	.device-screen,
	.device-frame {
		grid-area: 1 / 1;
	}

	.device-screen {
		display: grid;
		grid-template: minmax(0, 1fr) / minmax(0, 1fr);
		min-height: 0;
	}

	/* The content box of the screen: its measured size sets the scale of the viewport inside. */
	.screen-fit {
		contain: size;
		overflow: hidden;
		background: var(--color-surface);
	}

	.screen-viewport {
		transform-origin: 0 0;
	}

	.device-frame {
		width: 100%;
		height: 100%;
		min-height: 0;
		pointer-events: none;
	}
</style>
