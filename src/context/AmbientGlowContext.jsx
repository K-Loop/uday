import { createContext, useContext, useState, useMemo } from 'react';

const AmbientGlowContext = createContext({
    glowColor: null,
    setGlowColor: () => {},
});

export function AmbientGlowProvider({ children }) {
    const [glowColor, setGlowColor] = useState(null);

    const value = useMemo(() => ({ glowColor, setGlowColor }), [glowColor]);

    return (
        <AmbientGlowContext.Provider value={value}>
            {children}
        </AmbientGlowContext.Provider>
    );
}

export function useAmbientGlow() {
    return useContext(AmbientGlowContext);
}

