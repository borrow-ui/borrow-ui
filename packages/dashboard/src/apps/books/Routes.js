import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Loader } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BooksHomePage } from './pages/home/BooksHomePage';
import { BookDetailPage } from './pages/detail/BookDetailPage';

import { BOOKS_BASE_URL, BOOKS_BOOK_BASE_URL } from './constants';

export { BOOKS_BASE_URL };

export function BooksRoutes() {
    const { store } = useContext(storeContext);

    if (!store.books) return <Loader />;

    return (
        <Switch>
            <Route exact path={BOOKS_BASE_URL} component={BooksHomePage} />
            <Route exact path={`${BOOKS_BOOK_BASE_URL}/:isbn13`} component={BookDetailPage} />
        </Switch>
    );
}
