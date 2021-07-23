import { Link, NavbarMenu } from '@borrow-ui/ui';
import React from 'react';

export function Footer() {
    return (
        <div className="website__footer">
            <div className="footer__container website__text">
                <div className="footer__column">
                    <h3 className="footer__title">borrow-ui</h3>
                    <div>
                        <Link tag="a" href="https://docs.borrow-ui.dev/">
                            Take a tour
                        </Link>
                    </div>
                    <div>
                        <Link tag="a" href="https://docs.borrow-ui.dev/">
                            Storybook Documentation
                        </Link>
                    </div>
                </div>
                <div className="footer__column">
                    <h3 className="footer__title">Project</h3>
                    <div>
                        <Link tag="a" href="https://github.com/borrow-ui/borrow-ui">
                            View on GitHub
                        </Link>
                    </div>
                    <div>
                        <Link tag="a" href="https://github.com/borrow-ui/borrow-ui/issues">
                            Issues and Enhancements
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer__container website__text footer__copyright">
                Createdy by
                <Link tag="a" href="https://github.com/vittoriozamboni" className="m-r-5 m-l-5">
                    Vittorio Zamboni
                </Link>
                as open source project. Feel free to contribute and use it!
            </div>
        </div>
    );
}
