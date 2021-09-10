/**
 *
 */

import { useContext, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Page } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BOOKS_BOOK_BASE_URL } from 'apps/books/constants';
import { reviewsModel } from 'apps/books/models/review';
import { ReviewForm } from 'apps/books/components/reviews/ReviewForm';

export function AddReviewPage() {
    const history = useHistory();
    const { setStore } = useContext(storeContext);

    const params = useParams();
    const isbn13 = params.isbn13;

    const review = useMemo(() => reviewsModel.newReview(isbn13), [isbn13]);

    const onSubmit = (newReview) => {
        return reviewsModel.add(setStore, newReview).then(() => {
            history.push(`${BOOKS_BOOK_BASE_URL}/${isbn13}`);
        });
    };

    const onCancel = () => history.push(`${BOOKS_BOOK_BASE_URL}/${isbn13}`);

    return (
        <Page title="Add new review">
            <ReviewForm review={review} onSubmit={onSubmit} onCancel={onCancel} />
        </Page>
    );
}
