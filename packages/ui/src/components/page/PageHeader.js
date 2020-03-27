import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

// import 'style/components/page/page_header.scss';

const PAGE_HEADER_CONTAINER_CLASS = `${UI_PREFIX}__page__header`;
const PAGE_HEADER_CONTAINER_WITH_SHADOW_CLASS = `${UI_PREFIX}__page__header--with-shadow`;
const PAGE_HEADER_TITLE_CLASS = `${UI_PREFIX}__page__header__title`;
const PAGE_HEADER_HEADER_CONTAINER_CLASS = `${UI_PREFIX}__page__header__header-container`;
const PAGE_HEADER_CONTROLS_CONTAINER_CLASS = `${UI_PREFIX}__page__header__controls-container`;

export function PageHeader({ children, controls, scrollRef, titleComponent, className = '' }) {
    const [showShadow, setShowShadow] = useState(false);

    useEffect(() => {
        if (scrollRef) {
            const node = scrollRef.current;
            const scrollHandler = () => {
                setShowShadow(node.scrollTop !== 0);
            };
            node.addEventListener('scroll', scrollHandler);

            return () => {
                node.removeEventListener('scroll', scrollHandler);
            };
        }
    }, [scrollRef]);

    const shadowClass = showShadow ? PAGE_HEADER_CONTAINER_WITH_SHADOW_CLASS : '';
    const headerClass = `${PAGE_HEADER_CONTAINER_CLASS} ${shadowClass} ${className}`;

    const TitleComponent = titleComponent || (typeof children === 'string' ? 'h2' : 'div');

    return (
        <div className={headerClass}>
            <div className={PAGE_HEADER_HEADER_CONTAINER_CLASS}>
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
    titleComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.number]),
};
