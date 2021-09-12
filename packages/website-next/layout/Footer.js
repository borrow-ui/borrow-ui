import NextLink from 'next/link';

import { Link } from '@borrow-ui/ui';
import React from 'react';

export function Footer() {
    return (
        <div className="website__footer">
            <div className="website__text">
                <div className="footer__container">
                    <div className="footer__column">
                        <h3 className="footer__title">borrow-ui</h3>
                        <ul>
                            <li>
                                <NextLink href="/getting-started/getting-started" passHref>
                                    <a className="borrow-ui__link borrow-ui__link--underline">
                                        Getting Started
                                    </a>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/components">
                                    <a className="borrow-ui__link borrow-ui__link--underline">
                                        Components Showcase
                                    </a>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/workflow">
                                    <a className="borrow-ui__link borrow-ui__link--underline">
                                        Workflow to follow
                                    </a>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/workflow">
                                    <a className="borrow-ui__link borrow-ui__link--underline">
                                        Roadmap of next developments
                                    </a>
                                </NextLink>
                            </li>
                            <li>
                                <Link tag="a" href="https://docs.borrow-ui.dev/">
                                    Storybook Documentation
                                </Link>
                            </li>
                            <li>
                                <Link tag="a" href="https://dashboard.borrow-ui.dev">
                                    Dashboard Demo
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <h3 className="footer__title">Project</h3>
                        <ul>
                            <li>
                                <Link tag="a" href="https://github.com/borrow-ui/borrow-ui">
                                    View on GitHub
                                </Link>
                            </li>
                            <li>
                                <Link tag="a" href="https://github.com/borrow-ui/borrow-ui/issues">
                                    Issues and Enhancements
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer__container footer__copyright">
                    <div className="m-r-10">Copyright © 2021 borrow-ui.</div>
                    <div className="m-r-10">
                        Createdy by
                        <Link
                            tag="a"
                            href="https://github.com/vittoriozamboni"
                            className="m-r-5 m-l-5"
                        >
                            Vittorio Zamboni
                        </Link>
                        as open source project.
                    </div>
                    <div>Feel free to contribute and use it!</div>
                </div>
            </div>
        </div>
    );
}
