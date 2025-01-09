<script>
	import { T } from '@threlte/core';
	import { Float, OrbitControls, Stars } from '@threlte/extras';
	import RubiksCube from './rubiks-cube.svelte';
	import { interactivity } from '@threlte/extras';
	interactivity({
    filter: (hits, state) => {
      // Only return the first hit
      return hits.slice(0, 1)
    }
  })	
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping enablePan={false} />
	<T.PointLight  intensity={5}  />
	<T.DirectionalLight />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.05} />
<!-- <T.DirectionalLight position={[5, 5, 5]} /> -->
<!-- <T.PointLight color={0xffffff} intensity={100} position={[5, 5, 5]} /> -->

<!-- <Grid infiniteGrid fadeDistance={30} sectionSize={1}></Grid> -->
<Stars />

<Float floatIntensity={1.2} rotationIntensity={1.2} rotationSpeed={1}></Float>
<RubiksCube />
