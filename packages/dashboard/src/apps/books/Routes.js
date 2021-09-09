import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Loader } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BooksHomePage } from './pages/home/BooksHomePage';
import { BookDetailPage } from './pages/books/detail/BookDetailPage';
import { AddBookPage } from './pages/books/forms/AddBookPage';
import { EditBookPage } from './pages/books/forms/EditBookPage';
import { AddReviewPage } from './pages/reviews/forms/AddReviewPage';
import { EditReviewPage } from './pages/reviews/forms/EditReviewPage';

import { BOOKS_BASE_URL, BOOKS_BOOK_BASE_URL, BOOKS_REVIEW_BASE_URL } from './constants';

export { BOOKS_BASE_URL };

export function BooksRoutes() {
    const { store } = useContext(storeContext);

    // if books are not loaded yet, show a Loader
    // in this way we can avoid to put this check around
    if (!store.books || !store.books.books) return <Loader />;

    return (
        <Switch>
            <Route exact path={BOOKS_BASE_URL} component={BooksHomePage} />
            <Route exact path={`${BOOKS_BOOK_BASE_URL}/add`} component={AddBookPage} />
            <Route exact path={`${BOOKS_BOOK_BASE_URL}/:isbn13/edit`} component={EditBookPage} />
            <Route exact path={`${BOOKS_BOOK_BASE_URL}/:isbn13`} component={BookDetailPage} />
            <Route exact path={`${BOOKS_REVIEW_BASE_URL}/add/:isbn13`} component={AddReviewPage} />
            <Route exact path={`${BOOKS_REVIEW_BASE_URL}/:id/edit`} component={EditReviewPage} />
        </Switch>
    );
}
