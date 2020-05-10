import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

// import 'style/components/page/page_header.scss';

const PAGE_HEADER_CONTAINER_CLASS = `${UI_PREFIX}__page__header`;
const PAGE_HEADER_CONTAINER_TRACKER_IS_VISIBLE = `${UI_PREFIX}__page__header--tracker-is-visible`;
const PAGE_HEADER_CONTAINER_TRACKER_IS_NOT_VISIBLE = `${UI_PREFIX}__page__header--tracker-is-not-visible`;
const PAGE_HEADER_CONTAINER_WITH_SHADOW_CLASS = `${UI_PREFIX}__page__header--with-shadow`;
const PAGE_HEADER_TITLE_CLASS = `${UI_PREFIX}__page__header__title`;
const PAGE_HEADER_READABLE_CONTENT_CLASS = `${UI_PREFIX}__page__header__readable-content`;
const PAGE_HEADER_HEADER_CONTAINER_CLASS = `${UI_PREFIX}__page__header__header-container`;
const PAGE_HEADER_CONTROLS_CONTAINER_CLASS = `${UI_PREFIX}__page__header__controls-container`;

export function PageHeader({
    children,
    controls,
    scrollRef,
    titleComponent,
    titleVisibleFollowRef,
    readableContent = false,
    className = '',
}) {
    const [showShadow, setShowShadow] = useState(false);
    const [trackerIsVisible, setTrackerIsVisible] = useState(!titleVisibleFollowRef);

    useEffect(() => {
        if (scrollRef) {
            const node = scrollRef.current;
            const scrollHandler = () => {
                setShowShadow(node.scrollTop !== 0);
                if (titleVisibleFollowRef && titleVisibleFollowRef.current) {
                    const c = titleVisibleFollowRef.current;
                    const y = c.getBoundingClientRect().y + c.getBoundingClientRect().height;
                    setTrackerIsVisible(trackerIsVisible ? y > 0 : y > 250);
                }
            };
            node.addEventListener('scroll', scrollHandler);

            return () => {
                node.removeEventListener('scroll', scrollHandler);
            };
        }
    }, [scrollRef, titleVisibleFollowRef, trackerIsVisible]);

    const shadowClass = showShadow ? PAGE_HEADER_CONTAINER_WITH_SHADOW_CLASS : '';
    const trackerClass = !titleVisibleFollowRef
        ? ''
        : trackerIsVisible
        ? PAGE_HEADER_CONTAINER_TRACKER_IS_VISIBLE
        : PAGE_HEADER_CONTAINER_TRACKER_IS_NOT_VISIBLE;
    const readableContentClass = readableContent ? PAGE_HEADER_READABLE_CONTENT_CLASS : '';
    const headerClass = `${PAGE_HEADER_CONTAINER_CLASS} ${trackerClass} ${readableContentClass} ${shadowClass} ${className}`;

    const pageHeaderHeaderContainerClass = `${PAGE_HEADER_HEADER_CONTAINER_CLASS}`;
    const TitleComponent = titleComponent || (typeof children === 'string' ? 'h2' : 'div');

    return (
        <div className={headerClass}>
            <div className={pageHeaderHeaderContainerClass}>
                <TitleComponent className={PAGE_HEADER_TITLE_CLASS}>{children}</TitleComponent>
            </div>
            <div className={PAGE_HEADER_CONTROLS_CONTAINER_CLASS}>{controls && controls}</div>
        </div>
    );
}

PageHeader.propTypes = {
    controls: PropTypes.node,
    scrollRef: PropTypes.object,
    children: propTypesChildren.isRequired,
    className: PropTypes.string,
    readableContent: PropTypes.bool,
    titleVisibleFollowRef: PropTypes.object,
    titleComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.number]),
};
