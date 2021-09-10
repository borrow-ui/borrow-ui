import React from 'react';
import Head from 'next/head';

import { Link, Title } from '@borrow-ui/ui';

import { Roadmap } from '../../components/project-roadmap/Roadmap';

export default function ProjectRoadmap() {
    return (
        <>
            <Head>
                <title>Roadmap</title>
                <meta property="og:title" content="Roadmap" key="title" />
            </Head>
            <div>
                <div className="website__text">
                    <Title className="color-primary">Roadmap</Title>
                </div>
                <div className="website__text m-b-20">
                    <div>
                        borrow-ui is currently under development. There are few features that are
                        already scheduled and other that will be added!
                    </div>
                    <div>
                        You can find more information in the{' '}
                        <Link href="https://github.com/borrow-ui/borrow-ui/milestones">
                            milestones section
                        </Link>{' '}
                        of the{' '}
                        <Link href="https://github.com/borrow-ui/borrow-ui/issues">issues</Link>{' '}
                        page in the HitHub repository.
                    </div>
                </div>
                <div className="website__text m-b-20">
                    <Roadmap
                        items={[
                            {
                                title: 'Basic UI package',
                                description: 'Create the backbone project with rollup and sass',
                                done: true,
                                children: [
                                    { title: 'configure rollup to look over the project folders' },
                                    {
                                        title: 'configure sass to compile the SCSS and generate a minified version',
                                    },
                                ],
                            },
                            {
                                title: 'Storybook documentation',
                                description: 'Create documentation package with Storybook',
                                done: true,
                                children: [
                                    {
                                        title: 'configure Storybook to work with package in monorepo',
                                    },
                                    {
                                        title: 'use addon-docs to generate components documentation',
                                    },
                                ],
                            },
                            {
                                title: 'Presentation Website with Next',
                                description:
                                    'Update the old website and create a new project based on Next.js',
                                done: true,
                                milestone: [3, '0.3'],
                                children: [
                                    {
                                        title: 'initialize a package with Next.js and make it work with borrow-ui',
                                    },
                                    {
                                        title: 'publish the website',
                                    },
                                ],
                            },
                            {
                                title: 'Dashboard Example',
                                description: 'Create a Dashboard backbone using borrow-ui',
                                issue: 4,
                                milestone: [3, '0.3'],
                                done: true,
                                children: [
                                    {
                                        title: 'include borrow-ui in the CRA app',
                                    },
                                    {
                                        title: 'improve form components accessibility',
                                    },
                                    {
                                        title: 'add forwardRef to form input components',
                                    },
                                ],
                            },
                            {
                                title: 'Dark mode',
                                description:
                                    'Identify and parametrize properties that are needed to create a dark mode style',
                                issue: 63,
                                milestone: [4, '0.4'],
                                children: [
                                    {
                                        title: 'determine the possible strategies to create variable names',
                                    },
                                    {
                                        title: 'implement for each component a dark mode',
                                    },
                                    {
                                        title: 'make it generic as "themes"',
                                    },
                                ],
                            },
                            {
                                title: 'Node script to rename the project',
                                description: 'Create a small node script to rename the project',
                                issue: 5,
                                milestone: [4, '0.4'],
                                children: [
                                    {
                                        title: 'accept a new name as input and rename all occurrencies and folders',
                                    },
                                ],
                            },
                            {
                                title: 'Convert to Typescript',
                                description: 'Convert the ui package to Typescript',
                                issue: 59,
                                milestone: [5, '1.0'],
                                children: [
                                    {
                                        title: 'convert each component and tests to Typescript',
                                    },
                                ],
                            },
                            {
                                title: 'Tutorials',
                                description:
                                    'Add and publish a tutorial section explaining how this project has been organized, started and how the main components have been written',
                                children: [
                                    {
                                        title: 'add a Tutorial section',
                                    },
                                    {
                                        title: 'publish the first Tutorial',
                                    },
                                    {
                                        title: 'add Disqus to the articles',
                                    },
                                    {
                                        title: 'add a Video to the "Getting Started" section',
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
