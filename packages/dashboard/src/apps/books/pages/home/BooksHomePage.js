import { useContext } from 'react';

import { Breadcrumbs, Page } from '@borrow-ui/ui';

import { storeContext } from 'store';
import { BooksList } from '../../components/BooksList';
import { booksModel } from '../../models/book';

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
        >
            <BooksList
                books={Object.values(store.books)}
                deleteBook={(isbn13) => booksModel.delete(setStore, isbn13)}
            />
        </Page>
    );
}
