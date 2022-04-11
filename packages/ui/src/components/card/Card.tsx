import React from 'react';

import { UI_PREFIX } from '../../config';
import { CardProps } from './Card.types';

const CARD_CLASS = `${UI_PREFIX}__card`;
const CARD_SHADOWED_CLASS = `${UI_PREFIX}__card--shadowed`;
const CARD_MARGIN_BETWEEN_CLASS = `${UI_PREFIX}__card--margin-between`;
const CARD_STANDING_HOVER_CLASS = `${UI_PREFIX}__card--standing-hover`;
const CARD_SIDE_CLASS = `${UI_PREFIX}__card__side`;
const CARD_SIDE_WITH_SIDE_CONTENT_CLASS = `${UI_PREFIX}__card__side--with-side-content`;
const CARD_SIDE_ICON_CONTAINER_CLASS = `${UI_PREFIX}__card__side__icon-container`;
const CARD_MAIN_CLASS = `${UI_PREFIX}__card__main`;
const CARD_MAIN_WITH_SIDE_CLASS = `${UI_PREFIX}__card__main--with-side`;
const CARD_MAIN_WITHOUT_SIDE_CLASS = `${UI_PREFIX}__card__main--without-side`;
const CARD_BODY_CLASS = `${UI_PREFIX}__card__body`;
const CARD_TITLE_CLASS = `${UI_PREFIX}__card__title`;
const CARD_SUBTITLE_CLASS = `${UI_PREFIX}__card__subtitle`;
const CARD_DESCRIPTION_CLASS = `${UI_PREFIX}__card__description`;
const CARD_DESCRIPTION_WITH_CONTROLS_CLASS = `${UI_PREFIX}__card__description--with-controls`;
const CARD_CONTROLS_CLASS = `${UI_PREFIX}__card__controls`;

export const Card = ({
    icon,
    sideContent,
    title,
    subtitle,
    description,
    className = '',
    controls,
    shadowed = true,
    marginBetween = false,
    standingHover = false,
    sideProps = {},
    iconContainerProps = {},
    mainProps = {},
    bodyProps = {},
    titleProps = {},
    subtitleProps = {},
    descriptionProps = {},
    controlsProps = {},
    ...rest
}: CardProps): JSX.Element => {
    const shadowedClass = shadowed ? CARD_SHADOWED_CLASS : '';
    const marginBetweenClass = marginBetween ? CARD_MARGIN_BETWEEN_CLASS : '';
    const standingHoverClass = standingHover ? CARD_STANDING_HOVER_CLASS : '';
    const propsClasses = `${shadowedClass} ${marginBetweenClass} ${standingHoverClass}`;
    const cardClass = `${CARD_CLASS} ${propsClasses} ${className}`;

    const { className: sidePropsClassName = '', ...restSideProps } = sideProps;
    const sideContentClass = sideContent ? CARD_SIDE_WITH_SIDE_CONTENT_CLASS : '';
    const sideClassName = `${CARD_SIDE_CLASS} ${sideContentClass} ${sidePropsClassName}`;

    const { className: iconContainerPropsClassName = '', ...restIconContainerProps } =
        iconContainerProps;
    const iconContainerClassName = `${CARD_SIDE_ICON_CONTAINER_CLASS} ${iconContainerPropsClassName}`;

    const { className: mainPropsClassName = '', ...restMainProps } = mainProps;
    const cardMainSideClassName =
        icon || sideContent ? CARD_MAIN_WITH_SIDE_CLASS : CARD_MAIN_WITHOUT_SIDE_CLASS;
    const mainClassName =
        `${CARD_MAIN_CLASS} ${cardMainSideClassName} ${mainPropsClassName}`.trim();

    const { className: bodyPropsClassName = '', ...restBodyProps } = bodyProps;
    const bodyClassName = `${CARD_BODY_CLASS} ${bodyPropsClassName}`.trim();

    const { className: titlePropsClassName = '', ...restTitleProps } = titleProps;
    const titleClassName = `${CARD_TITLE_CLASS} ${titlePropsClassName}`.trim();

    const { className: subtitlePropsClassName = '', ...restSubtitleProps } = subtitleProps;
    const subtitleClassName = `${CARD_SUBTITLE_CLASS} ${subtitlePropsClassName}`.trim();

    const { className: descriptionPropsClassName = '', ...restDescriptionProps } = descriptionProps;
    const descriptionWithControlsClassName = controls ? CARD_DESCRIPTION_WITH_CONTROLS_CLASS : '';
    const descriptionClassName =
        `${CARD_DESCRIPTION_CLASS} ${descriptionWithControlsClassName} ${descriptionPropsClassName}`.trim();

    const { className: controlsPropsClassName = '', ...restControlsProps } = controlsProps;
    const controlsClassName = `${CARD_CONTROLS_CLASS} ${controlsPropsClassName}`.trim();

    return (
        <div className={cardClass} {...rest}>
            {(icon || sideContent) && (
                <div className={sideClassName} {...restSideProps}>
                    {icon && (
                        <div className={iconContainerClassName} {...restIconContainerProps}>
                            {icon}
                        </div>
                    )}
                    {sideContent && sideContent}
                </div>
            )}
            <div className={mainClassName} {...restMainProps}>
                <div className={bodyClassName} {...restBodyProps}>
                    {title && (
                        <div className={titleClassName} {...restTitleProps}>
                            {title}
                        </div>
                    )}
                    {subtitle && (
                        <div className={subtitleClassName} {...restSubtitleProps}>
                            {subtitle}
                        </div>
                    )}
                    {description && (
                        <div className={descriptionClassName} {...restDescriptionProps}>
                            {description}
                        </div>
                    )}
                </div>
                {controls && (
                    <div className={controlsClassName} {...restControlsProps}>
                        {controls}
                    </div>
                )}
            </div>
        </div>
    );
};
