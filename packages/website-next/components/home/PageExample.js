import { useRouter } from 'next/router';
import { Title, Text, Button, Row, Col, Link, Monospace, SyntaxHighlight } from '@borrow-ui/ui';

import styles from './home.module.scss';

export function PageExample() {
    const router = useRouter();
    const navigate = (e, href) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <div className={styles['home__page-example']}>
            <Title>Page Example</Title>
            <Row>
                <Col colClassName="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <Text>
                        Create website pages by writing MDX code instead of verbose HTML/JSX.
                    </Text>
                    <Text>
                        With <Link href="https://mdxjs.com/">MDX</Link> you can write Markdown files
                        and use JSX components: every compoment you add to your library will be
                        usable directly in the <Monospace>.mdx</Monospace> files.
                    </Text>
                    <Text>
                        If you need additional components for a specific section of the website, you
                        can include them together with the library components and make them
                        available as well.
                    </Text>
                    <Text>
                        The example shows how to setup a <Monospace>[slug].js</Monospace> file that
                        will source the content from the mdx files inside a
                        <Monospace>content/blog</Monospace> folder.
                    </Text>
                    <Text className="flex-center-center" style={{ margin: 60 }}>
                        <Button size="big" mean="secondary" onClick={(e) => navigate(e, '/blog')}>
                            See this in action here!
                        </Button>
                    </Text>
                    <Text>A simple page looks like this:</Text>
                    <SyntaxHighlight code={samplePage} language="mdx" />
                </Col>
                <Col colClassName="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                    <Text>
                        Prepare the <Monospace>[slug].js</Monospace> page like this:
                    </Text>
                    <SyntaxHighlight code={sampleSlug} language="jsx" />
                </Col>
            </Row>
        </div>
    );
}

let samplePage = `---
title: Code Example
---

Hello! Welcome to my first blog post, created with mdx and borrow-ui.

This is how you start the development server for this website:

<div className="flex-center-center">
    <Terminal
        className="m-b-20 w-400 m-r-20 m-l-20"
        title="Next.js website"
        code="yarn dev"
        language="bash"
    />
</div>
`;

let sampleSlug = `import path from 'path';
import React from 'react';
import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { MDXProvider } from '@mdx-js/react';

import * as uiLibrary from '@borrow-ui/ui';
import { Terminal } from '../../components/common/Terminal';

import {
    generateGetStaticPaths,
    generateGetStaticProps
} from '../../core/mdx/mdx';
import { providerComponents } from '../../core/mdx/providerComponents';

const SOURCE_PATH = path.join(process.cwd(), 'content/blog');

// Extends components available in the mdx
const mdxComponents = { ...uiLibrary, Terminal };
const { Title } = uiLibrary; // use components here as well

const Content = ({ code, metadata }) => {
    return <>
        <Head>
            <title>Blog</title>
            <meta property="og:title" content="Blog" key="title" />
        </Head>
        <MDXProvider components={providerComponents}>
            <Title className="color-primary">{metadata.title}</Title>
            <MDXRemote {...code} components={mdxComponents} />
        </MDXProvider>
    </>
};

export const getStaticProps = generateGetStaticProps(SOURCE_PATH);
export const getStaticPaths = generateGetStaticPaths(SOURCE_PATH);
export default Content;`;
