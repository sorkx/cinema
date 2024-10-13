import {
    fetchInstance,
} from '@/shared/api/instance'
import { 
    API_URL,
} from '@/shared/api/config'

export const Api = {

    getCategories: async (category, page = 1, filters = {}) => {
        try{
            const { genres, ratingTo, yearFrom, order } = filters

            return await fetchInstance(API_URL, '', { 
                type: category, page, genres, ratingTo, yearFrom, order 
            })
        } catch(e) {
            console.error(`Ошибка при загрузке ${category}:`, e)
        }
    },

    getMovieDetails: async (id) => {
        try {
            return await fetchInstance(API_URL, `/${id}`)
        } catch (e) {
            console.error('Error fetching movie details:', e)
        }
    },

    getMovieSimilars: async (id) => {
        try {
            const { items } = await fetchInstance(API_URL, `/${id}/similars`)

            return items
        } catch (e) {
            console.error('Error fetching similars movie:', e)
        }
    },

    getSerialSeasons: async (id) => {
        try{
            const { items } = await fetchInstance(API_URL, `/${id}/seasons`)

            return items
        }catch(e) {
            console.error('Error fetching serial seasons:', e)
        }
    },

    getMovieBoxOffice: async (id) => {
        try{
            const { items } = await fetchInstance(API_URL, `/${id}/box_office`)

            return items
        }catch(e) {
            console.error('Error fetching movie box office:', e)
        }
    },

    getMovieTrailers: async (id) => {
        try{
            const { items } = await fetchInstance(API_URL, `/${id}/videos`)

            return items
        }catch(e) {
            console.error('Error fetching movie trailers:', e)
        }
    },

    getMovieCollections: async (category, page = 1) => {
        try {
            return await fetchInstance(API_URL, '/collections', { type: category, page })
        } catch(e) {
            console.error('Error fetching movies collections:', e)
        }
    },

    getMovieFilters: async () => {
        try {
            return await fetchInstance(API_URL, '/filters')
        } catch(e) {
            console.error('Error fetching movie filters:', e)
        }
    }
}