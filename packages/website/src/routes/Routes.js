import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from 'pages/home/Home';
import {
    ComponentsShowcaseRoutes,
    COMPONENTS_SHOWCASE_BASE_URL,
} from 'apps/components-showcase/ComponentsShowcaseRoutes';

export function Routes() {
    return (
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path={COMPONENTS_SHOWCASE_BASE_URL} component={ComponentsShowcaseRoutes} />
        </Switch>
    );
}
