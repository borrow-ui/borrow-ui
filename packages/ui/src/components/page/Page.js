import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

import { PageHeader } from './PageHeader';
import { PageBody } from './PageBody';

// import 'style/components/page/page.scss';

const PAGE_CLASS = `${UI_PREFIX}__page`;
const PAGE_INFINITE_CLASS = `${UI_PREFIX}__page--infinite`;

export function Page({ className = '', infinite, title, usePageBody = true, pageHeaderProps, pageBodyProps, children, ...rest }) {
    const bodyRef = useRef(null);

    const pageClass = `${PAGE_CLASS} ${infinite ? PAGE_INFINITE_CLASS : ''} ${className}`;

    const headerProps = { ...(pageHeaderProps || {}) };
    const bodyProps = {
        withPageHeader: pageHeaderProps !== undefined,
        ...pageBodyProps,
    };

    return (
        <div className={pageClass} {...rest}>
            {title && (
                <PageHeader scrollRef={bodyRef} {...headerProps}>
                    {title}
                </PageHeader>
            )}
            {usePageBody && (
                <PageBody pageBodyRef={bodyRef} {...bodyProps}>
                    {children}
                </PageBody>
            )}
            {!usePageBody && children}
        </div>
    );
}

Page.propTypes = {
    className: PropTypes.string,
    title: PropTypes.node,
    infinite: PropTypes.bool,
    usePageBody: PropTypes.bool,
    pageHeaderProps: PropTypes.object,
    pageBodyProps: PropTypes.object,
    children: propTypesChildren,
};
