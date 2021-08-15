import React from 'react';

import { Title, Icon, IconControl, Link } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function IconDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="icons" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Icons
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Icon, IconControl } from '@borrow-ui/ui';"
                docs="?path=/docs/components-icon--default-story"
            />
            <div>
                Icons can be loaded from different families, have different sizes and a special{' '}
                {'"control"'} style:
            </div>
            <div>
                <div className="flex-spacebetween-center flex--wrap">
                    <div className="w-300">
                        <p>
                            <Link
                                tag="a"
                                href="https://jossef.github.io/material-design-icons-iconfont/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Material Design Icons DX
                            </Link>
                        </p>
                        <div>
                            <Icon name="all_inclusive" className="m-r-10" />
                            <Icon name="add_circle" className="m-r-10 color-positive" />
                            <Icon name="block" className="m-r-10 color-warning" />
                            <Icon name="remove_circle" className="m-r-10 color-negative" />
                            <Icon name="lunch_dining" className="m-r-10 color-primary" />
                            <Icon name="beach_access" className="m-r-10 color-accent" />
                        </div>
                    </div>
                    <div className="w-300">
                        <p>
                            <Link
                                tag="a"
                                href="https://fontawesome.com/v5.15/icons"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Fontawesome
                            </Link>
                        </p>
                        <div>
                            <Icon name="fa-archway" family="fas" className="m-r-10" />
                            <Icon name="fa-sun" family="fas" className="m-r-10 color-positive" />
                            <Icon
                                name="fa-cloud-sun"
                                family="fas"
                                className="m-r-10 color-warning"
                            />
                            <Icon
                                name="fa-cloud-showers-heavy"
                                family="fas"
                                className="m-r-10 color-negative"
                            />
                            <Icon
                                name="fa-pizza-slice"
                                family="fas"
                                className="m-r-10 color-primary"
                            />
                            <Icon name="fa-tram" family="fas" className="m-r-10 color-accent" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-spacebetween-center flex--wrap">
                <div className="w-300">
                    <p>Sizes</p>
                    <Icon name="all_inclusive" className="m-r-10" size="huge" />
                    <Icon name="add_circle" className="m-r-10 color-positive" size="big" />
                    <Icon name="block" className="m-r-10 color-warning" />
                    <Icon name="remove_circle" className="m-r-10 color-negative" size="small" />
                    <Icon name="lunch_dining" className="m-r-10 color-primary" size="smaller" />
                </div>
                <div className="w-300">
                    <p>Control Icons</p>
                    <IconControl name="add" className="cursor-pointer m-r-5" />
                    <IconControl name="remove" className="cursor-pointer m-r-5" />
                    <IconControl name="fullscreen" className="cursor-pointer m-r-5" />
                    <IconControl name="format_list_numbered" className="cursor-pointer m-r-5" />
                    <IconControl name="format_list_bulleted" className="cursor-pointer m-r-5" />
                </div>
            </div>
        </div>
    );
}
