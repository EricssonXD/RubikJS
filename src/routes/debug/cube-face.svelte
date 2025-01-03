<script lang="ts">
	import { colorMap, type RubiksCubeSide } from '$lib/rubiks/rubiks.svelte';

	let { face }: { face: RubiksCubeSide } = $props();
</script>

<!-- A 3x3 cube with different colors -->
<div class="inline-grid grid-cols-3 gap-0.5">
	{#each face as slot}
		<div class="h-6 w-6" style="background-color: {colorMap[slot]}"></div>
	{/each}
</div>
