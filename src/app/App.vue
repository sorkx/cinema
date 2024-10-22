<script setup>
import { 
    defineAsyncComponent, 
    shallowRef,
} from 'vue'

const DefaultLayouts = defineAsyncComponent(() => import('@/shared/ui/layouts/DefaultLayouts/DefaultLayouts.vue'))

const pageLayout = shallowRef(DefaultLayouts)
</script>

<template>
	<router-view v-slot="{ Component }">
		<component :is="pageLayout">
			<component :is="Component" />
		</component>
	</router-view>
</template>

