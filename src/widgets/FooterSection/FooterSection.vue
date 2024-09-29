<script setup>
import {
    LogoLink,
} from '@/shared/ui/LogoLink'
import {
    UISymbol,
} from '@/shared/ui/UISymbol'
import {
    reactive,
} from 'vue'

const footerItems = reactive([
    {
        name: 'Разделы',
        items: [
            { text: 'Новинки', link: '#' },
            { text: 'Популярное', link: '#' },
            { text: 'Каталог', link: '#' },
            { text: 'Подборки', link: '#' },
            { text: 'FAQ', link: '#' },
            { text: 'Новости', link: '#' },
        ]
    },
    {
        name: 'О Нас',
        items: [
            { text: 'Контакты', link: '#' },
            { text: 'Пользовательское соглашение', link: '#' },
            { text: 'Политика конфиденциальности', link: '#' },
            { text: 'Соглашение правообладателя', link: '#' },
        ]
    },
    {
        name: 'Поддержка',
        items: [
            { text: 'support@sork.ru', link: 'mailto:support@sork.ru', icon: 'email' },
        ]
    },
    {
        name: 'Скачать мобильное приложение',
        items: [
            { image: '#' },
            { image: '#' },
            { image: '#' },
            { image: '#' },
        ]
    },
    {
        name: 'Подписаться на нас',
        items: [
            { icon: 'vk' },
            { icon: 'telegram' },
        ]
    },
]);

</script>

<template>
	<div class="page-container__footer">
		<footer class="footer">
			<div class="container footer__container">
				<div class="footer__top">
					<div 
						v-for="section in footerItems"
						:key="section.name" 
						class="footer__item"
					>
						<div class="footer__name"> 
							{{ section.name }}
						</div>
						<div v-if="section.name === 'Скачать мобильное приложение'">
							<div class="footer__applications">
								<router-link
									v-for="item in section.items"
									:key="item.image"
									class="application application--img application--footer"
									to="#"
								>
									<img src="#" />
								</router-link>
							</div>
						</div>
						<div v-else-if="section.name === 'Подписаться на нас'">
							<div class="socials socials--footer">
								<router-link
									v-for="item in section.items"
									:key="item.icon"
									class="social__img"
									to="#"
								>
									<UISymbol :name="item.icon" />
								</router-link>
							</div>
						</div>
						<ul 
							v-else
							class="menu menu--footer"
						>
							<li 
								v-for="li in section.items"
								:key="li.text"
							>
								<router-link
									:to="li.link"
									:class="li.icon ? 'has-icon' : ''"
								>
									<div v-if="li.icon">
										<UISymbol :name="li.icon" />
									</div>
										<span v-if="li.icon">
											{{ li.text }}
										</span>
										<template v-else>
											{{ li.text }}
										</template>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="footer__bottom">
					<div class="description--footer">
						Просматривая материалы, находящиеся на данном сайте, Вы обязуетесь выполнять
                		условия пользовательского соглашения.
					</div>
					<router-link 
						to="/"
						class="logo"
						aria-current="page"
					>
						<LogoLink />
					</router-link>
				</div>
			</div>
		</footer>
	</div>
</template>

<style src="./styles.scss" lang="scss" scoped />