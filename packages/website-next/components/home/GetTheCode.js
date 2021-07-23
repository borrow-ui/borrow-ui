import React from 'react';
import PropTypes from 'prop-types';

import { Block, Link, Title, Text, SyntaxHighlight } from '@borrow-ui/ui';

import styles from './home.module.scss';

export function GetTheCode({ isSmallScreen }) {
    return (
        <Block outstanding={!isSmallScreen}>
            <Title tag="h2" className="m-t-0 m-r-10 color-primary">
                Get the code
            </Title>
            <div className={styles['home__row']}>
                <div className={styles['home__column']}>
                    <div>
                        <Text>Author your own React Component Library in minutes!</Text>
                        <Text>
                            Download the repository from the{' '}
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                tag="a"
                                href="https://github.com/borrow-ui/borrow-ui"
                            >
                                GitHub page
                            </Link>
                        </Text>
                    </div>
                </div>
                <div className={styles['home__column']}>
                    <div style={{ display: 'flex', overflow: 'auto' }}>
                        <SyntaxHighlight code={installCode} language="bash" />
                    </div>
                </div>
            </div>
        </Block>
    );
}

GetTheCode.propTypes = {
    isSmallScreen: PropTypes.bool,
};

let installCode = `# or directly from command line
curl -LJO https://github.com/borrow-ui/borrow-ui/archive/master.zip`;
