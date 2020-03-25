import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from 'pages/home/Home';

export function Routes() {
    return (
        <Switch>
            <Route path="/" exact={true} component={Home} />
        </Switch>
    );
}
