import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface FadeInViewProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	threshold?: number;
	rootMargin?: string;
}

export default function FadeInView({
	children,
	className = "",
	delay = 0,
	duration = 600,
	threshold = 0.1,
	rootMargin = "0px 0px -50px 0px",
}: FadeInViewProps) {
	const [ref, isInView] = useInView({ threshold, rootMargin });

	return (
		<div
			ref={ref}
			className={`transition-all ease-out ${className}`}
			style={{
				opacity: isInView ? 1 : 0,
				transform: isInView ? "translateY(0)" : "translateY(20px)",
				transitionDuration: `${duration}ms`,
				transitionDelay: `${delay}ms`,
				// Optimize for mobile performance
				willChange: "transform, opacity",
			}}
		>
			{children}
		</div>
	);
}
