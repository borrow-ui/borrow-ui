/**
 * Dashboard home page.
 *
 * This page:
 * - shows the links to the apps by using tiles;
 * - connects to the store and shows the latest books.
 */

import { useContext } from 'react';

import { Page, Title, TileLink, Text } from '@borrow-ui/ui';

import { storeContext } from 'store';
import { BookCard } from 'apps/books/components/books/BookCard';

export function Home() {
    const { store } = useContext(storeContext);
    const books = store.books && store.books.books ? Object.values(store.books.books) : [];

    return (
        <Page title="Dashboard Home">
            <div>
                <Title tag="h3" className="color-secondary m-t-0">
                    Welcome {store.user.first_name}!
                </Title>
                <Text>
                    This is your dashboard home page. Here you will find your latest books and
                    albums.
                </Text>
            </div>
            <div className="dashboard-home__container">
                <div className="flex-start-start flex--wrap">
                    <TileLink
                        size="big"
                        to="/books"
                        name="My books"
                        description="View and manage all your books"
                        icon="my_library_books"
                    />
                    <TileLink
                        size="big"
                        to="/movies"
                        name="My Movies"
                        description="View and manage movies library"
                        icon="movie"
                    />
                </div>
                <div className="dashboard-home__latest-items">
                    <Title tag="h3">Latest books</Title>
                    <div className="m-b-20">
                        {books.slice(0, 2).map((book) => (
                            <BookCard key={book.isbn13} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </Page>
    );
}
