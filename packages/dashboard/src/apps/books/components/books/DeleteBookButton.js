/**
 * The delete button opens a modal for confirmation.
 *
 * The modal can not be closed while book is being deleted.
 *
 * As other forms in this demo, there is no need for a
 * catch in the promise action.
 */

import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, Loader } from '@borrow-ui/ui';

export function DeleteBookButton({ book, deleteBook, onDelete, buttonProps = {} }) {
    const [loading, setLoading] = useState(false);

    const deleteBookFn = (isbn13) => {
        setLoading(true);
        return deleteBook(isbn13).then(() => {
            setLoading(false);
        });
    };

    return (
        <Modal
            Trigger={({ setVisible }) => (
                <Button mean="negative" onClick={() => setVisible(true)} {...buttonProps}>
                    Delete
                </Button>
            )}
            getModalWindowProps={({ setVisible }) => ({
                title: 'Delete book',
                content: `Are you sure to delete "${book.title}" book?`,
                footer: (
                    <>
                        <span />
                        <div>
                            <Button
                                mean="negative"
                                className="m-r-5"
                                onClick={async () => {
                                    await deleteBookFn(book.isbn13);
                                    setVisible(false);
                                    onDelete && onDelete();
                                }}
                                disabled={loading}
                                flat={true}
                            >
                                {loading ? <Loader type="inline" /> : 'Delete'}
                            </Button>
                            <Button onClick={() => setVisible(false)} disabled={loading}>
                                Cancel
                            </Button>
                        </div>
                    </>
                ),
                showCloseIcon: !loading,
                closeOnEscape: !loading,
                canMaximize: false,
                startHeight: 200,
                startWidth: 400,
            })}
        />
    );
}

DeleteBookButton.propTypes = {
    /** Book to be deleted */
    book: PropTypes.object.isRequired,
    /** Function to call when Delete confirmation button is pressed */
    deleteBook: PropTypes.func.isRequired,
    /** Function to call when a book has been deleted */
    onDelete: PropTypes.func,
    /** Forward props to the button for overrides */
    buttonProps: PropTypes.object,
};
