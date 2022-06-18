import React, { useRef } from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
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
    const pageClassName = cx(PAGE_CLASS, className, {
        [PAGE_CONTINUOUS_SCROLL_CLASS]: continuousScroll,
    });

    const bodyProps = {
        withPageHeader: Boolean(pageHeaderProps !== undefined || title),
        readableContent,
        ...pageBodyProps,
    };

    return (
        <div className={pageClassName} {...rest}>
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
