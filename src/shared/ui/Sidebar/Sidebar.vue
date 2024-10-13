<script setup>
import {
    computed,
    ref,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    VButton
} from '@/shared/ui/buttons'

const props = defineProps({
    sidebarItems: {
        type: Array,
        default: () => [],
    },
    type: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    }
})

const emit = defineEmits(['close', 'reset', 'apply'])

const closeSidebar = () => {
    emit('close')
}
</script>

<template>
	<div class="sidebar__notifications sidebar__background sidebar__top">
		<div 
			class="sidebar__wrapper"
		>
			<div class="sidebar__notifications--body">
				<div class="sidebar__notifications--header">
					<h2>Фильтры</h2>
					<UISymbol
						name="cross"
						class="close-icon"
						@click="closeSidebar"
					/>
				</div>
				<div class="sidebar-filters">
					<div class="sidebar-filters__body">
						<h2 class="sidebar-filters__title">
							{{ props.title }}
						</h2>
						<input
							v-if="type === 'year'" 
							class="sidebar-filters__input-text" 
							type="text" 
							placeholder="Ищу..."
						/>
						<div class="sidebar-filters__content">
							<div
								v-for="item in props.sidebarItems"
								:key="item.type" 
								class="sidebar-filters__item"
							>
								<div class="sidebar-filters__input-wrapper">
									<input 
										type="radio" 
										:value="item"
									/>
									<label :for="item">
										{{ item }}
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="sidebar-filters__footer">
						<VButton
							modificator="mobile"
							class="button-soft footer-button"
						>
							Сбросить
						</VButton>
						<VButton
							modificator="mobile"
							class="button-primary footer-button"
						>
							Применить
						</VButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />