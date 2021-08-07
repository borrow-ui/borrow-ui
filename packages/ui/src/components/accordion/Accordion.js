import React, { useState, createContext, useContext } from 'react';
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

export const AccordionContext = createContext([null, null]);

export function AccordionGroup({ initialOpenTitle, children }) {
    const contextValue = useState({ open: initialOpenTitle });
    return <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>;
}

AccordionGroup.propTypes = {
    /** Title of the accordion to be initially open. */
    initialOpenTitle: PropTypes.string,
    children: propTypesChildren,
};

export function Accordion({
    title,
    children,
    className = '',
    titleProps,
    contentProps,
    initialOpen = false,
    maxHeight,
    ...rest
}) {
    const context = useContext(AccordionContext);
    const [isOpen, setIsOpen] = useState(initialOpen);

    const usingContext = context[0] !== null;

    const accordionIsOpen = usingContext ? context[0].open === title : isOpen;

    const accordionClassName = `${ACCORDION_CLASS} ${className}`;

    const { className: titlePropsClassName = '', onClick: titleOnClick, ...restTitleProps } =
        titleProps || {};
    const titleStatusClass = accordionIsOpen
        ? ACCORDION_TITLE_OPEN_CLASS
        : ACCORDION_TITLE_CLOSED_CLASS;
    const titleClassName = `${ACCORDION_TITLE_CLASS} ${titlePropsClassName} ${titleStatusClass}`.trim();

    const {
        className: contentPropsClassName = '',
        style: contentPropsStyle = {},
        ...restContentProps
    } = contentProps || {};
    const contentStatusClass = accordionIsOpen
        ? ACCORDION_CONTENT_OPEN_CLASS
        : ACCORDION_CONTENT_CLOSED_CLASS;
    const contentClassName = `${ACCORDION_CONTENT_CLASS} ${contentPropsClassName} ${contentStatusClass}`.trim();
    const contentStyle = {
        ...contentPropsStyle,
        ...(maxHeight && { maxHeight: accordionIsOpen ? maxHeight : undefined }),
    };

    const onTitleClick = () => {
        titleOnClick && titleOnClick();
        if (!usingContext) setIsOpen(!isOpen);
        if (usingContext)
            context[1]({ ...context[0], open: context[0].open === title ? null : title });
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
    /** Set the initial open status of the accordion */
    initialOpen: PropTypes.bool,
    /** Specify the `maxHeight`. By default CSS adds `600px`. */
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
