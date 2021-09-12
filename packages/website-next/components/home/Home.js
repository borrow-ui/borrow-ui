import { Page, Block, Link, Title, Text, Button, Responsive, Monospace } from '@borrow-ui/ui';

import { Technologies } from './Technologies';
import { GetTheCode } from './GetTheCode';
import { StructureProject } from './StructureProject';
import { Rename } from './Rename';
import { ComponentExample } from './ComponentExample';
import { DashboardExample } from './DashboardExample';

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
                            href="https://github.com/borrow-ui/borrow-ui"
                            target="_blank"
                            size="huge"
                            icon="fa-github"
                            iconProps={{ size: 'big', family: 'fab' }}
                            mean="neutral-reverse"
                        >
                            GitHub
                        </Button>
                    </div>
                    <Text style={{ marginTop: 20 }}>
                        Or try{' '}
                        <Link tag="a" href="https://docs.borrow-ui.dev">
                            the components
                        </Link>{' '}
                        with <Monospace>yarn add @borrow-ui/ui</Monospace>
                    </Text>
                </main>

                <div className="website__text__columns">
                    <Technologies />
                </div>
            </Block>

            <div className="website__text__columns" style={{ marginTop: 50 }}>
                <Responsive>{(matches) => <GetTheCode isSmallScreen={matches.small} />}</Responsive>
            </div>
            <div className="website__text__columns" style={{ marginTop: 50 }}>
                <StructureProject />
            </div>
            <div className="website__text__columns" style={{ marginTop: 50 }}>
                <Rename />
            </div>
            <div className="website__text__columns" style={{ marginTop: 50 }}>
                <Responsive>
                    {(matches) => <ComponentExample isSmallScreen={matches.small} />}
                </Responsive>
            </div>
            <div className="website__text__columns" style={{ marginTop: 50 }}>
                <DashboardExample />
            </div>
        </Page>
    );
}
