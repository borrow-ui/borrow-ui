import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Button } from '@borrow-ui/ui';

import { BOOKS_BOOK_BASE_URL } from '../constants';

export function BookCard({ book, sideWidth = 100 }) {
    return (
        <Card
            className="w-400 m-r-20 m-b-20"
            style={{ height: 150 }}
            title={book.title}
            description={book.subtitle}
            sideContent={<img src={book.image} alt={book.title} style={{ width: sideWidth }} />}
            sideProps={{ style: { width: sideWidth }, className: 'color-gray-light-l2-bg' }}
            mainProps={{ style: { width: `calc(100% - ${sideWidth}px` } }}
            shadowed={false}
            standingHover={true}
            controls={
                <>
                    <span />
                    <Button
                        tag={Link}
                        to={`${BOOKS_BOOK_BASE_URL}/${book.isbn13}`}
                        mean="positive"
                        size="smaller"
                        flat
                    >
                        View
                    </Button>
                </>
            }
        />
    );
}

BookCard.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        isbn13: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
    sideWidth: PropTypes.number,
};
