<script setup>
import {
    reactive,
    computed,
} from 'vue'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    MovieSearch,
} from '@/features/Movies/MovieSearch'
import { 
    useRouter,
    useRoute,
} from 'vue-router'
import {
    VButton,
} from '@/shared/ui/VButton'
import {
    LogoLink,
} from '@/shared/ui/LogoLink'
import {
    provideModal
} from '@/shared/lib/use/useModal'
import { 
    toggleSidebar,
} from '@/shared/lib/use/useSidebar'
import {
    useWindowWidth,
} from '@/shared/lib/use/useWindowWidth'

const { 
    closeModal, 
    isOpen, 
    openModal 
} = provideModal()

const windowWidth = useWindowWidth()
const router = useRouter()
const route = useRoute()

const items = reactive([
    {
        id: 'main',
        title: 'Главная',
        to: '/',
        class: 'main-icon',
    },
    {
        id: 'browse',
        title: 'Каталог',
        to: '/browse',
        class: 'browse-icon',
    },
    {
        id: 'favorite',
        title: 'Избранное',
        to: '/favorite',
        class: 'favorite-icon',
    }
])

const visibleBrowseFilter = computed(() => {
    return route.path.includes('genre') || route.path.includes('films') || route.path.includes('serials')
})
</script>

<template>
	<header class="header container">
		<div class="header__container">
			<div class="mobile__button">
				<template v-if="router.currentRoute.value.path !== '/'">
					<VButton
						@click="router.go(-1)"
						data-appearance="text"
						data-size="normal"
						modificator="mobile rounded color-white"
					>
						<UISymbol name="arrow-left" />
					</VButton>
				</template>
			</div>
			<LogoLink class="header__logo" />
			<div class="header__spacer" />
			<ul class="header-menu">
				<li 
					v-for="item in items" 
					:key="item.id"
					class="header-menu__item"
				>
					<router-link
						:to="item.to"
						active-class="active-link"
						exact-active-class="active-link"
						class="header-menu__link"
						aria-current="page"
					>
						{{ item.title }}
					</router-link>
				</li>
			</ul>
			<div class="header__spacer" />
			<VButton
				v-if="visibleBrowseFilter"
				data-size="normal"
				data-appearance="text"
				modificator="color-white rounded"
				class="browse-filter"
				@click="toggleSidebar()"
			>
				<UISymbol 
					name="slider"
				/>
			</VButton>
			<VButton
				@click="openModal"
				modificator="search rounded color-white"
				data-appearance="text"
				data-size="normal"
				title="Поиск"
			>
				<UISymbol 
					name="search"
				/>
			</VButton>
			<MovieSearch
				v-if="isOpen" 
				focus-on-mounted
				@close="closeModal"
			/>
		</div>
	</header>
	<div class="header-bottom__mobile">
		<div class="header-bottom__container">
			<div
				v-for="item in items"
				:key="item.id"
			>
				<router-link 
					class="header-bottom__link" 
					:to="item.to"
					active-class="active-link--mobile"
				>
					<div :class="['mobile-icon', item.class]" />
					{{ item.title }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />