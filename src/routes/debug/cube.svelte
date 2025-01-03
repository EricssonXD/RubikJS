<script lang="ts">
	import { RubiksCube } from '$lib/rubiks/rubiks.svelte';
	import CubeFace from './cube-face.svelte';

	let { rubiksCube }: { rubiksCube: RubiksCube } = $props();

	const cube = rubiksCube.cube;
</script>

<CubeFace face={cube[0]}></CubeFace>
<CubeFace face={cube[1]}></CubeFace>
<CubeFace face={cube[2]}></CubeFace>
<CubeFace face={cube[3]}></CubeFace>
<CubeFace face={cube[4]}></CubeFace>
<CubeFace face={cube[5]}></CubeFace>
