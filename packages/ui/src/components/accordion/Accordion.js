import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';
import { a11yClickableElement } from '../../utils/a11y';

const ACCORDION_CLASS = `${UI_PREFIX}__accordion`;
const ACCORDION_TITLE_CLASS = `${UI_PREFIX}__accordion__title`;
const ACCORDION_TITLE_OPEN_CLASS = `${UI_PREFIX}__accordion__title--open`;
const ACCORDION_TITLE_CLOSED_CLASS = `${UI_PREFIX}__accordion__title--closed`;
const ACCORDION_CONTENT_CLASS = `${UI_PREFIX}__accordion__content`;
const ACCORDION_CONTENT_OPEN_CLASS = `${UI_PREFIX}__accordion__content--open`;
const ACCORDION_CONTENT_CLOSED_CLASS = `${UI_PREFIX}__accordion__content--closed`;

export function Accordion({
    title,
    children,
    className = '',
    titleProps,
    contentProps,
    initialStatus = 'closed',
    maxHeight,
    ...rest
}) {
    const [isOpen, setIsOpen] = useState(initialStatus === 'open');
    const accordionClassName = `${ACCORDION_CLASS} ${className}`;

    const { className: titlePropsClassName = '', onClick: titleOnClick, ...restTitleProps } =
        titleProps || {};
    const titleStatusClass = isOpen ? ACCORDION_TITLE_OPEN_CLASS : ACCORDION_TITLE_CLOSED_CLASS;
    const titleClassName = `${ACCORDION_TITLE_CLASS} ${titlePropsClassName} ${titleStatusClass}`;

    const {
        className: contentPropsClassName = '',
        style: contentPropsStyle = {},
        ...restContentProps
    } = contentProps || {};
    const contentStatusClass = isOpen
        ? ACCORDION_CONTENT_OPEN_CLASS
        : ACCORDION_CONTENT_CLOSED_CLASS;
    const contentClassName = `${ACCORDION_CONTENT_CLASS} ${contentPropsClassName} ${contentStatusClass}`;
    const contentStyle = {
        ...contentPropsStyle,
        ...(maxHeight && { maxHeight: isOpen ? maxHeight : undefined }),
    };

    const onTitleClick = () => {
        titleOnClick && titleOnClick();
        setIsOpen(!isOpen);
    };

    return (
        <div className={accordionClassName} {...rest}>
            <div
                className={titleClassName}
                {...a11yClickableElement({ onClick: onTitleClick })}
                {...restTitleProps}
            >
                {title}
            </div>
            <div className={contentClassName} style={contentStyle} {...restContentProps}>
                {children}
            </div>
        </div>
    );
}

Accordion.propTypes = {
    children: propTypesChildren,
    className: PropTypes.string,
    /** Title of the accordion */
    title: propTypesChildren.isRequired,
    /** Props passed to the title  */
    titleProps: PropTypes.object,
    /** Props passed to the content container */
    contentProps: PropTypes.object,
    /** Set the initial status of the accordion */
    initialStatus: PropTypes.oneOf(['open', 'closed']),
    /** Specify the `maxHeight`. By default CSS adds `600px`. */
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
