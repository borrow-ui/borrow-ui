import React, { Fragment } from 'react';
import './App.css';

import { Header } from './scaffold/header/Header';
import { Home } from './pages/home/Home';

function App() {
    return (
        <Fragment>
            <Header />
            <Home />
        </Fragment>
    );
}

export default App;
