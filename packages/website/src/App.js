import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { useLocation, Link, BrowserRouter } from 'react-router-dom';

import { setConfig } from '@borrow-ui/ui/lib';

import './App.css';

import { Website } from './Website';

setConfig('getLocation', useLocation);
setConfig('getLinkComponent', () => Link);

function App() {
    return (
        <BrowserRouter>
            <Website />
        </BrowserRouter>
    );
}

export default App;
