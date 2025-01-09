<script lang="ts">
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	import { Color, Float32BufferAttribute, type BoxGeometry, type ColorRepresentation, type MeshBasicMaterial } from 'three';

	// let material = $state<MeshBasicMaterial>();
	let geometry = $state<BoxGeometry>();

	// Define colors for each face (6 faces, each with 4 vertices)
	const colors = [
		new Color('red'), // Red
		new Color('orange'), // Cyan
		new Color('white'), // white
		new Color('yellow'), // Yellow
		new Color('green'), // Green
		new Color('blue') // Blue
	];

	// Create an array to hold the color data for each vertex
	const vertexColors: number[] = [];

	// Assign colors to each vertex of each face
	for (let i = 0; i < 6; i++) {
		const color = colors[i];
		for (let j = 0; j < 4; j++) {
			// Each face has 4 vertices
			vertexColors.push(color.r, color.g, color.b);
		}
	}


	const colorAttribute = new Float32BufferAttribute(vertexColors, 3);

	onMount	(() => {
		geometry!.setAttribute('color', colorAttribute);
	});
</script>

<T.Mesh>
	<T.BoxGeometry bind:ref={geometry} />
	<T.MeshPhongMaterial vertexColors={true} />
</T.Mesh>

<!-- <T.Mesh geometry={geometry} >
	<T.MeshPhongMaterial vertexColors={true} />
  </T.Mesh> -->
