import { useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  onLoadMore: () => void;
  loading: boolean;
  enabled?: boolean;
};

export const useInfiniteScroll = ({ onLoadMore, loading, enabled = true }: UseInfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !onLoadMore || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [onLoadMore, loading, enabled]);

  return sentinelRef;
}; 