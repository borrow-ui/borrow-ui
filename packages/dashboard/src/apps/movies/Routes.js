import { Routes, Route } from 'react-router-dom';

import { MoviesHomePage } from './pages/home/MoviesHomePage';
import { MOVIES_BASE_URL } from './constants';

export { MOVIES_BASE_URL };

export function MoviesRoutes() {
    return (
        <Routes>
            <Route index element={<MoviesHomePage />} />
        </Routes>
    );
}
