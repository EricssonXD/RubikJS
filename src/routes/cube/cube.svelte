<script lang="ts">
	import { T } from '@threlte/core';
	import { Edges, Outlines, RoundedBoxGeometry, type DomEvent, type IntersectionEvent } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { Color, Float32BufferAttribute, type BoxGeometry } from 'three';

	const { position } = $props<{ position: [number, number, number] }>();
	let geometry = $state<BoxGeometry>();
	
	onMount(() => {

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

		geometry!.setAttribute('color', colorAttribute);
	});

	let hovering = $state(false);
</script>

<T.Mesh position={position}>
	<RoundedBoxGeometry />
	<T.MeshBasicMaterial visible={false}/>
	<Outlines color="white" visible={hovering} thickness={0.1}/>
</T.Mesh>

<T.Mesh 
	position={position}
	onpointerenter={(e:IntersectionEvent<MouseEvent>) => {
		console.log(e.stopped)
		e.stopPropagation();
		hovering = true;
	}}
	onpointerleave={(e:IntersectionEvent<MouseEvent>) => {
		e.stopPropagation();
		hovering = false;
		console.log(e)
	}}
	onpointerdown={(e:IntersectionEvent<MouseEvent>) => {
		console.log(e.normal);
		if(e.normal) {
			e.normal.x
		}
	}}
	>
	<T.BoxGeometry bind:ref={geometry} />
	<T.MeshPhongMaterial vertexColors={true}/>
</T.Mesh>