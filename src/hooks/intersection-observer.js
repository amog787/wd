import { useEffect, useRef } from "react";

export default function useInView(cb) {
    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    cb()
                }
            },
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }


        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget, cb]);

    return observerTarget;
}
