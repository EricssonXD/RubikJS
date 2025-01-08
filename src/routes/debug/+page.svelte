<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { RubiksCube } from '$lib/rubiks/rubiks.svelte';

	import type { PageData } from './$types';
	import Cube from './cube.svelte';

	let { data }: { data: PageData } = $props();

	const rubiksCube = new RubiksCube();

	// $inspect(rubiksCube.asString());
</script>

<div class="flex size-full flex-col items-center justify-center space-y-4">
	<div>
		<Cube {rubiksCube}></Cube>
	</div>
	<div class="flex flex-row gap-2">
		<Button onclick={() => rubiksCube.identity()}>Reset</Button>
		<Button onclick={() => rubiksCube.randomize()}>Randomize</Button>
	</div>
	<div class="flex flex-row gap-2">
		<Button
			onclick={() => {
				rubiksCube.move('F');
			}}>F</Button
		>
		<Button
			onclick={() => {
				rubiksCube.move('B');
			}}>B</Button
		>
		<Button
			onclick={() => {
				rubiksCube.move('U');
			}}>U</Button
		>
		<Button
			onclick={() => {
				rubiksCube.move('D');
			}}>D</Button
		>
		<Button
			onclick={() => {
				rubiksCube.move('L');
			}}>L</Button
		>
		<Button
			onclick={() => {
				rubiksCube.move('R');
			}}>R</Button
		>
	</div>
</div>
