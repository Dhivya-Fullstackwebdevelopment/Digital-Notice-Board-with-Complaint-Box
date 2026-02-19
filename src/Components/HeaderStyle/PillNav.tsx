import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface NavItem {
    label: string;
    href: string;
}

const PillNav = ({ items, activeHref }: { items: NavItem[], activeHref: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRefs = useRef<Map<number, gsap.core.Timeline>>(new Map());

    useEffect(() => {
        const pills = containerRef.current?.querySelectorAll('.pill');

        pills?.forEach((pill, index) => {
            const circle = pill.querySelector('.hover-circle') as HTMLElement;
            const label = pill.querySelector('.pill-label') as HTMLElement;
            const labelHover = pill.querySelector('.pill-label-hover') as HTMLElement;

            if (!circle || !label || !labelHover) return;

            const { width: w } = pill.getBoundingClientRect();

            gsap.set(circle, {
                width: w * 1.5,
                height: w * 1.5,
                xPercent: -50,
                yPercent: 100,
                left: '50%',
                bottom: 0,
                scale: 0,
                backgroundColor: '#000000',
                borderRadius: '50%',
            });

            gsap.set(label, { y: 0, opacity: 1 });
            gsap.set(labelHover, { y: 20, opacity: 0 });

            const tl = gsap.timeline({ paused: true });
            tl.to(circle, { scale: 1.5, yPercent: 40, duration: 0.4, ease: "power2.out" }, 0)
                .to(label, { y: -20, opacity: 0, duration: 0.3 }, 0)
                .to(labelHover, { y: 0, opacity: 1, duration: 0.3 }, 0.1);

            tlRefs.current.set(index, tl);
        });
    }, [items]);

    return (
        <div ref={containerRef} className="flex items-center">
            <ul className="flex items-center gap-2 list-none m-0 p-0">
                {items.map((item, i) => (
                    <li key={item.href}>
                        <Link
                            to={item.href}
                            className={`pill relative px-5 py-2 flex flex-col items-center justify-center rounded-full overflow-hidden font-bold uppercase text-xs transition-all duration-300 ${activeHref === item.href ? 'text-blue-600' : 'text-slate-600'}`}
                            onMouseEnter={() => tlRefs.current.get(i)?.play()}
                            onMouseLeave={() => tlRefs.current.get(i)?.reverse()}
                        >
                            <span className="hover-circle absolute z-0 pointer-events-none" />
                            <span className="relative z-10 block h-4 overflow-hidden pointer-events-none">
                                <span className="pill-label block">{item.label}</span>
                                <span className="pill-label-hover absolute inset-0 text-white opacity-0">{item.label}</span>
                            </span>

                            {/* Blue Underline */}
                            {(activeHref === item.href || (activeHref === '/' && item.href === '/Home')) && (
                                <motion.span
                                    layoutId="activeTab"
                                    className="absolute bottom-0 w-6 h-[2.5px] bg-blue-600 rounded-full z-20"
                                />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PillNav;