<script lang="ts">
	import DevicePreview from '#lib/components/global/DevicePreview.svelte';
	import SampleSite from '#lib/components/hamburger-menu/SampleSite.svelte';
	import type { PatternProps } from '#lib/data/uiComponents.ts';

	let { onroutechange }: PatternProps = $props();
</script>

<DevicePreview label="Dispositivo del patrón C">
	<SampleSite placement="hybrid" {onroutechange} />
</DevicePreview>
