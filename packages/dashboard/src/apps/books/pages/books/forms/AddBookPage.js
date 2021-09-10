/**
 * This page shows an empty book form and has the logic to connect
 * the form with the store.
 *
 * The actions are passed down, so the BookForm is store independent.
 */
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Page } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BOOKS_BOOK_BASE_URL, BOOKS_BASE_URL } from 'apps/books/constants';
import { booksModel } from 'apps/books/models/book';
import { BookForm } from 'apps/books/components/books/BookForm';

export function AddBookPage() {
    const history = useHistory();
    const { setStore } = useContext(storeContext);

    const onSubmit = (newBook) => {
        return booksModel.add(setStore, newBook).then(() => {
            history.push(`${BOOKS_BOOK_BASE_URL}/${newBook.isbn13}`);
        });
    };

    const onCancel = () => history.push(BOOKS_BASE_URL);

    return (
        <Page title="Add new book">
            <BookForm onSubmit={onSubmit} onCancel={onCancel} />
        </Page>
    );
}
