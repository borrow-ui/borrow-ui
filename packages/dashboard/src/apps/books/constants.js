/**
 * Defines constants used in pages and components.
 *
 * Base urls are built by extension of the app base url,
 * and breadcrumbs too.
 */

export const BOOKS_BASE_URL = '/books';

export const BOOKS_BREADCRUMBS = [
    { link: '/', label: 'Home' },
    { link: BOOKS_BASE_URL, label: 'Books' },
];

export const TOPICS = ['react', 'es6', 'django', 'python', 'front-end', 'back-end'];

/* BOOKS */
export const BOOKS_BOOK_BASE_URL = `${BOOKS_BASE_URL}/book`;

/* REVIEWS */
export const BOOKS_REVIEW_BASE_URL = `${BOOKS_BASE_URL}/review`;
