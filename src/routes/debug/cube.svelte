<script lang="ts">
	import { RubiksCube } from '$lib/rubiks/rubiks.svelte';
	import CubeFace from './cube-face.svelte';

	let { rubiksCube }: { rubiksCube: RubiksCube } = $props();

	const cube = $derived(rubiksCube.cube);

	// $inspect(rubiksCube.cube);
</script>

<div class="inline-grid grid-cols-4 gap-1">
	<CubeFace class="col-start-2" face={cube.U}></CubeFace>
	<CubeFace class="col-start-1" face={cube.L}></CubeFace>
	<CubeFace face={cube.F}></CubeFace>
	<CubeFace face={cube.R}></CubeFace>
	<CubeFace face={cube.B}></CubeFace>
	<CubeFace class="col-start-2" face={cube.D}></CubeFace>
</div>
