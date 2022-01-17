import React from 'react';

import { UI_PREFIX } from '../../config';
import { useLocationHash } from '../../hooks/useLocationHash';

import { TitleProps } from './Title.types';

const TITLE_CLASS = `${UI_PREFIX}__title`;
const TITLE_ANCHOR_CLASS = `${UI_PREFIX}__title__anchor`;
const TITLE_ANCHOR_ACTIVE_CLASS = `${UI_PREFIX}__title__anchor--active`;

export const Title = ({
    anchor,
    anchorClassName = '',
    tag: Tag = 'h1',
    children,
    className = '',
    ...rest
}: TitleProps): JSX.Element => {
    const locationHash = useLocationHash();
    const titleClassName = `${TITLE_CLASS} ${className}`;

    const anchorActiveClass = anchor === locationHash && anchor ? TITLE_ANCHOR_ACTIVE_CLASS : '';
    const anchorClass = `${TITLE_ANCHOR_CLASS} ${anchorClassName} ${anchorActiveClass}`;
    const content = anchor ? (
        <a className={anchorClass} id={anchor} href={`#${anchor}`}>
            {children}
        </a>
    ) : (
        children
    );

    return (
        <Tag className={titleClassName} {...rest}>
            {content}
        </Tag>
    );
};
