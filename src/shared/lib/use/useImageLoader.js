import { 
    ref, 
    onMounted 
} from 'vue'

export function useImageLoader(imageUrl) {
    const imageRef = ref(null)
    const imageSrc = ref('')
    const imageLoaded = ref(false)
    const isLoading = ref(true)

    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && imageUrl) {
                    const img = new Image()
                    img.src = imageUrl
                    img.onload = () => {
                        imageSrc.value = imageUrl
                        imageLoaded.value = true
                        isLoading.value = false
                    }
                    img.onerror = () => {
                        isLoading.value = false
                    }
                    observer.disconnect()
                }
            });
        }, {
            threshold: 0.1
        })

        if (imageRef.value) {
            observer.observe(imageRef.value)
        }

        return () => {
            observer.disconnect()
        }
    })

    return {
        imageRef,
        imageSrc,
        imageLoaded,
        isLoading
    }
}