import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Breadcrumbs, Page } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BOOKS_BREADCRUMBS } from '../../constants';

export function BookDetailPage() {
    const { store } = useContext(storeContext);

    const params = useParams();
    const isbn13 = +params.isbn13;

    const book = store.books[isbn13];

    return (
        <Page
            title={
                <>
                    <Breadcrumbs breadcrumbs={BOOKS_BREADCRUMBS} />
                    {book.title}
                </>
            }
        >
            Book details will be here.
        </Page>
    );
}
