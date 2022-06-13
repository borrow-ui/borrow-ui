import path from 'path';

import React from 'react';
import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { MDXProvider } from '@mdx-js/react';

import * as uiLibrary from '@borrow-ui/ui';

import { generateGetStaticPaths, generateGetStaticProps } from '../../core/mdx/mdx';
import { providerComponents } from '../../core/mdx/providerComponents';

const SOURCE_PATH = path.join(process.cwd(), 'content/project');

const { Title } = uiLibrary;

const Content = ({ code, metadata }) => {
    const title = `Project`;

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
                        <MDXRemote {...code} />
                    </div>
                </>
            </MDXProvider>
        </>
    );
};

export const getStaticProps = generateGetStaticProps(SOURCE_PATH);

export const getStaticPaths = generateGetStaticPaths(SOURCE_PATH);

export default Content;
