import React, { useState, createContext, useContext, HTMLProps } from 'react';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import {
    AccordionGroupProps,
    AccordionProps,
    IAccordionGroupState,
    AccordionContextType,
} from './Accordion.types';

const ACCORDION_CLASS = `${UI_PREFIX}__accordion`;
const ACCORDION_TITLE_CLASS = `${UI_PREFIX}__accordion__title`;
const ACCORDION_TITLE_OPEN_CLASS = `${UI_PREFIX}__accordion__title--open`;
const ACCORDION_TITLE_CLOSED_CLASS = `${UI_PREFIX}__accordion__title--closed`;
const ACCORDION_CONTENT_CLASS = `${UI_PREFIX}__accordion__content`;
const ACCORDION_CONTENT_OPEN_CLASS = `${UI_PREFIX}__accordion__content--open`;
const ACCORDION_CONTENT_CLOSED_CLASS = `${UI_PREFIX}__accordion__content--closed`;

export const AccordionContext = createContext<AccordionContextType>([null, null]);

export function AccordionGroup({ initialOpenTitle, children }: AccordionGroupProps): JSX.Element {
    const [contextValue, setContextValue] = useState<IAccordionGroupState>({
        open: initialOpenTitle,
    });
    return (
        <AccordionContext.Provider value={[contextValue, setContextValue]}>
            {children}
        </AccordionContext.Provider>
    );
}

export const Accordion = ({
    title,
    children,
    className = '',
    titleProps,
    contentProps,
    initialOpen = false,
    maxHeight,
    ...rest
}: AccordionProps): JSX.Element => {
    const context = useContext(AccordionContext);
    const [isOpen, setIsOpen] = useState(initialOpen);

    const usingContext = context[0] !== null;

    const accordionIsOpen = usingContext
        ? // @ts-ignore , context is not null
          context[0].open === title
        : isOpen;

    const accordionClassName = `${ACCORDION_CLASS} ${className}`;

    const {
        className: titlePropsClassName = '',
        onClick: titleOnClick,
        ...restTitleProps
    }: HTMLProps<HTMLDivElement> = titleProps || {};
    const titleStatusClass = accordionIsOpen
        ? ACCORDION_TITLE_OPEN_CLASS
        : ACCORDION_TITLE_CLOSED_CLASS;
    const titleClassName =
        `${ACCORDION_TITLE_CLASS} ${titlePropsClassName} ${titleStatusClass}`.trim();

    const {
        className: contentPropsClassName = '',
        style: contentPropsStyle = {},
        ...restContentProps
    }: HTMLProps<HTMLDivElement> = contentProps || {};
    const contentStatusClass = accordionIsOpen
        ? ACCORDION_CONTENT_OPEN_CLASS
        : ACCORDION_CONTENT_CLOSED_CLASS;
    const contentClassName =
        `${ACCORDION_CONTENT_CLASS} ${contentPropsClassName} ${contentStatusClass}`.trim();
    const contentStyle = {
        ...contentPropsStyle,
        ...(maxHeight ? { maxHeight: accordionIsOpen ? maxHeight : undefined } : {}),
    };

    const onTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        titleOnClick && titleOnClick(e);
        if (!usingContext) setIsOpen(!isOpen);
        if (usingContext)
            //@ts-ignore , context is not null
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
};
