import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Breadcrumbs, Page } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BOOKS_BASE_URL, BOOKS_BREADCRUMBS } from 'apps/books/constants';
import { booksModel } from 'apps/books/models/book';
import { DeleteBookButton } from 'apps/books/components/DeleteBookButton';
import { BookDetail } from 'apps/books/components/BookDetail';

export function BookDetailPage() {
    const { store, setStore } = useContext(storeContext);
    const history = useHistory();

    const params = useParams();
    const isbn13 = +params.isbn13;

    const book = store.books[isbn13];

    return (
        <Page
            title={
                <>
                    <Breadcrumbs breadcrumbs={BOOKS_BREADCRUMBS} />
                    {book ? book.title : `Book ${isbn13}`}
                </>
            }
            pageHeaderProps={{
                controls: (
                    <DeleteBookButton
                        book={book || {}}
                        deleteBook={(isbn13) => booksModel.delete(setStore, isbn13)}
                        onDelete={() => history.push(BOOKS_BASE_URL)}
                    />
                ),
            }}
        >
            {book && <BookDetail book={book} />}
        </Page>
    );
}
