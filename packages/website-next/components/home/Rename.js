import React from 'react';

import { Block, Title, Row, Col, Text, Card, Monospace } from '@borrow-ui/ui';

export function Rename() {
    return (
        <Block>
            <Title tag="h2" className="m-t-0 m-r-10 color-primary">
                Rename
            </Title>
            <Row>
                <Col colClassName="col-sm-12 col-md-6">
                    <Text>
                        With your own favourite code editor, rename all occurrences of{' '}
                        <Monospace>borrow-ui</Monospace> to your preferred name
                    </Text>
                </Col>
                <Col colClassName="col-sm-12 col-md-6">
                    <Card
                        icon={<Title className="color-accent">?</Title>}
                        sideProps={{ className: 'color-accent-bg' }}
                        title="Why renaming?"
                        shadowed={false}
                        description={
                            <Text>
                                A dedicated script is on the roadmap, in the meantime just use your
                                favourite tools!
                            </Text>
                        }
                    />
                </Col>
            </Row>
        </Block>
    );
}
