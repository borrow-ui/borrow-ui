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
                                <NextLink href="/">
                                    <a className="borrow-ui__link borrow-ui__link--underline">
                                        Back to home
                                    </a>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/blog">
                                    <a className="borrow-ui__link borrow-ui__link--underline">
                                        Blog example
                                    </a>
                                </NextLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <h3 className="footer__title">Project</h3>
                        <ul>
                            <li>
                                <Link href="https://github.com/borrow-ui/borrow-ui">
                                    View on GitHub
                                </Link>
                            </li>
                            <li>
                                <Link href="https://github.com/borrow-ui/borrow-ui/issues">
                                    Issues and Enhancements
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer__container footer__copyright">
                    <div className="m-r-10">Copyright © 2021 borrow-ui.</div>
                    <div className="m-r-10">
                        Created by
                        <Link href="https://github.com/vittoriozamboni" className="m-r-5 m-l-5">
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
