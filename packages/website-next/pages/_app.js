import '../layout/thirdParty';

import '../styles/project-ui.scss';

import { Layout } from '../layout/Layout';

function MyApp({ Component, pageProps }) {
    return <Layout Component={Component} pageProps={pageProps} />;
}

export default MyApp;
