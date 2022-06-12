/**
 *
 */

import { useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Page } from '@borrow-ui/ui';

import { storeContext } from 'store';

import { BOOKS_BOOK_BASE_URL } from 'apps/books/constants';
import { reviewsModel } from 'apps/books/models/review';
import { ReviewForm } from 'apps/books/components/reviews/ReviewForm';

export function AddReviewPage() {
    const navigate = useNavigate();
    const { setStore } = useContext(storeContext);

    const params = useParams();
    const isbn13 = params.isbn13;

    const review = useMemo(() => reviewsModel.newReview(isbn13), [isbn13]);

    const onSubmit = (newReview) => {
        return reviewsModel.add(setStore, newReview).then(() => {
            navigate(`${BOOKS_BOOK_BASE_URL}/${isbn13}`);
        });
    };

    const onCancel = () => navigate(`${BOOKS_BOOK_BASE_URL}/${isbn13}`);

    return (
        <Page title="Add new review">
            <ReviewForm review={review} onSubmit={onSubmit} onCancel={onCancel} />
        </Page>
    );
}
