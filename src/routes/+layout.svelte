<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from '$lib/components/app-sidebar.svelte';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" />

<ParaglideJS {i18n}>
	<Sidebar.Provider>
		<AppSidebar />
		<main class="flex w-full">
			<Sidebar.Trigger class="z-10 size-10" />
			{@render children?.()}
		</main>
	</Sidebar.Provider>
</ParaglideJS>
