import React, { useState, useEffect } from 'react';

import { config, UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { Responsive } from '../responsive/Responsive';
import { ReferenceOverlay } from '../reference-overlay/ReferenceOverlay';
import { IconControl } from '../icon/IconControl';
import { PageHeaderProps, PageHeaderResponsiveControlsProps } from './Page.types';

const PAGE_HEADER_CONTAINER_CLASS = `${UI_PREFIX}__page__header`;
const PAGE_HEADER_CONTAINER_TRACKER_IS_VISIBLE = `${UI_PREFIX}__page__header--tracker-is-visible`;
const PAGE_HEADER_CONTAINER_TRACKER_IS_NOT_VISIBLE = `${UI_PREFIX}__page__header--tracker-is-not-visible`;
const PAGE_HEADER_CONTAINER_WITH_SHADOW_CLASS = `${UI_PREFIX}__page__header--with-shadow`;
const PAGE_HEADER_TITLE_CLASS = `${UI_PREFIX}__page__header__title`;
const PAGE_HEADER_READABLE_CONTENT_CLASS = `${UI_PREFIX}__page__header--readable-content`;
const PAGE_HEADER_HEADER_CONTAINER_CLASS = `${UI_PREFIX}__page__header__header-container`;
const PAGE_HEADER_CONTROLS_CONTAINER_CLASS = `${UI_PREFIX}__page__header__controls-container`;
const PAGE_HEADER_CONTROLS_CONTAINER_OVERLAY_CLASS = `${UI_PREFIX}__page__header__controls-container--overlay`;

export const PageHeader = ({
    children,
    controls,
    scrollRef,
    titleTag,
    headerVisibleFollowRef,
    headerVisibleFollowOffset = 0,
    readableContent = false,
    responsiveControls = true,
    className = '',
    ...rest
}: PageHeaderProps): JSX.Element => {
    const [showShadow, setShowShadow] = useState(false);
    const [trackerIsVisible, setTrackerIsVisible] = useState(!headerVisibleFollowRef);

    useEffect(() => {
        if (scrollRef) {
            const node = scrollRef.current;

            if (!node) return;

            const scrollHandler = () => {
                setShowShadow(node.scrollTop !== 0);
                if (headerVisibleFollowRef && headerVisibleFollowRef.current) {
                    const c = headerVisibleFollowRef.current;
                    const y = c.getBoundingClientRect().y + c.getBoundingClientRect().height;
                    setTrackerIsVisible(trackerIsVisible ? y > 0 : y > headerVisibleFollowOffset);
                }
            };
            node.addEventListener('scroll', scrollHandler);

            return () => {
                node.removeEventListener('scroll', scrollHandler);
            };
        }
    }, [scrollRef, headerVisibleFollowRef, headerVisibleFollowOffset, trackerIsVisible]);

    const trackerClass = !headerVisibleFollowRef
        ? ''
        : trackerIsVisible
        ? PAGE_HEADER_CONTAINER_TRACKER_IS_VISIBLE
        : PAGE_HEADER_CONTAINER_TRACKER_IS_NOT_VISIBLE;
    const headerClassName = cx(PAGE_HEADER_CONTAINER_CLASS, trackerClass, className, {
        [PAGE_HEADER_READABLE_CONTENT_CLASS]: readableContent,
        [PAGE_HEADER_CONTAINER_WITH_SHADOW_CLASS]: showShadow,
    });

    const TitleTag = titleTag || 'h2';

    return (
        <div className={headerClassName} {...rest}>
            <div className={PAGE_HEADER_HEADER_CONTAINER_CLASS}>
                <TitleTag className={PAGE_HEADER_TITLE_CLASS}>{children}</TitleTag>
            </div>
            {controls && (
                <ResponsiveControls controls={controls} responsiveControls={responsiveControls} />
            )}
        </div>
    );
};
function ResponsiveControls({
    controls,
    responsiveControls,
}: PageHeaderResponsiveControlsProps): JSX.Element {
    if (!responsiveControls) return <>{controls}</>;

    return (
        <Responsive queries={{ small: { maxWidth: config.smallScreenMaxWidth } }}>
            {({ small }: { small: boolean }) => (
                <>
                    {small && (
                        <ReferenceOverlay
                            triggerMode="click"
                            placement="bottom-end"
                            overlayContent={
                                <div
                                    className={`${PAGE_HEADER_CONTROLS_CONTAINER_CLASS} ${PAGE_HEADER_CONTROLS_CONTAINER_OVERLAY_CLASS}`}
                                >
                                    {controls}
                                </div>
                            }
                        >
                            <IconControl name="more_horiz" role="button" />
                        </ReferenceOverlay>
                    )}
                    {!small && (
                        <div className={PAGE_HEADER_CONTROLS_CONTAINER_CLASS}>{controls}</div>
                    )}
                </>
            )}
        </Responsive>
    );
}
