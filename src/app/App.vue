<script setup>
import { 
    defineAsyncComponent, 
    shallowRef,
} from 'vue'

const DefaultLayouts = defineAsyncComponent(() => import('@/shared/ui/layouts/DefaultLayouts/DefaultLayouts.vue'))

const pageLayout = shallowRef(DefaultLayouts)
</script>

<template>
	<div id="_layout">
		<div class="page-container">
			<router-view v-slot="{ Component }">
				<component :is="pageLayout">
					<div class="page-container__main">
						<component :is="Component" />
					</div>
				</component>
			</router-view>
		</div>
	</div>	
</template>

