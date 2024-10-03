import {
    fetchInstance,
} from '@/shared/api/instance'
import { 
    API_URL,
} from '@/shared/api/config'

export const Api = {

    getCategories: async (category, page = 1) => {
        const params = {
            type: category,
            page,
        };

        try{
            return await fetchInstance(API_URL, '', params)
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
            await fetchInstance(API_URL, `/${id}/similars`)
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
}