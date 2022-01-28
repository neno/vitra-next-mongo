import { useMediaQuery } from './use-media-query';

export const useIsSmall = () => useMediaQuery('(min-width: 640px)');
export const useIsMedium = () => useMediaQuery('(min-width: 768px)');
export const useIsLarge = () => useMediaQuery('(min-width: 1024px)');
