import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Link, Loader, Table } from '@borrow-ui/ui';

import { BOOKS_BOOK_BASE_URL } from 'apps/books/constants';

import { DeleteBookButton } from './DeleteBookButton';

const TABLE_COLUMNS = [
    { prop: 'title_link', title: 'Title' },
    { prop: 'subtitle', title: 'Subtitle' },
    { prop: 'isbn13', title: 'ISBN' },
    { prop: 'controls', title: '' },
];

export function BooksList({ books, deleteBook, showSubtitle = true }) {
    let columns = deleteBook
        ? TABLE_COLUMNS
        : TABLE_COLUMNS.filter((col) => col.prop !== 'controls');
    if (!showSubtitle) columns = columns.filter((col) => col.prop !== 'subtitle');

    const booksList = useMemo(() => {
        if (!books) return null;

        return books.map((book) => ({
            ...book,
            title_link: <Link to={`${BOOKS_BOOK_BASE_URL}/${book.isbn13}`}>{book.title}</Link>,
            controls: deleteBook ? (
                <>
                    <DeleteBookButton
                        book={book}
                        deleteBook={deleteBook}
                        buttonProps={{ size: 'smaller', flat: true }}
                    />
                </>
            ) : null,
        }));
    }, [books, deleteBook]);

    if (!books)
        return (
            <div className="flex-center-center h-200">
                <Loader />
            </div>
        );

    return <Table entries={booksList} columns={columns} pagination={{ pageSize: 5 }} />;
}

BooksList.propTypes = {
    /** List of books */
    books: PropTypes.array.isRequired,
    /** Function to call to delete a book. If not passed,
     * controls column will not be rendered */
    deleteBook: PropTypes.func,
};
