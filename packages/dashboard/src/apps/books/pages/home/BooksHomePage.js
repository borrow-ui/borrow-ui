import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs, Button, Page } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BOOKS_BOOK_BASE_URL } from 'apps/books/constants';
import { booksModel } from 'apps/books/models/book';
import { BooksList } from 'apps/books/components/BooksList';

export function BooksHomePage() {
    const { store, setStore } = useContext(storeContext);

    return (
        <Page
            title={
                <>
                    <Breadcrumbs breadcrumbs={[{ link: '/', label: 'Home' }]} />
                    Books Home
                </>
            }
            pageHeaderProps={{
                controls: (
                    <Button mean="primary" tag={Link} to={`${BOOKS_BOOK_BASE_URL}/add`}>
                        Add Book
                    </Button>
                ),
            }}
        >
            <BooksList
                books={Object.values(store.books)}
                deleteBook={(isbn13) => booksModel.delete(setStore, isbn13)}
            />
        </Page>
    );
}
