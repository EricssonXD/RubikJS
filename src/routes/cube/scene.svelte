<script>
	import { T } from '@threlte/core';
	import { Float, Grid, OrbitControls, Stars } from '@threlte/extras';
	import RubiksCube from './rubiks-cube.svelte';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping enablePan={false} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<!-- <Grid infiniteGrid fadeDistance={30} sectionSize={1}></Grid> -->
<Stars />

<Float floatIntensity={1.2} rotationIntensity={1.2} rotationSpeed={1}></Float>
<RubiksCube />
