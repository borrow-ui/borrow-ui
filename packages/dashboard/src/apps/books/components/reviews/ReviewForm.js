/**
 * Creates an "uncontrolled" form using form components.
 * The components are imported directly from the library,
 * as opposed as BookForm.
 * Both ways are fine.
 *
 * The uncontrolled form is managed with react-hook-form.
 * Some components can be registered directly (text input and textarea)
 * while others needs to be wrapped with rhf's Controller.
 *
 * This forms shows also how to use watch to create a custom components
 * specific for this form (for the 'stars').
 *
 * The result is a much more verbose form but with better performances
 * and less re-rendering.
 *
 * As other parts of this demo, there is no need for validation or catches,
 * they are out of scope.
 */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';

import {
    Button,
    Loader,
    Icon,
    Field,
    Textarea,
    Input,
    Toggle,
    Select,
    DatePicker,
    Dropzone,
    Checkbox,
} from '@borrow-ui/ui';

import { beautify } from 'utils/strings';

import { TOPICS } from 'apps/books/constants';

const topicsOptions = TOPICS.map((cat) => ({ value: cat, label: beautify(cat) }));

export function ReviewForm({ review, onSubmit, onCancel }) {
    const [loading, setLoading] = useState(false);

    const { control, register, handleSubmit, setValue, watch } = useForm({
        defaultValues: review,
    });
    const watchStars = watch('stars');

    const onFormSubmit = (formReview) => {
        setLoading(true);
        const changedReview = { ...review, ...formReview };
        onSubmit(changedReview).catch(() => {
            setLoading(false);
        });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="dashboard__readable-content">
                <Field label="Title" htmlFor="isbn13">
                    <Input defaultValue={review.title || ''} {...register('title')} />
                </Field>
                <Field label="Rating" htmlFor="stars" layout="horizontal" labelWidth={100}>
                    <Star value={1} watchStars={watchStars} setValue={setValue} />
                    <Star value={2} watchStars={watchStars} setValue={setValue} />
                    <Star value={3} watchStars={watchStars} setValue={setValue} />
                    <Star value={4} watchStars={watchStars} setValue={setValue} />
                    <Star value={5} watchStars={watchStars} setValue={setValue} />

                    {watchStars > 0 && (
                        <Icon
                            name="block"
                            className="color-neutral-light m-r-10 cursor-pointer"
                            size="smaller"
                            onClick={() => setValue('stars', 0)}
                        />
                    )}
                </Field>
                <Controller
                    name="completed"
                    control={control}
                    defaultValue={review.completed}
                    render={({ field }) => (
                        <Field
                            label="Completed"
                            htmlFor="completed"
                            layout="horizontal"
                            labelWidth={100}
                        >
                            <Toggle
                                {...field}
                                id="completed"
                                checked={field.value}
                                onChange={field.onChange}
                            />
                        </Field>
                    )}
                />
                <Controller
                    name="started_on"
                    control={control}
                    defaultValue={review.started_on}
                    render={({ field }) => {
                        return (
                            <Field
                                label="Started On"
                                htmlFor="started_on"
                                layout="horizontal"
                                labelWidth={100}
                            >
                                <DatePicker
                                    {...field}
                                    initialValue={review.started_on}
                                    onDayChange={field.onChange}
                                />
                            </Field>
                        );
                    }}
                />
                <Controller
                    name="topics"
                    control={control}
                    defaultValue={review.topics}
                    render={({ field }) => {
                        return (
                            <Field
                                label="Topics"
                                htmlFor="topics"
                                layout="horizontal"
                                labelWidth={100}
                            >
                                <Select
                                    options={topicsOptions}
                                    {...field}
                                    value={field.value || []}
                                    onChange={(vv) =>
                                        field.onChange(vv ? vv.map((v) => v.value) : [])
                                    }
                                    isMulti={true}
                                />
                            </Field>
                        );
                    }}
                />
                <Field label="Description" htmlFor="description">
                    <Textarea
                        defaultValue={review.description || ''}
                        {...register('description')}
                    />
                </Field>

                <Controller
                    name="recommend_to_friends"
                    control={control}
                    defaultValue={review.recommend_to_friends}
                    render={({ field }) => (
                        <Field
                            label="Recommend to friends"
                            htmlFor="recommend_to_friends"
                            layout="horizontal"
                            labelWidth={160}
                        >
                            <Checkbox
                                {...field}
                                checked={field.value}
                                id="recommend_to_friends"
                                onChange={field.onChange}
                            />
                        </Field>
                    )}
                />

                <Controller
                    name="attachments"
                    control={control}
                    render={({ field }) => (
                        <Field
                            label="Attachments"
                            htmlFor="attachments"
                            description="For the purpose of this demo, this will be ignored"
                        >
                            <Dropzone
                                multiple={true}
                                onChange={(e) => field.onChange(e.target.files)}
                            />
                        </Field>
                    )}
                />
                <div className="flex-end-center">
                    <Button mean="neutral" onClick={onCancel} className="m-r-5" disabled={loading}>
                        Cancel
                    </Button>
                    <Button mean="primary" type="submit" disabled={loading}>
                        {loading ? <Loader type="inline" /> : 'Save'}
                    </Button>
                </div>
            </div>
        </form>
    );
}

ReviewForm.propTypes = {
    book: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

function Star({ value, watchStars, setValue }) {
    return (
        <Icon
            name={watchStars >= value ? 'star' : 'star_outline'}
            className={`${
                watchStars >= value ? 'color-secondary' : 'color-neutral-light'
            } m-r-5 cursor-pointer`}
            size="smaller"
            onClick={() => setValue('stars', value)}
        />
    );
}

Star.propTypes = {
    value: PropTypes.number.isRequired,
    watchStars: PropTypes.number,
    setValue: PropTypes.func.isRequired,
};
