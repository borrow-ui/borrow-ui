import React from 'react';

import { Title, Row, Col } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function GridDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="grid" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Grid
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Row, Col } from '@borrow-ui/ui';"
                docs="?path=/docs/components-grid--default-story"
            />
            <div>
                <Row className="m-b-20">
                    <Col style={{ backgroundColor: '#EEE' }}>
                        <span className="p-10 display-inline-block">First Column</span>
                    </Col>
                    <Col style={{ backgroundColor: '#E2E2E2' }}>
                        <span className="p-10 display-inline-block">Second Column</span>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col colClassName="col-xs-12 col-sm-3" style={{ backgroundColor: '#EEE' }}>
                        <span className="p-10 display-inline-block">First</span>
                    </Col>
                    <Col colClassName="col-xs-12 col-sm-3" style={{ backgroundColor: '#E2E2E2' }}>
                        <span className="p-10 display-inline-block">Second</span>
                    </Col>
                    <Col colClassName="col-xs-12 col-sm-3" style={{ backgroundColor: '#EEE' }}>
                        <span className="p-10 display-inline-block">Third</span>
                    </Col>
                    <Col colClassName="col-xs-12 col-sm-3" style={{ backgroundColor: '#E2E2E2' }}>
                        <span className="p-10 display-inline-block">Fourth</span>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#EEE' }}>
                        <span className="p-10 display-inline-block">1</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#E2E2E2' }}>
                        <span className="p-10 display-inline-block">2</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#EEE' }}>
                        <span className="p-10 display-inline-block">3</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#E2E2E2' }}>
                        <span className="p-10 display-inline-block">4</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#EEE' }}>
                        <span className="p-10 display-inline-block">5</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#E2E2E2' }}>
                        <span className="p-10 display-inline-block">6</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#EEE' }}>
                        <span className="p-10 display-inline-block">7</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#E2E2E2' }}>
                        <span className="p-10 display-inline-block">8</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#EEE' }}>
                        <span className="p-10 display-inline-block">9</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#E2E2E2' }}>
                        <span className="p-10 display-inline-block">10</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#EEE' }}>
                        <span className="p-10 display-inline-block">11</span>
                    </Col>
                    <Col colClassName="col-xs-3 col-sm-1" style={{ backgroundColor: '#E2E2E2' }}>
                        <span className="p-10 display-inline-block">12</span>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
