export function isPWA() {
    return window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches
} 