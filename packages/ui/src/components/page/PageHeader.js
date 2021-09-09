import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { config, UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

import { Responsive } from '../responsive/Responsive';
import { ReferenceOverlay } from '../reference-overlay/ReferenceOverlay';
import { IconControl } from '../icon/IconControl';

const PAGE_HEADER_CONTAINER_CLASS = `${UI_PREFIX}__page__header`;
const PAGE_HEADER_CONTAINER_TRACKER_IS_VISIBLE = `${UI_PREFIX}__page__header--tracker-is-visible`;
const PAGE_HEADER_CONTAINER_TRACKER_IS_NOT_VISIBLE = `${UI_PREFIX}__page__header--tracker-is-not-visible`;
const PAGE_HEADER_CONTAINER_WITH_SHADOW_CLASS = `${UI_PREFIX}__page__header--with-shadow`;
const PAGE_HEADER_TITLE_CLASS = `${UI_PREFIX}__page__header__title`;
const PAGE_HEADER_READABLE_CONTENT_CLASS = `${UI_PREFIX}__page__header--readable-content`;
const PAGE_HEADER_HEADER_CONTAINER_CLASS = `${UI_PREFIX}__page__header__header-container`;
const PAGE_HEADER_CONTROLS_CONTAINER_CLASS = `${UI_PREFIX}__page__header__controls-container`;
const PAGE_HEADER_CONTROLS_CONTAINER_OVERLAY_CLASS = `${UI_PREFIX}__page__header__controls-container--overlay`;

export function PageHeader({
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
}) {
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

    const shadowClass = showShadow ? PAGE_HEADER_CONTAINER_WITH_SHADOW_CLASS : '';
    const trackerClass = !headerVisibleFollowRef
        ? ''
        : trackerIsVisible
        ? PAGE_HEADER_CONTAINER_TRACKER_IS_VISIBLE
        : PAGE_HEADER_CONTAINER_TRACKER_IS_NOT_VISIBLE;
    const readableContentClass = readableContent ? PAGE_HEADER_READABLE_CONTENT_CLASS : '';
    const headerClass = `${PAGE_HEADER_CONTAINER_CLASS} ${trackerClass} ${readableContentClass} ${shadowClass} ${className}`;

    const pageHeaderHeaderContainerClass = `${PAGE_HEADER_HEADER_CONTAINER_CLASS}`;

    const TitleTag = titleTag || 'h2';

    return (
        <div className={headerClass} {...rest}>
            <div className={pageHeaderHeaderContainerClass}>
                <TitleTag className={PAGE_HEADER_TITLE_CLASS}>{children}</TitleTag>
            </div>
            {controls && (
                <ResponsiveControls controls={controls} responsiveControls={responsiveControls} />
            )}
        </div>
    );
}

PageHeader.propTypes = {
    /** Page controls: will be shown on the right of the header (useful for buttons or icons) */
    controls: propTypesChildren,
    /** React ref of the body element. It is used to determine if the body element is scrolled,
     * to apply a shadow to the `PageHeader` container */
    scrollRef: PropTypes.object,
    /** Center the content if the page is greater than 1300 px */
    readableContent: PropTypes.bool,
    /** React ref of a component. If passed, the `PageHeader` will be rendered only if the referenced component
     * is not visible. */
    headerVisibleFollowRef: PropTypes.object,
    /** Apply an offset to determine if the header should be visibile or not (higher the offset, higher the scroll offset) */
    headerVisibleFollowOffset: PropTypes.number,
    /** Tag used for the title */
    titleTag: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
    /** If true, controls are hidden on small screens and an icon is shown, which will trigger an overlay with controls */
    responsiveControls: PropTypes.bool,
    className: PropTypes.string,
    children: propTypesChildren.isRequired,
};

function ResponsiveControls({ controls, responsiveControls }) {
    if (!responsiveControls) return controls;

    return (
        <Responsive queries={{ small: { maxWidth: config.smallScreenMaxWidth } }}>
            {({ small }) => (
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

ResponsiveControls.propTypes = {
    controls: propTypesChildren,
    responsiveControls: PropTypes.bool,
};
