<script setup>
import { 
    defineAsyncComponent, 
    shallowRef,
} from 'vue'

const DefaultLayouts = defineAsyncComponent(() => import('@/shared/ui/layouts/DefaultLayouts/DefaultLayouts.vue'))

const pageLayout = shallowRef(DefaultLayouts)
</script>

<template>
	<div class="app">
		<router-view v-slot="{ Component }">
			<component :is="pageLayout">
				<div class="page">
					<component :is="Component" />
				</div>
			</component>
 		 </router-view>
	</div>	
</template>

