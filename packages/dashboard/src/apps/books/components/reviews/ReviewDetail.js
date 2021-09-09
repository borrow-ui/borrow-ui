import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Icon, Title, IconControl, Badge } from '@borrow-ui/ui';

import { beautify } from 'utils/strings';
import { MultiLineText } from 'components/common/MultiLineText';

import { BOOKS_REVIEW_BASE_URL } from 'apps/books/constants';

import { DeleteReviewIconControl } from './DeleteReviewIconControl';
import './reviewDetail.scss';

export function ReviewDetail({ review, deleteReview }) {
    return (
        <div className="review">
            <Title tag="h3" className="flex-spacebetween-center">
                {review.title}
                <div className="review__controls">
                    <Link to={`${BOOKS_REVIEW_BASE_URL}/${review.id}/edit`}>
                        <IconControl name="edit" className="m-l-15" />
                    </Link>
                    <DeleteReviewIconControl reviewId={review.id} deleteReview={deleteReview} />
                </div>
            </Title>
            <div className="flex-start-center">
                <div className="review__info">
                    {new Array(5)
                        .fill(0)
                        .map((_, i) =>
                            i < review.stars ? (
                                <Icon
                                    key={i}
                                    name="star"
                                    size="smaller"
                                    className="color-secondary m-r-5"
                                />
                            ) : (
                                <Icon
                                    key={i}
                                    name="star_outline"
                                    size="smaller"
                                    className="color-neutral-light m-r-5"
                                />
                            )
                        )}
                </div>
                <div className="review__info">
                    {review.topics.map((topic) => (
                        <Badge key={topic} color="secondary" className="m-l-0 m-r-10">
                            {beautify(topic)}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="flex-start-center m-t-15">
                <div className="review__info">
                    <span className="color-neutral-light m-r-5">Started on </span>
                    {review.started_on}
                    {review.completed && (
                        <>
                            <Icon
                                name="check"
                                size="small"
                                className="color-positive m-l-20 m-r-5"
                            />
                            <span className="color-neutral-light">Completed</span>
                        </>
                    )}
                    {!review.completed && (
                        <>
                            <Icon
                                name="close"
                                size="small"
                                className="color-negative m-l-20 m-r-5"
                            />
                            <span className="color-neutral-light">Not Completed (yet)</span>
                        </>
                    )}
                </div>
                <div className="review__info">
                    {review.recommend_to_friends && (
                        <>
                            <Icon name="check" size="small" className="color-positive m-r-5" />
                            <span className="color-neutral-light">Recommend to friends</span>
                        </>
                    )}
                    {!review.recommend_to_friends && (
                        <>
                            <Icon name="close" size="small" className="color-negative m-r-5" />
                            <span className="color-neutral-light">Would not recommend</span>
                        </>
                    )}
                </div>
            </div>

            <div className="m-t-15">
                <MultiLineText text={review.description} />
            </div>
        </div>
    );
}

ReviewDetail.propTypes = {
    review: PropTypes.object.isRequired,
};
