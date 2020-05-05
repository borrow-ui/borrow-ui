import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { DASHBOARD_BASE_URL } from './constants';
import { Dashboard } from './Dashboard';

export { DASHBOARD_BASE_URL };

export function DashboardRoutes() {
    return (
        <Switch>
            <Route path={DASHBOARD_BASE_URL} exact component={Dashboard} />
        </Switch>
    );
}
