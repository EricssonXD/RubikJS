<script lang="ts">
	import type { PageData } from './$types';
	import { Canvas } from '@threlte/core';
	import Scene from './scene.svelte';
	import { PerfMonitor } from '@threlte/extras';

	let { data }: { data: PageData } = $props();
</script>

<div class="fixed size-full">
	<Canvas>
		<PerfMonitor anchorX={'right'} logsPerSecond={30} />
		<Scene />
	</Canvas>
</div>
