import { useMediaQuery } from '@vueuse/core';
import { ref, onMounted, computed } from 'vue';

export default function useScreen(checkHydration = true) {

    const screenSizes = {
        laptopXXl: '3840px',
        laptopXl: '3600px',
        laptopLg1: '2200px',
        laptopLarge: '1920px',
        laptopMd: '1600px',
        laptop: '1440px',
        laptopSmall: '1366px',
        tabletLarge: '1280px',
        tablet: '1024px',
        tabletSmall: '768px',
        retina: '640px',
        mobileLarge: '480px',
        mobile: '380px',
    };
    const isHydrated = ref(!checkHydration);

    if (checkHydration) {
        onMounted(() => isHydrated.value = true);
    }

    const isLaptopXXl = useMediaQuery(`(max-width: ${screenSizes.laptopXXl})`);
    const isLaptopXl = useMediaQuery(`(max-width: ${screenSizes.laptopXl})`);
    const isLaptopLarge = useMediaQuery(`(max-width: ${screenSizes.laptopLarge})`);
    const isLaptopMd = useMediaQuery(`(max-width: ${screenSizes.laptopMd})`);
    const isLaptop = useMediaQuery(`(max-width: ${screenSizes.laptop})`);
    const isLaptopSmall = useMediaQuery(`(max-width: ${screenSizes.laptopSmall})`);
    const isTabletLarge = useMediaQuery(`(max-width: ${screenSizes.tabletLarge})`);
    const isTablet = useMediaQuery(`(max-width: ${screenSizes.tablet})`);
    const isTabletSmall = useMediaQuery(`(max-width: ${screenSizes.tabletSmall})`);
    const isRetina = useMediaQuery(`(max-width: ${screenSizes.retina})`);
    const isMobileLarge = useMediaQuery(`(max-width: ${screenSizes.mobileLarge})`);
    const isMobile = useMediaQuery(`(max-width: ${screenSizes.mobile})`);

    const isMinLaptopXl = useMediaQuery(`(min-width: ${screenSizes.laptopXl})`);
    const isMinLaptopLg1= useMediaQuery(`(min-width: ${screenSizes.laptopLg1})`);
    const isMinLaptopLarge= useMediaQuery(`(min-width: ${screenSizes.laptopLarge})`);
    const isMinLaptopMd = useMediaQuery(`(min-width: ${screenSizes.laptopMd})`);

    return {
        screenSizes,
        isLaptopXXl: computed(() => isHydrated.value && isLaptopXXl.value),
        isLaptopXl: computed(() => isHydrated.value && isLaptopXl.value),
        isLaptopLarge: computed(() => isHydrated.value && isLaptopLarge.value),
        isLaptopMd: computed(() => isHydrated.value && isLaptopMd.value),
        isLaptop: computed(() => isHydrated.value && isLaptop.value),
        isLaptopSmall: computed(() => isHydrated.value && isLaptopSmall.value),
        isTabletLarge: computed(() => isHydrated.value && isTabletLarge.value),
        isTablet: computed(() => isHydrated.value && isTablet.value),
        isTabletSmall: computed(() => isHydrated.value && isTabletSmall.value),
        isRetina: computed(() => isHydrated.value && isRetina.value),
        isMobileLarge: computed(() => isHydrated.value && isMobileLarge.value),
        isMobile: computed(() => isHydrated.value && isMobile.value),

        isMinLaptopXl: computed(() => isHydrated.value && isMinLaptopXl.value),
        isMinLaptopLg1: computed(() => isHydrated.value && isMinLaptopLg1.value),
        isMinLaptopLarge: computed(() => isHydrated.value && isMinLaptopLarge.value),
        isMinLaptopMd: computed(() => isHydrated.value && isMinLaptopMd.value),
    };
};