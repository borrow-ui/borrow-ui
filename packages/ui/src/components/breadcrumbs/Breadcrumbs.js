import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX, config } from '../../config';
import { propTypesChildren } from '../../utils/types';

const BREADCRUMBS_CLASS = `${UI_PREFIX}__breadcrumbs`;
const BREADCRUMBS_BREADCRUMB_CLASS = `${UI_PREFIX}__breadcrumbs__breadcrumb`;
const BREADCRUMBS_BREADCRUMB_CLICKABLE_CLASS = `${UI_PREFIX}__breadcrumbs__breadcrumb--clickable`;
const BREADCRUMBS_BREADCRUMB_LAST_CLASS = `${UI_PREFIX}__breadcrumbs__breadcrumb--last`;
const BREADCRUMBS_SEPARATOR_CLASS = `${UI_PREFIX}__breadcrumbs__separator`;

export function Breadcrumbs({ breadcrumbs, className = '', children, ...rest }) {
    const generatedBreadcrumbs = breadcrumbs ? generateBreadcrumbs(breadcrumbs) : null;
    const breadcrumbsClass = `${BREADCRUMBS_CLASS} ${className}`.trim();

    return (
        <div className={breadcrumbsClass} {...rest}>
            {generatedBreadcrumbs}
            {children}
        </div>
    );
}

Breadcrumbs.propTypes = {
    /** A list of objects. Each object must have a `label` and optionally
     * a link. `className` will be added to the generated one.
     */
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string,
            label: propTypesChildren.isRequired,
            className: PropTypes.string,
        })
    ),
    /** The container className. */
    className: PropTypes.string,
    children: propTypesChildren,
};

Breadcrumbs.Breadcrumb = Breadcrumb;
Breadcrumbs.Separator = Separator;

function Breadcrumb({ link, tag, onClick, isLast, className, children, ...rest }) {
    const Tag = tag ? tag : link ? config.getLinkComponent() : 'div';
    const clickableClass = link || onClick ? BREADCRUMBS_BREADCRUMB_CLICKABLE_CLASS : '';
    const lastClass = isLast ? BREADCRUMBS_BREADCRUMB_LAST_CLASS : '';
    const breadcrumbClass = `${BREADCRUMBS_BREADCRUMB_CLASS} ${clickableClass} ${lastClass} ${className}`.trim();

    return (
        <Tag
            className={breadcrumbClass}
            onClick={onClick}
            to={link}
            data-test-id="breadcrumb"
            {...rest}
        >
            {children}
        </Tag>
    );
}

Breadcrumb.propTypes = {
    link: PropTypes.string,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func,
    isLast: PropTypes.bool,
    className: PropTypes.string,
    children: propTypesChildren,
};

function Separator() {
    return <div className={BREADCRUMBS_SEPARATOR_CLASS}>&raquo;</div>;
}

function generateBreadcrumbs(breadcrumbs) {
    return breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
            <Fragment key={`breadcrumb-${index}`}>
                {index > 0 && <Separator />}
                <Breadcrumb
                    link={breadcrumb.link}
                    isLast={isLast}
                    className={breadcrumb.className}
                    tag={breadcrumb.tag}
                    onClick={breadcrumb.onClick}
                >
                    {breadcrumb.label}
                </Breadcrumb>
            </Fragment>
        );
    });
}
