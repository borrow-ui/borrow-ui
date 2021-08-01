import { Page, Block, Link, Title, Text, Tile, Button, Icon, Responsive } from '@borrow-ui/ui';

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
                        <Link tag="a" href="https://borrow-ui.dev">
                            borrow-ui
                        </Link>
                        !
                    </Title>
                    <Text size="big">
                        Bootstrap your React Component Library with Lerna, Rollup and Storybook
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
                            mean="regular-reverse"
                        >
                            GitHub
                        </Button>
                    </div>
                </main>

                <div className={styles['home__cards-container']}>
                    <div className="website__text__columns">
                        <div className={styles['home__tiles-container']}>
                            <Tile
                                description="Small reusable components"
                                className={styles['home__tile']}
                            >
                                <Icon name="compress" size="huge" />
                            </Tile>
                            <Tile
                                description="Documented and tested"
                                className={styles['home__tile']}
                            >
                                <Icon name="format_align_left" size="huge" />
                            </Tile>
                            <Tile description="Easy to extend" className={styles['home__tile']}>
                                <Icon name="extension" size="huge" />
                            </Tile>
                            <Tile description="Dashboard oriented" className={styles['home__tile']}>
                                <Icon name="view_compact" size="huge" />
                            </Tile>
                        </div>

                        <div className={styles['home__tiles-container']}>
                            <Tile description="Rollup" className={styles['home__tile']}>
                                <Icon name="view_in_ar" size="huge" />
                            </Tile>
                            <Tile description="Storybook" className={styles['home__tile']}>
                                <Icon name="grid_view" size="huge" />
                            </Tile>
                            <Tile description="Lerna Monorepo" className={styles['home__tile']}>
                                <Icon name="list_alt" size="huge" />
                            </Tile>
                            <Tile description="BEM SCSS" className={styles['home__tile']}>
                                <Icon name="palette" size="huge" />
                            </Tile>
                        </div>
                    </div>
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
