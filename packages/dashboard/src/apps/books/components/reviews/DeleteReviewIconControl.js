/**
 * Similarly to DeleteBookButton, use an IconControl to open a modal
 * for confirmation.
 *
 * While the promise is loading, the modal will not be closable.
 */

import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, Loader, IconControl } from '@borrow-ui/ui';

export function DeleteReviewIconControl({ reviewId, deleteReview }) {
    const [loading, setLoading] = useState(false);

    const deleteReviewFn = (id) => {
        setLoading(true);
        return deleteReview(id).catch(() => {
            setLoading(false);
        });
    };

    return (
        <Modal
            Trigger={({ setVisible }) => (
                <IconControl name="delete" onClick={() => setVisible(true)} />
            )}
            getModalWindowProps={({ setVisible }) => ({
                title: 'Delete review',
                content: `Are you sure to delete this review?`,
                footer: (
                    <>
                        <span />
                        <div>
                            <Button
                                mean="negative"
                                className="m-r-5"
                                onClick={async () => {
                                    await deleteReviewFn(reviewId).catch(() => {
                                        setVisible(false);
                                    });
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

DeleteReviewIconControl.propTypes = {
    /** Review ID to be deleted */
    reviewId: PropTypes.number.isRequired,
    /** Function to call when Delete confirmation button is pressed */
    deleteReview: PropTypes.func.isRequired,
};
