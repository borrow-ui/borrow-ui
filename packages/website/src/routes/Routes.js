import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from 'pages/home/Home';
import { Docs } from 'pages/docs/Docs';
import {
    ComponentsShowcaseRoutes,
    COMPONENTS_SHOWCASE_BASE_URL,
} from 'apps/components-showcase/ComponentsShowcaseRoutes';
import { DashboardRoutes, DASHBOARD_BASE_URL } from 'apps/dashboard/DashboardRoutes';

export function Routes() {
    return (
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/docs" component={Docs} />
            <Route path={DASHBOARD_BASE_URL} component={DashboardRoutes} />
            <Route path={COMPONENTS_SHOWCASE_BASE_URL} component={ComponentsShowcaseRoutes} />
        </Switch>
    );
}
