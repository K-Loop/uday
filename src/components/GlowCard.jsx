import { useCallback } from 'react';
import { useAmbientGlow } from '../context/AmbientGlowContext.jsx';

/**
 * GlowCard — wraps any image/card element.
 * On hover:
 *  1. Sends the artwork's custom color to the Global Ambient Background
 *     so the entire viewport / background glows in that color from the centre.
 *  2. Radiates a subtle centered card-aura as well.
 * On leave:
 *  Resets the global background to pure deep black (#0b0b0b).
 */
export default function GlowCard({
    glowColor = 'rgba(197, 168, 128, 0.45)',
    className = '',
    children,
    as: Tag = 'div',
    glowRadius = '160%',
    ...rest
}) {
    const { setGlowColor } = useAmbientGlow();

    const onEnter = useCallback(() => {
        if (glowColor) {
            setGlowColor(glowColor);
        }
    }, [glowColor, setGlowColor]);

    const onLeave = useCallback(() => {
        setGlowColor(null);
    }, [setGlowColor]);

    return (
        <Tag
            className={`relative ${className}`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            {...rest}
        >
            {/* Local centered subtle card aura */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-visible"
            >
                <div
                    className="rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                        width: glowRadius,
                        height: glowRadius,
                        background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
                    }}
                />
            </div>
            {children}
        </Tag>
    );
}
