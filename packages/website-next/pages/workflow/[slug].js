import path from 'path';

import React from 'react';
import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { MDXProvider } from '@mdx-js/react';

import * as borrowUi from '@borrow-ui/ui';

import { Terminal } from '../../components/common/Terminal';

import { generateGetStaticPaths, generateGetStaticProps } from '../../core/mdx/mdx';
import { providerComponents } from '../../core/mdx/providerComponents';

const SOURCE_PATH = path.join(process.cwd(), 'content/workflow');
const { Title } = borrowUi;

const mdxComponents = {
    ...borrowUi,
    Terminal,
};

const Content = ({ code, metadata }) => {
    const title = `Workflow`;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
            </Head>
            <MDXProvider components={providerComponents}>
                <>
                    <div className="website__text" style={{ paddingBottom: 30 }}>
                        <Title className="color-primary">{metadata.title}</Title>
                        <MDXRemote {...code} components={mdxComponents} />
                    </div>
                </>
            </MDXProvider>
        </>
    );
};

export const getStaticProps = generateGetStaticProps(SOURCE_PATH);

export const getStaticPaths = generateGetStaticPaths(SOURCE_PATH);

export default Content;
