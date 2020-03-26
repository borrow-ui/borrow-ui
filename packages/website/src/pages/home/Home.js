import React from 'react';

import {
    Lorem,
    Page,
    Subtitle,
    Text,
    TextContainer,
    Row,
    Col,
    Icon,
    Button,
} from '@borrow-ui/ui/lib';

import logo from 'static/borrow-ui-color-192.png';
import './home.scss';

export function Home() {
    return (
        <div style={{ display: 'flex' }}>
            <Page infinite={true}>
                <div className="borrow-ui__home__container">
                    <Row>
                        <Col size={8}>
                            <div className="borrow-ui__home__title__container">
                                <img
                                    src={logo}
                                    className="borrow-ui__home__logo"
                                    alt="Borrow UI logo"
                                />
                                <h1 className="borrow-ui__home__title">Borrow UI</h1>
                            </div>
                        </Col>
                        <Col size={4}>
                            <div className="borrow-ui__home__links-container">
                                <div className="borrow-ui__home__icons-container">
                                    <a
                                        href="https://github.com/borrow-ui/borrow-ui"
                                        className="color-neutral"
                                    >
                                        <Icon size="bigger" family="fab" name="fa-github" />
                                    </a>
                                </div>
                                <div className="borrow-ui__home__buttons-container">
                                    <Button modifiers={['shadowed']} mean="primary">
                                        Download
                                    </Button>
                                    <Button modifiers={['shadowed']} className="m-l-15">
                                        Rationale
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Text size="big">
                        A collection of React components built with simplicity in mind.
                    </Text>
                    <Subtitle>Borrow UI helps to bootstrap your Admin/Dashboard SPAs.</Subtitle>
                    <Text className="color-accent">
                        View the project on GitHub and fork to start your design system!
                    </Text>
                </div>
                <TextContainer centered={true}>
                    <Lorem paragraphs={3} />
                    <Lorem paragraphs={3} />
                    <Lorem paragraphs={3} />
                    <Lorem paragraphs={3} />
                    <Lorem paragraphs={3} />
                    <Lorem paragraphs={3} />
                    <Lorem paragraphs={3} />
                </TextContainer>
            </Page>
        </div>
    );
}
