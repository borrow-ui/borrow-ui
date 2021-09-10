/**
 * Page component that holds the logic to show the details of a book.
 * In this page the book is loaded from the store directly.
 *
 * Ideally, it should be retrieved from the database if not in the store
 * (or if a cached value is not reliable).
 *
 * The page component also retrieves the reviews for the book.
 * Technically can have more reviews, but for simplicity the add button
 * is shown only if no reviews are visible.
 *
 * The control buttons are added to the page header using the `pageHeader`
 * - `controls` attribute,
 */

import { useContext, useMemo } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import { Breadcrumbs, Page, Button, Title, Block } from '@borrow-ui/ui';

import { storeContext } from 'store';

import {
    BOOKS_BASE_URL,
    BOOKS_BREADCRUMBS,
    BOOKS_BOOK_BASE_URL,
    BOOKS_REVIEW_BASE_URL,
} from 'apps/books/constants';
import { booksModel } from 'apps/books/models/book';
import { reviewsModel } from 'apps/books/models/review';
import { ReviewDetail } from 'apps/books/components/reviews/ReviewDetail';
import { DeleteBookButton } from 'apps/books/components/books/DeleteBookButton';
import { BookDetail } from 'apps/books/components/books/BookDetail';

import './bookDetailPage.scss';

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
                    <div className="book__reviews">
                        {reviews.length === 0 && (
                            <Button
                                mean="positive"
                                tag={Link}
                                to={`${BOOKS_REVIEW_BASE_URL}/add/${isbn13}`}
                            >
                                Add Review
                            </Button>
                        )}
                        {reviews.length > 0 && (
                            <>
                                <Title tag="h3">Reviews</Title>
                                {reviews.map((review) => (
                                    <Block
                                        outstanding={true}
                                        key={review.id}
                                        className="dashboard__readable-content"
                                    >
                                        <ReviewDetail
                                            review={review}
                                            deleteReview={(id) => reviewsModel.delete(setStore, id)}
                                        />
                                    </Block>
                                ))}
                            </>
                        )}
                    </div>
                </>
            )}
        </Page>
    );
}
