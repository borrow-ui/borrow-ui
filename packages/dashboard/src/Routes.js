import { Routes, Route } from 'react-router-dom';

import { BooksRoutes, BOOKS_BASE_URL } from 'apps/books/Routes';
import { MoviesRoutes, MOVIES_BASE_URL } from 'apps/movies/Routes';
import { Home } from './components/home/Home';

export function MainRoutes() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path={`${BOOKS_BASE_URL}/*`} element={<BooksRoutes />} />
            <Route path={`${MOVIES_BASE_URL}/*`} element={<MoviesRoutes />} />
        </Routes>
    );
}
