import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren, propTypesRef } from '../../utils/types';

import { PageHeader } from './PageHeader';
import { PageBody } from './PageBody';

const PAGE_CLASS = `${UI_PREFIX}__page`;
const PAGE_CONTINUOUS_SCROLL_CLASS = `${UI_PREFIX}__page--continuous-scroll`;

export function Page({
    className = '',
    continuousScroll = false,
    title,
    headerVisibleFollowRef,
    headerVisibleFollowOffset,
    usePageBody = true,
    readableContent = false,
    pageHeaderProps,
    pageBodyProps,
    children,
    ...rest
}) {
    const bodyRef = useRef(null);
    const continuousScrollClass = continuousScroll ? PAGE_CONTINUOUS_SCROLL_CLASS : '';
    const pageClass = `${PAGE_CLASS} ${continuousScrollClass} ${className}`;

    const bodyProps = {
        withPageHeader: Boolean(pageHeaderProps !== undefined || title),
        readableContent,
        ...pageBodyProps,
    };

    return (
        <div className={pageClass} {...rest}>
            {title && (
                <PageHeader
                    scrollRef={bodyRef}
                    readableContent={readableContent}
                    headerVisibleFollowRef={headerVisibleFollowRef}
                    headerVisibleFollowOffset={headerVisibleFollowOffset}
                    {...pageHeaderProps}
                >
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
    /** Title passed to `PageHeader` as children */
    title: propTypesChildren,
    /** Makes the title part of the body scroll (so it will not stick on the top when the page body is scrolled) */
    continuousScroll: PropTypes.bool,
    /** Use `PageBody` component. If `false`, will append children after `PageHeader` (if title is passed) */
    usePageBody: PropTypes.bool,
    /** Makes the content centered in big screens (> 1300px) */
    readableContent: PropTypes.bool,
    /** Class name passed to the container */
    className: PropTypes.string,
    /** Additional props passed to `PageHeader` */
    pageHeaderProps: PropTypes.object,
    /** Additional props passed to `PageBody` */
    pageBodyProps: PropTypes.object,
    /** See `PageHeader` props */
    headerVisibleFollowRef: propTypesRef,
    /** See `PageHeader` props */
    headerVisibleFollowOffset: PropTypes.number,
    children: propTypesChildren,
};
