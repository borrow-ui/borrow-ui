import React from 'react';

import {
    Card,
    Block,
    Page,
    Subtitle,
    Text,
    Title,
    Row,
    Col,
    Icon,
    Button,
    Monospace,
} from '@borrow-ui/ui/lib';

import { SyntaxHighlight } from 'components/utils/SyntaxHighlight';
import logo from 'static/borrow-ui-color-192.png';
import './home.scss';

export function Home() {
    return (
        <div style={{ display: 'flex' }}>
            <Page infinite={true}>
                <div className="home__container">
                    <Row>
                        <Col colClassName="col-sm-10">
                            <div className="home__title__container">
                                <img src={logo} className="home__logo" alt="borrow-ui logo" />
                                <h1 className="home__title">Borrow UI</h1>
                            </div>
                        </Col>
                        <Col colClassName="col-sm-2" className="home__github-container">
                            <a
                                href="https://github.com/borrow-ui/borrow-ui"
                                className="color-neutral"
                            >
                                <Icon size="bigger" family="fab" name="fa-github" />
                            </a>
                        </Col>
                    </Row>
                    <Text size="big">
                        A collection of React components built with simplicity in mind
                    </Text>
                    <Subtitle>borrow-ui helps to bootstrap your Admin/Dashboard SPAs</Subtitle>
                    <Text className="color-accent">
                        View the project on GitHub and fork to start your component library!
                    </Text>
                </div>
                <Block outstanding={true}>
                    <Row>
                        <Col colClassName="col-xs-12 col-sm-12 col-md-6">
                            <Title tag="h2" className="m-t-0 m-r-10 color-primary">
                                1 - Get the code
                            </Title>
                            <div>
                                <Text>Create your own React Component Library in minutes!</Text>
                                <Text>
                                    Download the repository from the GitHub page or directly from
                                    your shell
                                </Text>
                                <Block contentCentered={true}>
                                    <Button
                                        modifiers={['shadowed']}
                                        mean="primary"
                                        tag="a"
                                        href="https://github.com/borrow-ui/borrow-ui/archive/master.zip"
                                    >
                                        Download
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
                <Block>
                    <Row>
                        <Col colClassName="col-sm-12 col-md-6">
                            <Title tag="h2" className="m-t-0 m-r-10 color-primary">
                                2 - Rename the project
                            </Title>
                            <div style={{ display: 'inline-block' }}>
                                <Text>
                                    With your own favourite code editor, rename all occurrences of{' '}
                                    <Monospace>borrow-ui</Monospace> to your preferred name
                                </Text>
                            </div>
                        </Col>
                        <Col colClassName="col-sm-12 col-md-6">
                            <Card
                                icon={<Title className="color-primary">?</Title>}
                                elementsProps={{ sideProps: { className: 'color-accent-bg' }}}
                                title="Why renaming?"
                                description={
                                    <Text>
                                        Creating a script to rename the occurencies would require
                                        libraries to be installed and used once, wasting time and
                                        space.
                                        <br />
                                        By using your favourite editor is one simple and fast
                                        command!
                                    </Text>
                                }
                            />
                        </Col>
                    </Row>
                </Block>
            </Page>
        </div>
    );
}

let installCode = `
# or directly from command line
curl -LJO https://github.com/borrow-ui/borrow-ui/archive/master.zip

`;
