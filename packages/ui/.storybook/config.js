import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import '!style-loader!css-loader!sass-loader!./scss-loader.scss';

const headers = ['Getting Started', 'Project Structure', 'Components', 'Forms'];

// source: https://github.com/storybookjs/storybook/issues/6327#issuecomment-613122487
const storySort = (a, b) => {
    // a[1].kind is something like: Components|Accordion. Using "Components" for the headers array.
    // Using Components from ^^^
    const aHeader = a[1].kind.substr(0, a[1].kind.indexOf('|'));
    const bHeader = b[1].kind.substr(0, b[1].kind.indexOf('|'));

    if (aHeader !== bHeader) {
        // Comparing something like "components-accordion--main" to "getting-started-app--main".
        const aHeaderIndex = headers.findIndex(h => h === aHeader);
        const bHeaderIndex = headers.findIndex(h => h === bHeader);
        return aHeaderIndex - bHeaderIndex;
    }

    // Make pages without folder before
    if (a[1].kind.indexOf('/') >= 0 && b[1].kind.indexOf('/') === -1) {
        return 1;
    }
    if (a[1].kind.indexOf('/') === -1 && b[1].kind.indexOf('/') >= 0) {
        return -1;
    }

    const aName = a[1].parameters.fileName;
    const bName = b[1].parameters.fileName;
    return aName.localeCompare(bName, undefined, { numeric: true });
};

addParameters({
    docs: {
        container: DocsContainer,
        page: DocsPage,
    },
    options: {
        storySort,
    },
});
