import { 
    createRouter, 
    createWebHistory,
} from 'vue-router'
import { 
    ROUTE_NAMES, 
} from '@/shared/lib/constants'

const routeOptions = [
    {
        path: '/',
        name: ROUTE_NAMES.MAIN,
    },
    {
        path: '/films',
        name: ROUTE_NAMES.FILMS,
    },
    {
        path: '/serials',
        name: ROUTE_NAMES.SERIALS,
    },
    {
        path: '/popular',
        name: ROUTE_NAMES.POPULAR,
    },
    {
        path: '/top250-movies',
        name: ROUTE_NAMES.TOP_MOVIES,
    },
    {
        path: '/top250-serials',
        name: ROUTE_NAMES.TOP_SERIALS,
    },
    {
        path: '/news',
        name: ROUTE_NAMES.NEWS,
    },
    {
        path: '/favorite',
        name: ROUTE_NAMES.FAVORITE,
    },
    {
        path: '/:type/:id',
        name: ROUTE_NAMES.CONTENT_DETAILS,
        props: true,
    },
    {
        path: '/staff/:id',
        name: ROUTE_NAMES.STAFF_DETAILS,
        props: true,
    },
    {
        path: '/similars',
        name: ROUTE_NAMES.SIMILARS,
    }
]

const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
    ...routeOptions.map((route) => ({ 
        ...route, 
        component: async () => {
            let component = null

            try {
                component = await import(`@/pages/${route.name}Page/${route.name}Page.vue`)
            }catch(e) {
                console.error(e.message)
            }

            return component
        }
    })),
]

const router = createRouter({
    mode: 'history',
  	history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior (to) {
        return to.hash ? { el: to.hash } : { top: 0 }
    },
})

export default router
