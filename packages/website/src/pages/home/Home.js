import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Link, Page, Subtitle, Text, Row, Col, Icon, Responsive } from '@borrow-ui/ui/lib';

import { Roadmap } from './Roadmap';
import { ComponentExample } from './ComponentExample';
import { Rename } from './Rename';
import { StructureProject } from './StructureProject';
import { KeyPoints } from './KeyPoints';
import { GetTheCode } from './GetTheCode';

import logo from 'static/borrow-ui-color-192.png';
import './home.scss';

export function Home() {
    const [titleRef, setTitleRef] = useState(null);

    const titleControls = (
        <a href="https://github.com/borrow-ui/borrow-ui" className="color-neutral">
            <Icon family="fab" name="fa-github" />
        </a>
    );

    return (
        <div style={{ display: 'flex' }}>
            <Page
                readableContent={true}
                title="borrow-ui"
                pageHeaderProps={{ controls: titleControls }}
                titleVisibleFollowRef={titleRef}
            >
                <Responsive>
                    {matches => (
                        <HomeContent isSmallScreen={matches.small} setTitleRef={setTitleRef} />
                    )}
                </Responsive>
            </Page>
        </div>
    );
}

function HomeContent({ isSmallScreen, setTitleRef }) {
    const homeContainerRef = useRef(null);

    useEffect(() => {
        setTitleRef(homeContainerRef);
    }, [setTitleRef]);

    return (
        <Fragment>
            <div className="home__container" ref={homeContainerRef}>
                <Row>
                    <Col colClassName="col-sm-10">
                        <div className="home__title__container">
                            <img src={logo} className="home__logo" alt="borrow-ui logo" />
                            <h1 className="home__title">borrow-ui</h1>
                        </div>
                    </Col>
                    <Col colClassName="col-sm-2" className="home__github-container">
                        <a href="https://github.com/borrow-ui/borrow-ui" className="color-neutral">
                            <Icon size="bigger" family="fab" name="fa-github" />
                        </a>
                    </Col>
                </Row>
                <Text size="big">
                    A collection of React components built with simplicity in mind
                </Text>
                <Subtitle>
                    borrow-ui helps to bootstrap your React Admin/Dashboard SPAs with modern tools
                    like Webpack, Lerna and Yarn workspaces
                </Subtitle>
                <Text className="color-primary">
                    <Link href="https://github.com/borrow-ui/borrow-ui">View</Link> the project on
                    GitHub and fork to start your component library!
                </Text>
            </div>
            <KeyPoints />
            <GetTheCode isSmallScreen={isSmallScreen} />
            <StructureProject />
            <Rename />
            <ComponentExample isSmallScreen={isSmallScreen} />
            <Roadmap />
        </Fragment>
    );
}

HomeContent.propTypes = {
    isSmallScreen: PropTypes.bool,
    setTitleRef: PropTypes.func,
};
