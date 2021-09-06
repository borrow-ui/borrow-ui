import PropTypes from 'prop-types';

import { Col, Row, Forms } from '@borrow-ui/ui';

const { Field } = Forms;

export function BookDetail({ book }) {
    return (
        <>
            <Row>
                <Col colClassName="col-xs-12 col-sm-12 col-md-7">
                    <Field label="ISBN 13">{book.isbn13}</Field>
                    <Field label="Price">{book.price}</Field>
                    <Field label="Subtitle">{book.subtitle}</Field>
                </Col>
                <Col colClassName="col-xs-12 col-sm-12 col-md-5 first-xs last-md">
                    <div className="flex-center-start p-r-20">
                        <img
                            src={book.image}
                            alt={`${book.isbn13} Cover`}
                            style={{ border: '1px solid #efefef' }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
}

BookDetail.propTypes = {
    book: PropTypes.object.isRequired,
};
