import { useContext, useMemo } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import { Breadcrumbs, Page, Button, Title, Block } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BOOKS_BASE_URL, BOOKS_BREADCRUMBS, BOOKS_BOOK_BASE_URL } from 'apps/books/constants';
import { booksModel } from 'apps/books/models/book';
import { ReviewDetail } from 'apps/books/components/reviews/ReviewDetail';
import { DeleteBookButton } from 'apps/books/components/books/DeleteBookButton';
import { BookDetail } from 'apps/books/components/books/BookDetail';

export function BookDetailPage() {
    const { store, setStore } = useContext(storeContext);
    const history = useHistory();

    const params = useParams();
    const isbn13 = params.isbn13;

    const book = store.books.books[isbn13];
    const reviews = useMemo(
        () => Object.values(store.books.reviews).filter((r) => r.isbn13 === isbn13),
        [isbn13, store]
    );

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
                    <>
                        <Button
                            tag={Link}
                            to={`${BOOKS_BOOK_BASE_URL}/${isbn13}/edit`}
                            mean="secondary"
                            className="m-r-5"
                        >
                            Edit
                        </Button>
                        <DeleteBookButton
                            book={book || {}}
                            deleteBook={(isbn13) => booksModel.delete(setStore, isbn13)}
                            onDelete={() => history.push(BOOKS_BASE_URL)}
                        />
                    </>
                ),
            }}
        >
            {book && (
                <>
                    <BookDetail book={book} />
                    {reviews.length > 0 && (
                        <>
                            <Title tag="h3">Reviews</Title>
                            {reviews.map((review) => (
                                <Block outstanding={true} key={review.id}>
                                    <ReviewDetail review={review} />
                                </Block>
                            ))}
                        </>
                    )}
                </>
            )}
        </Page>
    );
}