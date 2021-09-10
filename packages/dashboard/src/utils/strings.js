/**
 * Example of a shared utility.
 *
 * The beautify function creates a readable version from a coded string,
 * i.e. react_programming -> React Programming.
 */

export function ucFirst(string) {
    return string && typeof string === 'string' ? string.charAt(0).toUpperCase() : '';
}

export function beautify(string, { separator = '_' } = {}) {
    if (!string) return '';

    return string
        .split(separator)
        .map((p) => ucFirst(p) + p.substr(1))
        .join(' ');
}
