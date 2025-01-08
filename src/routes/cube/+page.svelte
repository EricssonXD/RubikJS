<script lang="ts">
	import type { PageData } from './$types';
	import { Canvas } from '@threlte/core';
	import Scene from './scene.svelte';
	import { PerfMonitor } from '@threlte/extras';
	import { Studio } from '@threlte/studio';

	let { data }: { data: PageData } = $props();
</script>

<div class="fixed size-full">
	<Canvas>
		{#if false}
			<Studio>
				<PerfMonitor anchorX={'right'} logsPerSecond={30} />
				<Scene />
			</Studio>
		{:else}
			<PerfMonitor anchorX={'right'} logsPerSecond={30} />
			<Scene />
		{/if}
	</Canvas>
</div>
