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

const router = useRouter()

const isSearchVisible = ref(false)

const items = [
    {
        id: 'films',
        title: 'Фильмы',
        to: '/films',
    },
    {
        id: 'serials',
        title: 'Сериалы',
        to: '/serials',
    },
    {
        id: 'favorite',
        title: 'Избранное',
        to: '/favorite',
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
						<button
							@click="toggleSearch" 
							class="v-button v-button--search"
						>
							<UISymbol name="search" />
						</button>
						<MovieSearch 
							v-if="isSearchVisible"
							focus-on-mounted
							@close="closeSearch"
						/>
					</div>
					<!-- <div class="header__profile--btn header__profile--btn-promocode">
						Промокод
					</div> -->
					<!-- <router-link 
						to="/login" 
						class="header__profile--btn"
					>
						Авторизация
					</router-link> -->
				</div>
			</div>
		</header>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />