export function formatNumber(number) {
    return Intl.NumberFormat('en-US').format(number);
}

export function getColorPrice (val) {
    if (val > 0) return 'var(--color-price-up)';
    if (val < 0) return 'var(--color-price-down)';
};