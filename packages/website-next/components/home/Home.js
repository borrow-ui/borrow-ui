import { Page, Block, Link, Title, Text, Tile, Button, Icon, Responsive } from '@borrow-ui/ui';

import { Technologies } from './Technologies';
import { GetTheCode } from './GetTheCode';
import { StructureProject } from './StructureProject';
import { Rename } from './Rename';
import { ComponentExample } from './ComponentExample';

import styles from './home.module.scss';

export function Home() {
    return (
        <Page continuousScroll={true} pageBodyProps={{ className: styles['home__page'] }}>
            <Block padded={false}>
                <main className="website__text__columns">
                    <Title className={styles['home__main-title']}>
                        Welcome to{' '}
                        <Link
                            tag="a"
                            href="https://borrow-ui.dev"
                            className={styles['home__main-link']}
                        >
                            borrow-ui
                        </Link>
                        !
                    </Title>
                    <Text size="big">
                        Bootstrap your React Component Library with yarn 3, Rollup and Storybook
                    </Text>
                    <div className={styles['home__action-buttons']}>
                        <Button
                            className="m-l-0"
                            mean="primary"
                            tag="a"
                            href="https://github.com/borrow-ui/borrow-ui/archive/master.zip"
                            target="_blank"
                            size="huge"
                            icon="arrow_downward"
                            iconProps={{ size: 'big' }}
                        >
                            Download
                        </Button>
                        <Button
                            tag="a"
                            href="https://github.com/borrow-ui/borrow-ui/archive/master.zip"
                            target="_blank"
                            size="huge"
                            icon="fa-github"
                            iconProps={{ size: 'big', family: 'fab' }}
                            mean="neutral-reverse"
                        >
                            GitHub
                        </Button>
                    </div>
                </main>

                <div className="website__text__columns">
                    <Technologies />
                </div>
            </Block>

            <div className="website__text__columns">
                <Responsive>{(matches) => <GetTheCode isSmallScreen={matches.small} />}</Responsive>
            </div>
            <div className="website__text__columns">
                <StructureProject />
            </div>
            <div className="website__text__columns">
                <Rename />
            </div>
            <div className="website__text__columns">
                <Responsive>
                    {(matches) => <ComponentExample isSmallScreen={matches.small} />}
                </Responsive>
            </div>
        </Page>
    );
}
