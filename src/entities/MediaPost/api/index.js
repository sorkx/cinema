import {
    fetchInstance,
} from '@/shared/api/instance'
import { 
    API_URL_NEWS,
} from '@/shared/api/config'

export const ApiPosts = {
    getMediaPosts: async (page = 1) => {
        try {
            return await fetchInstance(API_URL_NEWS, '', { page })

        } catch (e) {
            console.error('Error fetching media posts:', e)
        }
    }
}