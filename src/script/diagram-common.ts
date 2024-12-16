/**
 * script for mobile symbol-palette
 */

let isMobile: boolean;

export function paletteIconClick(): void {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        const paletteIcon = document.getElementById('palette-icon');
        if (paletteIcon) {
            paletteIcon.addEventListener('click', showPaletteIcon, false);
        }
    }
}

function showPaletteIcon(): void {
    const paletteSpace = document.getElementById('palette-space');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile && paletteSpace) {
        if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
            paletteSpace.classList.add('sb-mobile-palette-open');
        } else {
            paletteSpace.classList.remove('sb-mobile-palette-open');
        }
    }
}
