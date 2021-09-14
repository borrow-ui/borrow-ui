import path from 'path';

import React from 'react';
import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { MDXProvider } from '@mdx-js/react';

import * as borrowUi from '@borrow-ui/ui';

import { Terminal } from '../../components/common/Terminal';

import { generateGetStaticPaths, generateGetStaticProps } from '../../core/mdx/mdx';
import { providerComponents } from '../../core/mdx/providerComponents';

const SOURCE_PATH = path.join(process.cwd(), 'content/blog');
const { Title } = borrowUi;

const mdxComponents = {
    ...borrowUi,
    Terminal,
};

const Content = ({ code, metadata }) => {
    const title = `Blog`;
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
                        <div className="flex-start-center m-t-10 m-b-20 p-15 color-neutral-white-bg">
                            <div className="m-r-10">
                                <span className="color-neutral-light">Author:</span>{' '}
                                {metadata.author}
                            </div>
                            <div className="m-r-10">
                                <span className="color-neutral-light">Post date:</span>{' '}
                                {metadata.postDate}
                            </div>
                        </div>
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
