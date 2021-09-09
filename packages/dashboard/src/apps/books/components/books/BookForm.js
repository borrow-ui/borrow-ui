import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Forms, Button, Icon, ReferenceOverlay, Loader } from '@borrow-ui/ui';

import { booksModel } from 'apps/books/models/book';

const { Field, Textarea, Input, Dropzone } = Forms;

export function BookForm({ book, onSubmit, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(book || booksModel.newBook());

    const onFormSubmit = (e) => {
        e.preventDefault();

        const bookToSave = { ...data };
        if (book) {
            // Set the old isbn13, which has to be deleted if changed
            bookToSave._old_isbn13 = book.isbn13;
        } else {
            // Overrides the image, upload is not purpose of this demo
            bookToSave.image = 'https://picsum.photos/200/300';
        }

        setLoading(true);
        onSubmit(bookToSave).catch(() => {
            setLoading(false);
        });
    };

    // helper to set a new value
    const setField = useCallback((field, value) => {
        setData((d) => ({ ...d, [field]: value }));
    }, []);

    return (
        <form onSubmit={onFormSubmit}>
            <div style={{ maxWidth: 700 }}>
                <div className="flex-start-start">
                    <div style={{ flexGrow: 1, marginRight: 20 }}>
                        <Field label="ISBN13" htmlFor="isbn13">
                            <Input
                                id="isbn13"
                                value={data.isbn13 || ''}
                                onChange={(e) => setField('isbn13', e.target.value)}
                            />
                        </Field>
                    </div>
                    <div className="w-100">
                        <Field label="Price" htmlFor="price">
                            <Input
                                id="price"
                                value={data.price || ''}
                                onChange={(e) => setField('price', e.target.value)}
                            />
                        </Field>
                    </div>
                </div>
                <Field label="Title" htmlFor="title">
                    <Input
                        id="title"
                        value={data.title || ''}
                        onChange={(e) => setField('title', e.target.value)}
                    />
                </Field>
                <Field label="Subtitle" htmlFor="subtitle">
                    <Textarea
                        id="subtitle"
                        value={data.subtitle || ''}
                        onChange={(e) => setField('subtitle', e.target.value)}
                    />
                </Field>
                <Field
                    label={
                        <>
                            Image
                            {book && (
                                <ReferenceOverlay
                                    overlayContent={<img src={book.image} alt="Book Cover" />}
                                >
                                    <Icon name="image" size="smaller" className="m-l-5" />
                                </ReferenceOverlay>
                            )}
                        </>
                    }
                    description="For the purpose of this demo, this will be ignored"
                >
                    <Dropzone
                        maxFiles={1}
                        initialFiles={book ? [{ name: 'existing_cover.png' }] : []}
                    />
                </Field>
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

BookForm.propTypes = {
    book: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};
