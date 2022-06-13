import React from 'react';
import { createRoot } from 'react-dom/client';

// Loads third-party requirements
import './thirdParty';

// Includes the dashboard style
import './styles/dashboard.scss';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
