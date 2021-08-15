import React from 'react';

import { Title, Navbar, Block, Lorem, Text, Row, Col, NavbarMenu } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function NavbarDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="navbars" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Navbars
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Navbar } from '@borrow-ui/ui';"
                docs="?path=/docs/components-navbar--default-story"
            />
            <div>
                <div
                    style={{
                        height: 400,
                        fontSize: '14px',
                        position: 'relative',
                        border: '1px solid #f5f7fa',
                    }}
                >
                    <Navbar
                        sticky={false}
                        left={[
                            'String item',
                            <span style={{ color: 'green' }} className="flex-center-center" key="1">
                                Node item
                            </span>,
                        ]}
                        center={[
                            {
                                headerLabel: 'Item with menu',
                                bodyItem: function Body() {
                                    return (
                                        <Block>
                                            <Lorem />
                                        </Block>
                                    );
                                },
                            },
                            {
                                headerLabel: 'Item with query',
                                bodyItem: function Body({ query }) {
                                    return (
                                        <Block>
                                            <Text>
                                                Type in the query input to filter the elements
                                                below.
                                            </Text>
                                            <Text className="color-neutral">
                                                Only the labels will be filtered, but the function
                                                is implemented by you so you can include also the
                                                descriptions.
                                            </Text>
                                            <Row style={{ marginTop: 20 }}>
                                                <Col>
                                                    <NavbarMenu
                                                        title="Menu on the left"
                                                        entries={[
                                                            { label: 'Entry 1' },
                                                            {
                                                                label: 'Second entry',
                                                                description:
                                                                    'This also has a description, helpful to get more context',
                                                            },
                                                            { label: 'Second Third one' },
                                                        ].filter(
                                                            (e) =>
                                                                !query ||
                                                                e.label
                                                                    .toLowerCase()
                                                                    .indexOf(query) >= 0
                                                        )}
                                                    />
                                                </Col>
                                                <Col>
                                                    <NavbarMenu
                                                        title="Menu on the right"
                                                        entries={[
                                                            { label: 'Another menu' },
                                                            { label: 'This one is on the right' },
                                                            {
                                                                label:
                                                                    'Or below if the page is short',
                                                            },
                                                        ].filter(
                                                            (e) =>
                                                                !query ||
                                                                e.label
                                                                    .toLowerCase()
                                                                    .indexOf(query) >= 0
                                                        )}
                                                    />
                                                </Col>
                                            </Row>
                                        </Block>
                                    );
                                },
                                showQueryInput: true,
                            },
                        ]}
                        right={['v 0.0.1']}
                    />
                </div>
            </div>
        </div>
    );
}
