import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { COMPONENTS_SHOWCASE_BASE_URL } from './constants';
import { SinglePage } from './SinglePage';

export { COMPONENTS_SHOWCASE_BASE_URL };

export function ComponentsShowcaseRoutes() {
    return (
        <Switch>
            <Route path={`${COMPONENTS_SHOWCASE_BASE_URL}/single-page`} component={SinglePage} />
        </Switch>
    );
}
