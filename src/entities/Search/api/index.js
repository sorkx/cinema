import {
    fetchInstance,
} from '@/shared/api/instance'
import { 
    VITE_API_URL_SEARCH,
} from '@/shared/api/config'

export const ApiSearch = {

    searchByKeyword: async (word, page = 1) => {
        try{
            return await fetchInstance(VITE_API_URL_SEARCH, '/search-by-keyword', { keyword: word, page })
        } catch(e) {
            console.error(`Ошибка при поиске ${word}:`, e)
        }
    },
}