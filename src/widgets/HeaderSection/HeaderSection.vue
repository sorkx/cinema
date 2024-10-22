<script setup>
import {
    ref,
    watch,
} from 'vue'
import {
    LogoLink,
} from '@/shared/ui/LogoLink'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    MovieSearch,
} from '@/features/Movies/MovieSearch'
import { 
    useRouter,
} from 'vue-router'
import {
    VButton,
} from '@/shared/ui/buttons'

const router = useRouter()

const isSearchVisible = ref(false)

const items = [
    {
        id: 'main',
        title: 'Главная',
        to: '/',
        class: 'main-icon',
    },
    {
        id: 'films',
        title: 'Фильмы',
        to: '/movies/films',
        class: 'film-icon',
    },
    {
        id: 'serials',
        title: 'Сериалы',
        to: '/movies/serials',
        class: 'serial-icon',
    },
    {
        id: 'favorite',
        title: 'Избранное',
        to: '/favorite',
        class: 'favorite-icon',
    }
]

const toggleSearch = (force) => {
    isSearchVisible.value = force ?? !isSearchVisible.value
}

watch(isSearchVisible, async (newVal) => {
    if (newVal) {
        document.documentElement.classList.add('search-page')
    } else {
        document.documentElement.classList.remove('search-page')
    }
})

router.beforeEach((to, from, next) => {
    if (isSearchVisible.value) {
        toggleSearch(false)
    }
    next()
})
</script>

<template>
	<header class="header container">
		<div class="header__container">
			<LogoLink />
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
						class="header-menu__link"
						aria-current="page"
					>
						{{ item.title }}
					</router-link>
				</li>
			</ul>
			<div class="header__spacer" />
			<VButton
				@click="toggleSearch()" 
				modificator="search"
			>
				<UISymbol 
					name="search"  
					class="search-icon" 
				/>
			</VButton>
			<MovieSearch 
				v-if="isSearchVisible"
				focus-on-mounted
				@close="toggleSearch(false)"
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