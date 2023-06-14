export function base642Binary(str) {
    return atob(str).split('').map(c => {
        return c.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}
