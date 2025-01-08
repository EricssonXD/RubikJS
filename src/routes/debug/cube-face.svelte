<script lang="ts">
	import { colorMap } from '$lib/rubiks/rubiks.svelte';
	import type { ClassArray, ClassDictionary } from 'clsx';

	let {
		face,
		class: className
	}: { face: string[]; class?: string | ClassArray | ClassDictionary | null | undefined } =
		$props();
</script>

<!-- A 3x3 cube with different colors -->
<div class={className}>
	<div class="inline-grid grid-cols-3 gap-0.5 border border-white">
		{#each face as slot}
			<div class="h-6 w-6" style="background-color: {colorMap[slot]}"></div>
		{/each}
	</div>
</div>
