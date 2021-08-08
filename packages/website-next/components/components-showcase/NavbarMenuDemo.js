import React from 'react';

import { Title, NavbarMenu, Row, Col } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function NavbarMenuDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="navbarmenus" className="component-anchor">
                <Title tag="h2" className="color-accent">
                    Navbar Menus
                </Title>
            </a>
            <ImportStatement
                importStatement="import { NavbarMenu } from '@borrow-ui/ui';"
                docs="?path=/docs/components-navbarmenu--default-story"
            />
            <div style={{ fontSize: 14 }}>
                <Row>
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
                            ]}
                        />
                    </Col>
                    <Col>
                        <NavbarMenu
                            title="Menu on the right"
                            entries={[
                                {
                                    label: 'Clickable one',
                                    description: 'Hover to see the cursor, click to view the alert',
                                    style: { cursor: 'pointer' },
                                    onClick: () => window.alert('Entry clicked'),
                                },
                                {
                                    label: <span>Custom element as label</span>,
                                    description:
                                        'This also has a description, helpful to get more context',
                                },
                                {
                                    label: 'Custom element as description',
                                    description: (
                                        <div style={{ color: 'green' }}>A green description</div>
                                    ),
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
