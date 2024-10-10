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
        to: '/films',
        class: 'film-icon',
    },
    {
        id: 'serials',
        title: 'Сериалы',
        to: '/serials',
        class: 'serial-icon',
    },
    {
        id: 'favorite',
        title: 'Избранное',
        to: '/favorite',
        class: 'favorite-icon',
    }
]

const toggleSearch = () => {
    isSearchVisible.value = !isSearchVisible.value
}

const closeSearch = () => {
    isSearchVisible.value = false
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
        closeSearch()
    }
    next()
})
</script>

<template>
	<div class="header__container overflow">
		<header class="header header--overflow">
			<div class="container header__wrapper">
				<LogoLink />
				<nav class="header__center">
					<ul class="menu menu--header">
						<li 
							v-for="item in items" 
							:key="item.id"
						>
							<router-link
								:to="item.to"
								active-class="active-link"
							>
								<span>
									{{ item.title }}
								</span>
							</router-link>
						</li>
					</ul>
				</nav>
				<div class="header__profile">
					<div class="header__profile--search">
						<VButton
							@click="toggleSearch" 
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
							@close="closeSearch"
						/>
					</div>
				</div>
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
						active-class="active-link"
					>
						<div class="mobile-icon" :class="item.class" />
						{{ item.title }}
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />