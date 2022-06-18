import React from 'react';

import { UI_PREFIX, getConfig } from '../../config';
import { cx } from '../../utils/classNames';
import { LinkProps } from './Link.types';

const LINK_CLASS = `${UI_PREFIX}__link`;
const LINK_UNDERLINE_CLASS = `${UI_PREFIX}__link--underline`;
const LINK_NO_UNDERLINE_CLASS = `${UI_PREFIX}__link--no-underline`;

export const Link = ({
    tag,
    className = '',
    underline = true,
    children,
    ...rest
}: LinkProps): JSX.Element => {
    const underlineClass = underline ? LINK_UNDERLINE_CLASS : LINK_NO_UNDERLINE_CLASS;
    const linkClassName = cx(LINK_CLASS, underlineClass, className);

    // @ts-ignore , only getLinkComponent will be used here
    const Tag = tag || getConfig('getLinkComponent')();

    return (
        <Tag className={linkClassName} {...rest}>
            {children}
        </Tag>
    );
};
