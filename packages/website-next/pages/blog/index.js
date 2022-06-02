import path from 'path';

import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { MDXProvider } from '@mdx-js/react';
import dayjs from 'dayjs';

import * as borrowUi from '@borrow-ui/ui';

import { providerComponents } from '../../core/mdx/providerComponents';
import { getSingleContent, getAllSources } from '../../core/mdx/mdx';

import style from './blog.module.scss';

export const SOURCE_PATH = path.join(process.cwd(), 'content/blog');

const { Title, Card, Link, Icon } = borrowUi;

const mdxComponents = {
    ...borrowUi,
};

export default function Content({ code, metadata = {}, posts }) {
    const title = `Blog`;

    const publishedPosts = posts
        .filter((post) => post.metadata.isPublished)
        .sort((a, b) => (a.metadata.postDate > b.metadata.postDate ? -1 : 1));

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
            <div className="website__text" style={{ marginBottom: 30 }}>
                <Title>Posts</Title>
                <div className="flex flex--wrap">
                    {publishedPosts.map((post) => (
                        <Card
                            key={post.metadata.title}
                            className={`w-400 m-r-20 m-b-20 m-t-20 ${style['blog-card']}`}
                            icon={
                                <Icon
                                    name={post.metadata.iconName || 'article'}
                                    size="huge"
                                    className="color-teal-l2"
                                />
                            }
                            mainProps={{ className: style['blog-card__main'] }}
                            sideProps={{ className: style['blog-card__side'] }}
                            title={
                                <NextLink href={`/blog/${post.slug}`}>
                                    <Link tag="a">{post.metadata.title}</Link>
                                </NextLink>
                            }
                            description={post.metadata.description}
                            descriptionProps={{ className: style['blog-card__description'] }}
                            controls={
                                <>
                                    <span className="color-neutral-light">
                                        {dayjs(post.metadata.postDate).format('ddd, D MMM YYYY')}
                                    </span>
                                    <NextLink href={`/blog/${post.slug}`}>
                                        <Link tag="a">Read post</Link>
                                    </NextLink>
                                </>
                            }
                        />
                    ))}
                </div>
            </div>
            <div className={style['blog__order-container']}>
                The blog posts are sorted by date, so you shuold start reading from the second!
            </div>
            <div className="website__text" style={{ marginTop: 50, marginBottom: 50 }}>
                However, as you might already know, Next.js does not offer a {'"memory"'}{' '}
                functionality so your {'"most read"'} posts counter shuold be handled separately.
            </div>
        </>
    );
}

export async function getStaticProps({ params = {} }) {
    const content = await getSingleContent(SOURCE_PATH, 'index');
    const posts = await getAllSources([SOURCE_PATH]);

    return {
        props: { ...content, posts },
    };
}
