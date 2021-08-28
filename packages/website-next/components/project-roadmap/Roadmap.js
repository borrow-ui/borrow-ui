import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Icon, IconControl, Link } from '@borrow-ui/ui';

import styles from './roadmap.module.scss';

function cx(alwaysApply, classes) {
    return alwaysApply
        .concat(Object.keys(classes).filter((oneClass) => classes[oneClass]))
        .join(' ');
}

export function Roadmap({ items }) {
    const [collapsed, setCollapsed] = useState(initialCollapsed(items));

    return (
        <div className={styles['roadmap']}>
            {items.map((item, index) => {
                const itemClass = cx([styles['roadmap__item']], {
                    [styles['roadmap__item__done']]: item.done,
                    [styles['roadmap__item__collapsed']]: collapsed[index],
                });
                return (
                    <div className={itemClass} key={index}>
                        <div className={styles['roadmap__item__header']}>
                            <div className={styles['roadmap__item__title']}>
                                <RoadmapDoneIcon done={item.done} />
                                {item.title}
                                {item.issue && (
                                    <Link
                                        tag="a"
                                        href={`https://github.com/borrow-ui/borrow-ui/issues/${item.issue}`}
                                        className={styles['roadmap__item__issue']}
                                    >
                                        #{item.issue}
                                    </Link>
                                )}
                            </div>
                            <div className={styles['roadmap__item__controls']}>
                                {item.milestone && (
                                    <div className={styles['roadmap__item__milestone']}>
                                        <Link
                                            tag="a"
                                            href={`https://github.com/borrow-ui/borrow-ui/milestone/${item.milestone[0]}`}
                                        >
                                            {item.milestone[1]}
                                        </Link>
                                    </div>
                                )}
                                {collapsed[index] ? (
                                    <IconControl
                                        name="keyboard_arrow_down"
                                        size="smaller"
                                        onClick={() =>
                                            setCollapsed({ ...collapsed, [index]: false })
                                        }
                                    />
                                ) : (
                                    <IconControl
                                        name="keyboard_arrow_up"
                                        size="smaller"
                                        onClick={() =>
                                            setCollapsed({ ...collapsed, [index]: true })
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles['roadmap__item__description']}>
                            {item.description}
                        </div>
                        {item.children.length > 0 && (
                            <div className={styles['roadmap__item__children']}>
                                {item.children.map((child, childIndex) => {
                                    const childDone = item.done || child.done;
                                    const childClass = cx([styles['roadmap__item__child']], {
                                        [styles['roadmap__item__child__done']]: childDone,
                                    });
                                    return (
                                        <div className={childClass} key={childIndex}>
                                            <RoadmapDoneIcon done={childDone} />
                                            {child.title}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

Roadmap.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.node.isRequired,
            description: PropTypes.node,
            issue: PropTypes.number,
            milestone: PropTypes.array,
            done: PropTypes.bool,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    done: PropTypes.bool,
                })
            ),
        })
    ),
};

function initialCollapsed(items) {
    const collapsedItems = items.reduce((collapsed, item, index) => {
        if (item.done) collapsed[index] = true;
        return collapsed;
    }, {});

    return collapsedItems;
}

function RoadmapDoneIcon({ done }) {
    return (
        <div className={styles['roadmap__done-icon']}>
            {done && <Icon name="check_box" size="small" className="color-positive" />}
            {!done && <Icon name="check_box_outline_blank" size="small" />}
        </div>
    );
}
