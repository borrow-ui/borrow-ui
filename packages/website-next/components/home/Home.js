import NextLink from 'next/link';
import { Page, Block, Link, Title, Text, Monospace } from '@borrow-ui/ui';

import { Features } from './Features';
import { PageExample } from './PageExample';
import { GetStarted } from './GetStarted';

import styles from './home.module.scss';

export function Home() {
    return (
        <Page continuousScroll={true} pageBodyProps={{ className: styles['home__page'] }}>
            <Block padded={false}>
                <main className="website__text__columns">
                    <Title className={styles['home__main-title']}>
                        Welcome to{' '}
                        <Link href="https://borrow-ui.dev" className={styles['home__main-link']}>
                            borrow-ui
                        </Link>{' '}
                        demo!
                    </Title>
                    <Text size="big">You can read the subtitle here, made with Text component</Text>
                    <Text style={{ marginTop: 20 }}>
                        This is a demo site made with <Monospace>@borrow-ui/ui</Monospace>
                    </Text>
                </main>

                <div className="website__text__columns">
                    <Features />
                </div>
            </Block>

            <div className={styles['home__page-example__container']}>
                <div className="website__text__columns">
                    <PageExample />
                </div>
            </div>

            <div className="website__text__columns">
                <GetStarted />
            </div>

            <div className={styles['home__guide__container']}>
                <div className="website__text__columns">
                    Read the quick guide in the{' '}
                    <NextLink href="/blog">
                        <Link>Blog section</Link>
                    </NextLink>
                </div>
            </div>
        </Page>
    );
}
