// Palette helper to get dominant color glow per artwork category/index
export const ART_GLOW_MAP = {
    0: 'rgba(90, 175, 235, 0.45)',    // Shiva — vibrant cerulean ice-blue
    1: 'rgba(215, 170, 110, 0.42)',   // Architectural stone — warm sandstone
    2: 'rgba(235, 185, 95, 0.45)',    // Temple tower — deep radiant ochre
    3: 'rgba(185, 160, 120, 0.40)',   // Zen meditative — serene parchment amber
    4: 'rgba(245, 195, 80, 0.50)',    // Kalpavriksha — glowing 24K gold
    5: 'rgba(225, 130, 70, 0.46)',    // Mythological mural — rich terracotta sienna
    video: 'rgba(240, 165, 60, 0.45)', // Studio mural video — radiant atelier amber
};

export const CATEGORY_GLOW_MAP = {
    '3D Wall Carving': 'rgba(215, 170, 110, 0.42)',
    'Murals': 'rgba(225, 130, 70, 0.46)',
    'Sculpture': 'rgba(90, 175, 235, 0.45)',
    'Temple Arts': 'rgba(235, 185, 95, 0.45)',
    'default': 'rgba(197, 168, 128, 0.45)',
};

export function getArtworkGlow(artwork, index) {
    if (typeof index === 'number' && ART_GLOW_MAP[index % 6]) {
        return ART_GLOW_MAP[index % 6];
    }
    if (artwork?.category && CATEGORY_GLOW_MAP[artwork.category]) {
        return CATEGORY_GLOW_MAP[artwork.category];
    }
    return CATEGORY_GLOW_MAP['default'];
}

