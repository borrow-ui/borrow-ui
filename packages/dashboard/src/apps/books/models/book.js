/**
 * A class and a main instance to control the life of books.
 *
 * Ideally, this class can be extended by a base model that manages
 * the store consistently (i.e. using Redux, dispatching actions,
 * registering middlewares, etc).
 * The base model would also remember the order of elements retrieved
 * by getters, get one item only, passing filters to fetch/axios,
 * handle custom calls, and so on.
 *
 * For the purpose of this demo, everything is done in-place.
 */

import { getMyBooks } from '../api/getMyBooks';

export class BookModel {
    newBook() {
        return {
            title: '',
            subtitle: '',
            price: '',
            isbn13: '',
            image: '',
            url: '',
        };
    }

    getList() {
        return getMyBooks();
    }

    add(setStore, book) {
        return new Promise((resolve) => {
            // Simulate some delay
            setTimeout(() => {
                setStore((store) => {
                    const books = { ...store.books.books };
                    books[book.isbn13] = book;
                    return { ...store, books: { ...store.books, books } };
                });
                resolve();
            }, 1000);
        });
    }

    save(setStore, book) {
        return new Promise((resolve) => {
            // Simulate some delay
            setTimeout(() => {
                setStore((store) => {
                    const books = { ...store.books.books };
                    books[book.isbn13] = book;
                    if (book._old_isbn13 !== book.isbn13 && books[book._old_isbn13])
                        delete books[book._old_isbn13];
                    delete book._old_isbn13;
                    return { ...store, books: { ...store.books, books } };
                });
                resolve();
            }, 1000);
        });
    }

    delete(setStore, isbn13) {
        return new Promise((resolve) => {
            // Simulate some delay
            setTimeout(() => {
                setStore((store) => {
                    const books = { ...store.books.books };
                    delete books[isbn13];
                    return { ...store, books: { ...store.books, books } };
                });
                resolve();
            }, 1000);
        });
    }
}

export const booksModel = new BookModel();
