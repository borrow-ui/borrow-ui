import { Switch, Route } from 'react-router-dom';

import { BooksRoutes, BOOKS_BASE_URL } from 'apps/books/Routes';
import { MoviesRoutes, MOVIES_BASE_URL } from 'apps/movies/Routes';
import { Home } from './components/home/Home';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path={BOOKS_BASE_URL} component={BooksRoutes} />
            <Route path={MOVIES_BASE_URL} component={MoviesRoutes} />
        </Switch>
    );
}
