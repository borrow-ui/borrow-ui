import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import '!style-loader!css-loader!sass-loader!./scss-loader.scss';

export const parameters = {
    previewTabs: { 'storybook/docs/panel': { index: -1 } },
    options: {
        storySort: {
            order: [
                'Getting Started',
                'Project Structure',
                'Components',
                'Forms',
                ['Introduction', 'Field', 'Label', 'Components'],
                'Hooks',
                'Internals',
                ['Components'],
            ],
        },
    },
    viewport: {
        viewports: MINIMAL_VIEWPORTS,
    },
};
