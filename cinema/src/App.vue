<script setup>
	import { 
		defineAsyncComponent, 
		shallowRef,
	} from 'vue'

	const DefaultLayouts = defineAsyncComponent(() => import('@/components/layouts/DefaultLayouts/DefaultLayouts.vue'))

	const pageLayout = shallowRef(DefaultLayouts)
</script>

<template>
	<div class="app">
		<router-view v-slot="{ Component }">
			<component :is="pageLayout">
				<component :is="Component" class="page" />
			</component>
 		 </router-view>
	</div>	
</template>

