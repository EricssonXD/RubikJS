<script lang="ts">
	import { T } from '@threlte/core';
	import Cube from './cube.svelte';
	let cubes = [];
	const sizeX = 3;
	const sizeY = 3;
	const sizeZ = 3;
	const gap = 0.1;

	const offsetX = ((sizeX - 1) * (1 + gap)) / 2;
	const offsetY = ((sizeY - 1) * (1 + gap)) / 2;
	const offsetZ = ((sizeZ - 1) * (1 + gap)) / 2;

	for (let x = 0; x < sizeX; x++) {
		for (let y = 0; y < sizeY; y++) {
			for (let z = 0; z < sizeZ; z++) {
				cubes.push({
					x: x * (1 + gap) - offsetX,
					y: y * (1 + gap) - offsetY,
					z: z * (1 + gap) - offsetZ
				});
			}
		}
	}
</script>

<T.Group>
	{#each cubes as { x, y, z }}
		<Cube position={[x, y, z]}/>
	{/each}
</T.Group>
