/**
 * Entry point component for the `books` application.
 * In this component store content can be initialized, or
 * at least related/mandatory entities can be fetched.
 *
 * For example, categories of books can be preloaded from the
 * database to be used without fetching them in every component.
 *
 * In this demo, the books are loaded when the apps store is
 * initialized so they might not be loaded yet.
 * For this reason, a Loader is shown until the store is filled.
 */

import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Loader } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BooksHomePage } from './pages/home/BooksHomePage';
import { BookDetailPage } from './pages/books/detail/BookDetailPage';
import { AddBookPage } from './pages/books/forms/AddBookPage';
import { EditBookPage } from './pages/books/forms/EditBookPage';
import { AddReviewPage } from './pages/reviews/forms/AddReviewPage';
import { EditReviewPage } from './pages/reviews/forms/EditReviewPage';

import { BOOKS_BASE_URL } from './constants';

export { BOOKS_BASE_URL };

export function BooksRoutes() {
    const { store } = useContext(storeContext);

    // if books are not loaded yet, show a Loader
    // in this way we can avoid to put this check around
    if (!store.books || !store.books.books)
        return (
            <div className="w-100 h-100 flex-center-center">
                <Loader />
            </div>
        );

    return (
        <Routes>
            <Route index element={<BooksHomePage />} />
            <Route exact path={`book/add`} element={<AddBookPage />} />
            <Route exact path={`book/:isbn13/edit`} element={<EditBookPage />} />
            <Route exact path={`book/:isbn13`} element={<BookDetailPage />} />
            <Route exact path={`review/add/:isbn13`} element={<AddReviewPage />} />
            <Route exact path={`review/:id/edit`} element={<EditReviewPage />} />
        </Routes>
    );
}
