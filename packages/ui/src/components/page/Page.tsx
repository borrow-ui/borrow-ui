import React, { useRef } from 'react';

import { UI_PREFIX } from '../../config';

import { PageHeader } from './PageHeader';
import { PageBody } from './PageBody';
import { PageHeaderProps } from './Page.types';

const PAGE_CLASS = `${UI_PREFIX}__page`;
const PAGE_CONTINUOUS_SCROLL_CLASS = `${UI_PREFIX}__page--continuous-scroll`;

export const Page = ({
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
}: PageHeaderProps): JSX.Element => {
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
};
