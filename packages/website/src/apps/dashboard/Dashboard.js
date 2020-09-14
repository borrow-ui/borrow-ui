import React from 'react';

import { Row, Col, Block, Tile, Title, Table, IconControl } from '@borrow-ui/ui';

export function Dashboard() {
    return (
        <div className="p-10">
            <Row>
                <Col colClassName="col-xs-12 col-sm-6 col-md-3">
                    <Block className="flex-center-start" outstanding={true} rounded={false}>
                        <Tile description="Components">
                            {<Title className="m-t-10 m-b-10">10+</Title>}
                        </Tile>
                    </Block>
                </Col>
                <Col colClassName="col-xs-12 col-sm-6 col-md-3">
                    <Block className="flex-center-start" outstanding={true} rounded={false}>
                        <Tile description="Random number">
                            {<Title className="m-t-10 m-b-10">42</Title>}
                        </Tile>
                    </Block>
                </Col>
                <Col colClassName="col-xs-12 col-sm-12 col-md-6">
                    <Block outstanding={true} rounded={false}>
                        <Row>
                            <Col colClassName="col-xs-6">
                                <Block
                                    className="flex-center-start"
                                    separated={false}
                                    padded={false}
                                    rounded={false}
                                >
                                    <Tile description="Random number">
                                        {<Title className="m-t-10 m-b-10">42</Title>}
                                    </Tile>
                                </Block>
                            </Col>
                            <Col colClassName="col-xs-6">
                                <Block
                                    className="flex-center-start"
                                    separated={false}
                                    padded={false}
                                    rounded={false}
                                >
                                    <Tile description="Another number">
                                        {<Title className="m-t-10 m-b-10">220</Title>}
                                    </Tile>
                                </Block>
                            </Col>
                        </Row>
                    </Block>
                </Col>
            </Row>
            <Block outstanding={true} rounded={false}>
                <Row>
                    <Col colClassName="col-xs-12 col-sm-6">
                        <Title tag="h3" className="color-accent">
                            Important Table
                        </Title>
                        <Table {...getTable1Props()} />
                    </Col>
                    <Col colClassName="col-xs-12 col-sm-6">
                        <Title tag="h3" className="color-negative">
                            Error Table
                        </Title>
                        <Table {...getTable1Props()} />
                    </Col>
                    <Col colClassName="col-xs-12 col-sm-6"></Col>
                </Row>
            </Block>
        </div>
    );
}

function getColumnsAndEntries() {
    const columns = [
        { title: 'Name', prop: 'name' },
        { title: 'Description', prop: 'description' },
        { title: '', prop: 'controls', width: 75 },
    ];
    const entries = [];
    for (let i = 1; i <= 23; i++)
        entries.push({
            id: i,
            name: 'Entry ' + i,
            description: 'A very long description for the row ' + i,
            controls: (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconControl
                        name="add"
                        onClick={() => window.alert(`Add ${i} clicked`)}
                        className="m-r-5"
                    />
                    <IconControl
                        name="remove"
                        onClick={() => window.alert(`Remove ${i} clicked`)}
                    />
                </div>
            ),
        });
    return {
        columns,
        entries,
    };
}

function getTable1Props() {
    return {
        ...getColumnsAndEntries(),
        pagination: {
            pageSize: 5,
        },
    };
}
