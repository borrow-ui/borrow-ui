import Head from 'next/head';

import { Home } from '../components/home/Home';

export default function Main() {
    return (
        <>
            <Head>
                <title>borrow-ui</title>
                <meta name="description" content="A component library starter kit" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Home />
        </>
    );
}
