import React, { Fragment } from 'react';

import { UI_PREFIX, config } from '../../config';
import { cx } from '../../utils/classNames';
import { BreadcrumbProps, BreadcrumbsProps } from './Breadcrumbs.types';

const BREADCRUMBS_CLASS = `${UI_PREFIX}__breadcrumbs`;
const BREADCRUMBS_BREADCRUMB_CLASS = `${UI_PREFIX}__breadcrumbs__breadcrumb`;
const BREADCRUMBS_BREADCRUMB_CLICKABLE_CLASS = `${UI_PREFIX}__breadcrumbs__breadcrumb--clickable`;
const BREADCRUMBS_BREADCRUMB_LAST_CLASS = `${UI_PREFIX}__breadcrumbs__breadcrumb--last`;
const BREADCRUMBS_SEPARATOR_CLASS = `${UI_PREFIX}__breadcrumbs__separator`;

export const Breadcrumbs = ({
    breadcrumbs,
    className = '',
    children,
    ...rest
}: BreadcrumbsProps): JSX.Element => {
    const generatedBreadcrumbs = breadcrumbs ? generateBreadcrumbs(breadcrumbs) : null;
    const breadcrumbsClass = cx(BREADCRUMBS_CLASS, className);

    return (
        <div className={breadcrumbsClass} {...rest}>
            {generatedBreadcrumbs}
            {children}
        </div>
    );
};

const Breadcrumb = ({
    link,
    tag,
    onClick,
    isLast,
    className,
    children,
    ...rest
}: BreadcrumbProps): JSX.Element => {
    const Tag = tag ? tag : link ? config.getLinkComponent() : 'div';
    const breadcrumbClassName = cx(BREADCRUMBS_BREADCRUMB_CLASS, className, {
        [BREADCRUMBS_BREADCRUMB_CLICKABLE_CLASS]: link || onClick,
        [BREADCRUMBS_BREADCRUMB_LAST_CLASS]: isLast,
    });

    return (
        <Tag
            className={breadcrumbClassName}
            onClick={onClick}
            to={link}
            href={link}
            data-test-id="breadcrumb"
            {...rest}
        >
            {children}
        </Tag>
    );
};

function Separator() {
    return <div className={BREADCRUMBS_SEPARATOR_CLASS}>&raquo;</div>;
}

Breadcrumbs.Breadcrumb = Breadcrumb;
Breadcrumbs.Separator = Separator;

function generateBreadcrumbs(breadcrumbs: Array<BreadcrumbProps>) {
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
