<script lang="ts">
	import { RubiksCube } from '$lib/rubiks/rubiks.svelte';
	import CubeFace from './cube-face.svelte';

	let { rubiksCube }: { rubiksCube: RubiksCube } = $props();

	const cube = $derived(rubiksCube.cube)

	// $inspect(rubiksCube.cube);
</script>

<CubeFace face={cube.F}></CubeFace>
<CubeFace face={cube.B}></CubeFace>
<CubeFace face={cube.U}></CubeFace>
<CubeFace face={cube.D}></CubeFace>
<CubeFace face={cube.L}></CubeFace>
<CubeFace face={cube.R}></CubeFace>
