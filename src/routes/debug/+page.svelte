<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { RubiksCube } from '$lib/rubiks/rubiks.svelte';

	import type { PageData } from './$types';
	import Cube from './cube.svelte';

	let { data }: { data: PageData } = $props();

	const rubiksCube = new RubiksCube();

	$inspect(rubiksCube.cube);
</script>

<div class="flex h-screen flex-col items-center justify-center space-y-4">
	<div>
		<Cube {rubiksCube}></Cube>
	</div>
	<div class="flex flex-row gap-2">
		<Button onclick={() => rubiksCube.reset()}>Reset</Button>
		<Button onclick={() => rubiksCube.setTestCube()}>Set test</Button>
		<Button
			onclick={() => {
				rubiksCube.rotate('front');
			}}>Rotate Front</Button
		>
	</div>
</div>
