import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
	threshold?: number;
	rootMargin?: string;
	triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
	const [isInView, setIsInView] = useState(false);
	const [hasBeenInView, setHasBeenInView] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const inView = entry.isIntersecting;
				setIsInView(inView);

				if (inView && !hasBeenInView) {
					setHasBeenInView(true);
				}
			},
			{
				threshold,
				rootMargin,
			},
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [threshold, rootMargin, hasBeenInView]);

	// Return the current state or the "has been in view" state based on triggerOnce
	const shouldShow = triggerOnce ? hasBeenInView : isInView;

	return [ref, shouldShow] as const;
}
