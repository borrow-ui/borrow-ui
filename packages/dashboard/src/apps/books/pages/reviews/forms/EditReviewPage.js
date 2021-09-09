import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Page } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BOOKS_BOOK_BASE_URL } from 'apps/books/constants';
import { reviewsModel } from 'apps/books/models/review';
import { ReviewForm } from 'apps/books/components/reviews/ReviewForm';

export function EditReviewPage() {
    const history = useHistory();
    const { setStore, store } = useContext(storeContext);

    const params = useParams();
    const reviewId = params.id;

    const review = store.books.reviews[reviewId];

    const onSubmit = (changedReview) => {
        return reviewsModel.save(setStore, changedReview).then(() => {
            history.push(`${BOOKS_BOOK_BASE_URL}/${changedReview.isbn13}`);
        });
    };

    const onCancel = () => history.push(`${BOOKS_BOOK_BASE_URL}/${review.isbn13}`);

    return (
        <Page title="Add new review">
            <ReviewForm review={review} onSubmit={onSubmit} onCancel={onCancel} />
        </Page>
    );
}
