import { useEffect, useRef, useState } from "react";

export default function useInView() {
    const observerTarget = useRef(null);
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true)
                } else {
                    setInView(false)
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
    }, [observerTarget]);

    return [observerTarget, inView];
}
