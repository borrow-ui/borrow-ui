import React from 'react';

import { UI_PREFIX } from '../../config';
import { PageBodyProps } from './Page.types';

const PAGE_BODY_CLASS = `${UI_PREFIX}__page__body`;
const PAGE_BODY_WITH_HEADER_CLASS = `${UI_PREFIX}__page__body--with-page-header`;
const PAGE_BODY_READABLE_CONTENT_CLASS = `${UI_PREFIX}__page__body--readable-content`;

export const PageBody = ({
    children,
    withPageHeader,
    className = '',
    readableContent = false,
    pageBodyRef,
    ...rest
}: PageBodyProps): JSX.Element => {
    const withPageHeaderClass = withPageHeader ? PAGE_BODY_WITH_HEADER_CLASS : '';
    const readableContentClass = readableContent ? PAGE_BODY_READABLE_CONTENT_CLASS : '';
    const propsClasses = `${withPageHeaderClass} ${readableContentClass}`.trim();
    const bodyClass = `${PAGE_BODY_CLASS} ${propsClasses} ${className}`.trim();

    return (
        <div className={bodyClass} ref={pageBodyRef} {...rest}>
            {children}
        </div>
    );
};
