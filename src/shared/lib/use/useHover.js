import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useScreen from '@/shared/lib/use/useScreen';

export const useHover = (interval = 0, removeHoverPopup = false) => {
    const isVisible = ref(false);
    const coordinates = ref({
        left: 0,
        top: 0,
    });
    const isHoverDisabled = useRoute().path.startsWith('/favorites');

    const { isMinLaptopLg1 } = useScreen();

    const hoverBlockWidth = computed(() => {
        if (isMinLaptopLg1.value) return window.innerWidth * 0.39;
        return 560;
    });

    if (isHoverDisabled || removeHoverPopup) {
        return {
            coordinates,
            isVisible,
            hover: () => {},
            blur: () => {},
        };
    }

    const canClose = ref(false);
    let hoverInterval;

    const hover = (event) => {
        const rect = event.target.getBoundingClientRect();
        const screenWidth = window.innerWidth;

        coordinates.value.left = Math.min(
            Math.max(0, rect.left - (hoverBlockWidth.value - rect.width) / 2),
            screenWidth - hoverBlockWidth.value,
        );
        coordinates.value.top = rect.top + window.scrollY - 50;

        if (hoverInterval) {
            clearTimeout(hoverInterval);
        }

        hoverInterval = setTimeout(() => {
            isVisible.value = true;
            setTimeout(() => {
                canClose.value = true;
            }, 50);
        }, 600);
    };

    const blur = (force) => {
        const element = document.querySelector('.vjs-fullscreen');
        if (element) return;
        if (force && canClose.value) {
            isVisible.value = false;
            canClose.value = false;
        }
        if (isVisible.value) return;
        clearTimeout(hoverInterval);
    };

    return {
        coordinates,
        isVisible,
        hover,
        blur,
    };
};