<script setup>
import {
    LogoLink,
} from '@/shared/ui/LogoLink'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'

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
</script>

<template>
	<div class="header__wrapper">
		<header class="header content-container ">
			<div class="header__content">
				<LogoLink />
				<nav class="header__nav--wrapper">
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
						<button class="v-button v-button--search">
							<UISymbol name="search" />
						</button>
					</div>
					<div class="header__profile--btn header__profile--btn-promocode">
						Промокод
					</div>
					<router-link 
						to="/login" 
						class="header__profile--btn"
					>
						Авторизация
					</router-link>
				</div>
			</div>
		</header>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />