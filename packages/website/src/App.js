import React from 'react';

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
