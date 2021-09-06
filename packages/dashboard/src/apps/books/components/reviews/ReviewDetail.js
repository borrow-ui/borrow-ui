import PropTypes from 'prop-types';

import { Icon, Title, Forms, Badge } from '@borrow-ui/ui';

import { MultiLineText } from 'components/common/MultiLineText';

import './reviewDetail.scss';

const { Field } = Forms;

export function ReviewDetail({ review }) {
    return (
        <div className="review">
            <Title tag="h4" className="flex-start-center">
                {review.title}
            </Title>
            <div className="flex-start-center">
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
            <Field label="Opinion" layout="horizontal" labelWidth={100}>
                {review.positive_opinion ? (
                    <Icon name="check" size="small" className="color-positive m-r-5" />
                ) : (
                    <Icon name="close" size="small" className="color-negative m-r-5" />
                )}
            </Field>
            <Field label="Started on" layout="horizontal" labelWidth={100}>
                {review.started_on}
            </Field>
            <Field label="Topics" layout="horizontal" labelWidth={100}>
                {review.topics.map((topic) => (
                    <Badge key={topic} color="secondary" className="m-l-0 m-r-10">
                        {topic}
                    </Badge>
                ))}
            </Field>
            <Field label="Description">
                <MultiLineText text={review.description} />
            </Field>
        </div>
    );
}

ReviewDetail.propTypes = {
    review: PropTypes.object.isRequired,
};
