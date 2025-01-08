<script lang="ts">
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	import { Color, type BoxGeometry, type ColorRepresentation, type MeshBasicMaterial } from 'three';

	let material = $state<MeshBasicMaterial>();
	let geometry = $state<BoxGeometry>();

	const colors: ColorRepresentation[] = [];
	const color = new Color();
	onMount(() => {
		// generate for each side of the cube a different color
		const position = geometry!.attributes.position;
		for (let i = 0; i < position.count; i += 6) {
			color.setHex(Math.random() * 0xffffff);

			// first face

			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);

			// second face

			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);
		}
	});
</script>

<T.Mesh>
	<T.BoxGeometry bind:ref={geometry} toNonIndexed vertexColors color={colors} />
	<T.MeshBasicMaterial bind:ref={material} />
</T.Mesh>
