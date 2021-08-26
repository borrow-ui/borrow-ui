import Link from 'next/link';
import { setConfig } from '@borrow-ui/ui';

import '../layout/thirdParty';

import '../styles/project-ui.scss';
import '../styles/project-ui-website.scss';
import '../styles/components-common.scss';

import { Layout } from '../layout/Layout';

setConfig('getLinkComponent', () => Link);

function MyApp({ Component, pageProps }) {
    return <Layout Component={Component} pageProps={pageProps} />;
}

export default MyApp;
