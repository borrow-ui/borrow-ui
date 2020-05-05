import React from 'react';

import { Block, Title, Row, Col, Text, Link, Monospace } from '@borrow-ui/ui';

export function StructureProject() {
    return (
        <Block>
            <Title tag="h2" className="m-t-0 m-r-10 color-primary">
                Structure your project
            </Title>
            <Row>
                <Col colClassName="col-sm-12 col-md-6">
                    <div style={{ display: 'inline-block' }}>
                        <Text size="big" className="m-t-10">
                            The repository is a Monorepo made with <Monospace>lerna</Monospace>
                            and <Monospace>yarn workspaces</Monospace>
                        </Text>
                        <Text>
                            If you {"don't"} want to use a Monorepo, just copy the{' '}
                            <Monospace>ui</Monospace> folder inside your project and add the{' '}
                            <Link href="https://github.com/borrow-ui/borrow-ui/blob/master/packages/ui/package.json">
                                dependencies
                            </Link>
                        </Text>
                    </div>
                </Col>
                <Col colClassName="col-sm-12 col-md-6">
                    <Text className="m-t-10">
                        In the monorepo you will find the following packages:
                        <ul>
                            <li>
                                <Monospace>ui</Monospace>: the UI library with components and styles
                            </li>
                            <li>
                                <Monospace>website</Monospace>: the code of this website
                            </li>
                        </ul>
                    </Text>
                </Col>
            </Row>
        </Block>
    );
}
