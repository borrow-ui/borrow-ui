import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

// import 'style/components/card/card.scss';

const CARD_CLASS = `${UI_PREFIX}__card`;
const CARD_SHADOWED_CLASS = `${UI_PREFIX}__card--shadowed`;
const CARD_STANDING_HOVER_CLASS = `${UI_PREFIX}__card--standing-hover`;
const CARD_SIDE_CLASS = `${UI_PREFIX}__card__side`;
const CARD_SIDE_ICON_CONTAINER_CLASS = `${UI_PREFIX}__card__side__icon-container`;
const CARD_MAIN_CLASS = `${UI_PREFIX}__card__main`;
const CARD_BODY_CLASS = `${UI_PREFIX}__card__body`;
const CARD_BODY_TITLE_CLASS = `${UI_PREFIX}__card__body__title`;
const CARD_BODY_SUBTITLE_CLASS = `${UI_PREFIX}__card__body__subtitle`;
const CARD_BODY_DESCRIPTION_CLASS = `${UI_PREFIX}__card__body__description`;
const CARD_CONTROLS_CLASS = `${UI_PREFIX}__card__controls`;

export function Card({
    icon = '',
    title = '',
    subtitle = '',
    description = '',
    controls,
    elementsProps = {},
    shadowed = true,
    standingHover = false,
}) {
    const { className: cardClassName = '', ...cardProps } = elementsProps.cardProps || {};
    const { className: sideClassName = '', ...sideProps } = elementsProps.sideProps || {};
    const { className: iconContainerClassName = '', ...iconContainerProps } =
        elementsProps.iconContainerProps || {};
    const { className: mainClassName = '', ...mainProps } = elementsProps.mainProps || {};
    const { className: bodyClassName = '', ...bodyProps } = elementsProps.bodyProps || {};
    const { className: titleClassName = '', ...titleProps } = elementsProps.titleProps || {};
    const { className: subtitleClassName = '', ...subtitleProps } =
        elementsProps.subtitleProps || {};
    const { className: descriptionClassName = '', ...descriptionProps } =
        elementsProps.descriptionProps || {};
    const { className: controlsClassName = '', ...controlsProps } =
        elementsProps.controlsProps || {};

    const cardClass = `${CARD_CLASS} ${shadowed ? CARD_SHADOWED_CLASS : ''} ${
        standingHover ? CARD_STANDING_HOVER_CLASS : ''
    }`;

    return (
        <div className={`${cardClass} ${cardClassName}`} {...cardProps}>
            <div className={`${CARD_SIDE_CLASS} ${sideClassName}`} {...sideProps}>
                {icon && (
                    <div
                        className={`${CARD_SIDE_ICON_CONTAINER_CLASS} ${iconContainerClassName}`}
                        {...iconContainerProps}
                    >
                        {icon}
                    </div>
                )}
            </div>
            <div className={`${CARD_MAIN_CLASS} ${mainClassName}`} {...mainProps}>
                <div className={`${CARD_BODY_CLASS} ${bodyClassName}`} {...bodyProps}>
                    {title && (
                        <div
                            className={`${CARD_BODY_TITLE_CLASS} ${titleClassName}`}
                            {...titleProps}
                        >
                            {title}
                        </div>
                    )}
                    {subtitle && (
                        <div
                            className={`${CARD_BODY_SUBTITLE_CLASS} ${subtitleClassName}`}
                            {...subtitleProps}
                        >
                            {subtitle}
                        </div>
                    )}
                    {description && (
                        <div
                            className={`${CARD_BODY_DESCRIPTION_CLASS} ${descriptionClassName}`}
                            {...descriptionProps}
                        >
                            {description}
                        </div>
                    )}
                </div>
                {controls && (
                    <div
                        className={`${CARD_CONTROLS_CLASS} ${controlsClassName}`}
                        {...controlsProps}
                    >
                        {controls}
                    </div>
                )}
            </div>
        </div>
    );
}

Card.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    controls: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    elementsProps: PropTypes.shape({
        cardProps: PropTypes.object,
        sideProps: PropTypes.object,
        iconContainerProps: PropTypes.object,
        mainProps: PropTypes.object,
        bodyProps: PropTypes.object,
        titleProps: PropTypes.object,
        subtitleProps: PropTypes.object,
        descriptionProps: PropTypes.object,
        controlsProps: PropTypes.object,
    }),
    shadowed: PropTypes.bool,
    standingHover: PropTypes.bool,
};
