export default function debounce(fn, delay) {
    let timeoutId;
    return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fn, delay);
    };
}