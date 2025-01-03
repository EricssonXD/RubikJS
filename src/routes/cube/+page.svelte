<script lang="ts">
	import type { PageData } from './$types';
	import { Canvas } from '@threlte/core';
	import Scene from './scene.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Canvas>
	<Scene />
</Canvas>
