import React from 'react';
import PropTypes from 'prop-types';

import { Icon, SyntaxHighlight } from '@borrow-ui/ui';

const STORYBOOK_BASE_URL = process.env.STORYBOOK_BASE_URL;

export function ImportStatement({ importStatement, docs }) {
    return (
        <div className="flex-spacebetween-center m-b-20">
            <div style={{ width: 'calc(100% - 40px)' }}>
                <SyntaxHighlight language="jsx" code={importStatement} />
            </div>
            <div className="flex-end-center">
                <a href={`${STORYBOOK_BASE_URL}${docs}`} className="color-primary">
                    <Icon size="big" name="article" />
                </a>
            </div>
        </div>
    );
}

ImportStatement.propTypes = {
    /** import statement code */
    importStatement: PropTypes.string.isRequired,
    /** Link to docs */
    docs: PropTypes.string.isRequired,
};
