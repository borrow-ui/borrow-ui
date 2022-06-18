import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
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
    const bodyClassName = cx(PAGE_BODY_CLASS, className, {
        [PAGE_BODY_WITH_HEADER_CLASS]: withPageHeader,
        [PAGE_BODY_READABLE_CONTENT_CLASS]: readableContent,
    });
    return (
        <div className={bodyClassName} ref={pageBodyRef} {...rest}>
            {children}
        </div>
    );
};
