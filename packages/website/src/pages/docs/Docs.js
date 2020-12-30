import React from 'react';
import PropTypes from 'prop-types';

import { Page, Responsive, Title, Text } from '@borrow-ui/ui';

export function Docs() {
    return (
        <div style={{ display: 'flex' }}>
            <Page continuousScroll={true}>
                <Responsive>{matches => <DocsContent isSmallScreen={matches.small} />}</Responsive>
            </Page>
        </div>
    );
}
function DocsContent({ isSmallScreen }) {
    return (
        <div className="documentation__container">
            <Title>Documentation</Title>
            <Text size="big">Work in progress</Text>
            <Text>Documentation will be available as a Docz docs.</Text>
        </div>
    );
}

DocsContent.propTypes = {
    isSmallScreen: PropTypes.bool,
};
