export function stringHashCode(st) {
    var hash = 0, i, chr;
    if (st.length === 0) return hash;
    for (i = 0; i < st.length; i++) {
        chr = st.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}