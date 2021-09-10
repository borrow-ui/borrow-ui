import React from 'react';
import ReactDOM from 'react-dom';

// Loads third-party requirements
import './thirdParty';

// Includes the dashboard style
import './styles/dashboard.scss';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
