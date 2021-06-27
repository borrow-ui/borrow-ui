import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';
import { useLocationHash } from '../../hooks/useLocationHash';

const TITLE_CLASS = `${UI_PREFIX}__title`;
const TITLE_ANCHOR_CLASS = `${UI_PREFIX}__title__anchor`;
const TITLE_ANCHOR_ACTIVE_CLASS = `${UI_PREFIX}__title__anchor--active`;

export function Title({
    anchor,
    anchorClassName = '',
    tag: Tag = 'h1',
    children,
    className = '',
    ...rest
}) {
    const locationHash = useLocationHash();
    const titleClassName = `${TITLE_CLASS} ${className}`;

    const anchorActiveClass = anchor === locationHash && anchor ? TITLE_ANCHOR_ACTIVE_CLASS : '';
    const anchorClass = `${TITLE_ANCHOR_CLASS} ${anchorClassName} ${anchorActiveClass}`;
    const content = anchor ? (
        <a className={anchorClass} name={anchor} href={`#${anchor}`}>
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
}

Title.propTypes = {
    anchor: PropTypes.string,
    anchorClassName: PropTypes.string,
    tag: propTypesChildren,
    className: PropTypes.string,
    children: propTypesChildren,
};
