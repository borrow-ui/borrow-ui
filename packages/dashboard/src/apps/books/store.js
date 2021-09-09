import { booksModel } from './models/book';
import { reviewsModel } from './models/review';

export async function initializeBookStore(store, setStore) {
    if (store.books) return true;

    const books = await booksModel.getList();
    const reviews = await reviewsModel.getList();
    setStore((s) => ({ ...s, books: { books, reviews } }));
}
