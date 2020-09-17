import React from 'react';

import { Row, Col, Tile, Icon, Title } from '@borrow-ui/ui';

export function KeyPoints() {
    return (
        <div className="home__key-points">
            <Row>
                <Col colClassName="col-xs-6 col-md-3 flex-center-start">
                    <Tile description="Small reusable components">
                        <Icon name="compress" size="bigger" />
                    </Tile>
                </Col>
                <Col colClassName="col-xs-6 col-md-3 flex-center-start">
                    <Tile description="Documented and tested">
                        <Icon name="format_align_left" size="bigger" />
                    </Tile>
                </Col>
                <Col colClassName="col-xs-6 col-md-3 flex-center-start">
                    <Tile description="Easy to extend">
                        <Icon name="extension" size="bigger" />
                    </Tile>
                </Col>
                <Col colClassName="col-xs-6 col-md-3 flex-center-start">
                    <Tile description="Dashboard examples">
                        <Icon name="view_compact" size="bigger" />
                    </Tile>
                </Col>
            </Row>
            <Row>
                <Col colClassName="col-xs-6 col-md-3 flex-center-start">
                    <Tile description="Webpack + Babel">
                        <Icon name="view_in_ar" size="bigger" />
                    </Tile>
                </Col>
                <Col colClassName="col-xs-6 col-md-3 flex-center-start">
                    <Tile description="Storybook">
                        <Icon name="grid_view" size="bigger" />
                    </Tile>
                </Col>
                <Col colClassName="col-xs-6 col-md-3 flex-center-start">
                    <Tile description="Lerna Monorepo">
                        <Icon name="list_alt" size="bigger" />
                    </Tile>
                </Col>
                <Col colClassName="col-xs-6 col-md-3 flex-center-start">
                    <Tile description="BEM SCSS">
                        <Icon name="palette" size="bigger" />
                    </Tile>
                </Col>
            </Row>
            <div className="flex-center-center">
                <Title tag="h3">Create your components library now!</Title>
            </div>
        </div>
    );
}
