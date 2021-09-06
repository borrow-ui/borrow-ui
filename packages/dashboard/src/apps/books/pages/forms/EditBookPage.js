import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Page } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BOOKS_BOOK_BASE_URL } from 'apps/books/constants';
import { booksModel } from 'apps/books/models/book';
import { BookForm } from 'apps/books/components/BookForm';

export function EditBookPage() {
    const history = useHistory();
    const { store, setStore } = useContext(storeContext);

    const params = useParams();
    const isbn13 = params.isbn13;

    const book = store.books[isbn13];

    const onSubmit = (changedBook) => {
        return booksModel.save(setStore, changedBook).then(() => {
            history.push(`${BOOKS_BOOK_BASE_URL}/${changedBook.isbn13}`);
        });
    };

    const onCancel = () => history.push(`${BOOKS_BOOK_BASE_URL}/${isbn13}`);

    return (
        <Page title="Edit book">
            <BookForm book={book} onSubmit={onSubmit} onCancel={onCancel} />
        </Page>
    );
}