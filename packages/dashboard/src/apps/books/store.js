import { getMyBooks } from './api/getMyBooks';
import { getReviews } from './api/getReviews';

export async function initializeBookStore(store, setStore) {
    if (store.books) return true;

    const books = await getMyBooks();
    const reviews = await getReviews();
    setStore((s) => ({ ...s, books: { books, reviews } }));
}
