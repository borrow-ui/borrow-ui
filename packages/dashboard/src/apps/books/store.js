import { getMyBooks } from './api/getMyBooks';

export async function initializeBookStore(store, setStore) {
    if (store.books) return true;

    const books = await getMyBooks();
    setStore((s) => ({ ...s, books: { books, reviews: {} } }));
}
