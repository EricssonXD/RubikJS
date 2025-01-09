<!-- <script lang="ts">
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
</T.Mesh> -->

<script>
	import * as THREE from 'three';
	import { T } from '@threlte/core';

    const geometry = new THREE.BoxGeometry(1, 1, 1);
	
	// Define colors for each face (6 faces, each with 4 vertices)
	const colors = [
	  new THREE.Color(0xff0000), // Red
	  new THREE.Color(0x00ff00), // Green
	  new THREE.Color(0x0000ff), // Blue
	  new THREE.Color(0xffff00), // Yellow
	  new THREE.Color(0xff00ff), // Magenta
	  new THREE.Color(0x00ffff), // Cyan
	];
  
	// Create an array to hold the color data for each vertex
	const vertexColors = [];
  
	// Assign colors to each vertex of each face
	for (let i = 0; i < 6; i++) {
	  const color = colors[i];
	  for (let j = 0; j < 4; j++) { // Each face has 4 vertices
		vertexColors.push(color.r, color.g, color.b);
	  }
	}
  
	// Create a Float32Array for the vertex colors
	const colorAttribute = new THREE.Float32BufferAttribute(vertexColors, 3);
	geometry.setAttribute('color',colorAttribute);
</script>
  
  <T.Mesh geometry={geometry} >
	<!-- Use MeshStandardMaterial with vertexColors enabled -->
	<T.MeshPhongMaterial vertexColors={true} color="white"/>
  </T.Mesh>