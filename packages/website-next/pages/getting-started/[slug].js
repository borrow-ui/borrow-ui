import path from 'path';

import React from 'react';
import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { MDXProvider } from '@mdx-js/react';

import * as borrowUi from '@borrow-ui/ui';

import { PageNavigator } from '../../components/common/PageNavigator';

import { generateGetStaticPaths, generateGetStaticProps } from '../../core/mdx/mdx';
import { providerComponents } from '../../core/mdx/providerComponents';

const SOURCE_PATH = path.join(process.cwd(), 'content/getting-started');
const { Title } = borrowUi;

const mdxComponents = {
    ...borrowUi,
};

const Content = ({ code, metadata }) => {
    const title = `Getting Started - ${metadata.title}`;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
            </Head>
            <MDXProvider components={providerComponents}>
                <>
                    <div className="website__text">
                        <Title className="color-primary">{metadata.title}</Title>
                        <MDXRemote {...code} components={mdxComponents} />
                    </div>
                    {(metadata.back || metadata.next) && (
                        <PageNavigator back={metadata.back} next={metadata.next} />
                    )}
                </>
            </MDXProvider>
        </>
    );
};

export const getStaticProps = generateGetStaticProps(SOURCE_PATH);

export const getStaticPaths = generateGetStaticPaths(SOURCE_PATH);

export default Content;
