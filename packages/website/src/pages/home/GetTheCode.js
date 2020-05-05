import React from 'react';
import PropTypes from 'prop-types';

import { Block, Row, Col, Title, Text, Button, Icon } from '@borrow-ui/ui';
import { SyntaxHighlight } from 'components/utils/SyntaxHighlight';

export function GetTheCode({ isSmallScreen }) {
    return (
        <Block outstanding={!isSmallScreen}>
            <Row>
                <Col colClassName="col-xs-12 col-sm-12 col-md-6">
                    <Title tag="h2" className="m-t-0 m-r-10 color-primary">
                        Get the code
                    </Title>
                    <div>
                        <Text>Create your own React Component Library in minutes!</Text>
                        <Text>Download the repository from the GitHub page</Text>
                        <Block contentCentered={true}>
                            <Button
                                modifiers={['shadowed']}
                                mean="accent"
                                tag="a"
                                href="https://github.com/borrow-ui/borrow-ui/archive/master.zip"
                                size="big"
                            >
                                <Icon name="file_download" size="small" />
                                Download
                            </Button>
                            <Button
                                modifiers={['shadowed']}
                                mean="primary-reverse"
                                tag="a"
                                href="https://github.com/borrow-ui/borrow-ui"
                                size="big"
                            >
                                Fork
                            </Button>
                        </Block>
                    </div>
                </Col>
                <Col colClassName="col-xs-12 col-sm-12 col-md-6">
                    <div style={{ display: 'flex', overflow: 'auto' }}>
                        <SyntaxHighlight code={installCode} language="bash" />
                    </div>
                </Col>
            </Row>
        </Block>
    );
}

GetTheCode.propTypes = {
    isSmallScreen: PropTypes.bool,
};

let installCode = `
# or directly from command line
curl -LJO https://github.com/borrow-ui/borrow-ui/archive/master.zip

`;
