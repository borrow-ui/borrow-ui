import { Switch, Route } from 'react-router-dom';

import { MoviesHomePage } from './pages/home/MoviesHomePage';
import { MOVIES_BASE_URL } from './constants';

export { MOVIES_BASE_URL };

export function MoviesRoutes() {
    return (
        <Switch>
            <Route path={MOVIES_BASE_URL} component={MoviesHomePage} />
        </Switch>
    );
}
