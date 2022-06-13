import path from 'path';

import React from 'react';
import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { MDXProvider } from '@mdx-js/react';

import * as uiLibrary from '@borrow-ui/ui';

import { Terminal } from '../../components/common/Terminal';

import { generateGetStaticPaths, generateGetStaticProps } from '../../core/mdx/mdx';
import { providerComponents } from '../../core/mdx/providerComponents';

import style from './blog.module.scss';

const SOURCE_PATH = path.join(process.cwd(), 'content/blog');
const { Title } = uiLibrary;

const mdxComponents = {
    ...uiLibrary,
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
                        <div className={style['blog-article__header']}>
                            <div className="m-r-10">
                                <span className={style['blog-article__header__label']}>
                                    Author:
                                </span>{' '}
                                {metadata.author}
                            </div>
                            <div className="m-r-10">
                                <span className={style['blog-article__header__label']}>
                                    Post date:
                                </span>{' '}
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
