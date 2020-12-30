import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';

import { UI_PREFIX } from '../../config';
import { a11yClickableElement } from '../../utils/a11y';
import { propTypesChildren } from '../../utils/types';

// import './reference-overlay.scss';

const PLACEMENT_SE = ['', '-start', '-end'];
export const PLACEMENTS = ['auto', 'top', 'bottom', 'left', 'right'].reduce(
    (all, placement) =>
        all.concat(PLACEMENT_SE.map((placement_se) => `${placement}${placement_se}`)),
    []
);

const REFERENCE_OVERLAY_CLASS = `${UI_PREFIX}__reference-overlay`;
const REFERENCE_OVERLAY_VISIBLE_CLASS = `${UI_PREFIX}__reference-overlay--visible`;
const REFERENCE_OVERLAY_TRIGGER_CLASS = `${UI_PREFIX}__reference-overlay__trigger`;
const REFERENCE_OVERLAY_ARROW_CLASS = `${UI_PREFIX}__reference-overlay__arrow`;
const REFERENCE_OVERLAY_ARROW_VISIBLE_CLASS = `${UI_PREFIX}__reference-overlay__arrow--visible`;

export function ReferenceOverlay({
    overlayContent,
    children,
    placement = 'top',
    triggerMode = 'hover',
    clickPersist = false,
    triggerProps = {},
    overlayProps = {},
    overlayArrowProps = {},
    popperProps = {},
}) {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseOver = () => setIsVisible(true);
    const handleMouseOut = () => setIsVisible(false);

    useEffect(() => {
        if (!referenceElement || triggerMode !== 'hover') return;

        referenceElement.addEventListener('mouseover', handleMouseOver);
        referenceElement.addEventListener('mouseout', handleMouseOut);

        return () => {
            referenceElement.removeEventListener('mouseover', handleMouseOver);
            referenceElement.removeEventListener('mouseout', handleMouseOut);
        };
    }, [referenceElement, triggerMode]);

    useEffect(() => {
        if (!referenceElement || triggerMode !== 'click') return;

        const closeTooltip = (e) => {
            isVisible && !clickPersist && setIsVisible(false);
        };
        typeof document !== undefined && document.addEventListener('click', closeTooltip);

        return () => {
            typeof document !== undefined && document.removeEventListener('click', closeTooltip);
        };
    });

    const { popperModifiers = [], ...restPopperProps } = popperProps;
    const arrowOverrideModifier = popperModifiers.filter((mod) => mod.name === 'arrow');
    const arrowOverrideModifierOptions =
        arrowOverrideModifier.length === 1 && arrowOverrideModifier.options
            ? arrowOverrideModifier.options
            : {};
    const arrowModifier = {
        name: 'arrow',
        options: { element: arrowElement, ...arrowOverrideModifierOptions },
    };

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [arrowModifier, ...popperModifiers.filter((mod) => mod.name !== 'arrow')],
        ...restPopperProps,
    });

    const {
        className: propsTriggerClass = '',
        propsTriggerOnClick,
        ...restTriggerProps
    } = triggerProps;
    const {
        className: propsOverlayClass = '',
        style: propsOverlayStyle = {},
        ...restOverlayProps
    } = overlayProps;
    const {
        className: propsOverlayArrowClass = '',
        style: propsOverlayArrowStyle = {},
        ...restOverlayArrowProps
    } = overlayArrowProps;

    const referenceOverlayTriggerClass = `${REFERENCE_OVERLAY_TRIGGER_CLASS} ${propsTriggerClass}`.trim();

    const referenceOverlayVisibleClass = isVisible ? REFERENCE_OVERLAY_VISIBLE_CLASS : '';
    const referenceOverlayClass = `${REFERENCE_OVERLAY_CLASS} ${referenceOverlayVisibleClass} ${propsOverlayClass}`.trim();

    const overlayStyle = { ...styles.popper, ...propsOverlayStyle };

    const referenceOverlayArrowVisibleClass = isVisible
        ? REFERENCE_OVERLAY_ARROW_VISIBLE_CLASS
        : '';
    const referenceOverlayArrowClass = `${REFERENCE_OVERLAY_ARROW_CLASS} ${referenceOverlayArrowVisibleClass} ${propsOverlayArrowClass}`.trim();

    const overlayArrowStyle = { ...styles.arrow, ...propsOverlayArrowStyle };

    const clickable = triggerMode === 'click' || propsTriggerOnClick;
    const triggerOnClick = () => {
        triggerMode === 'click' && setIsVisible((v) => !v);
        propsTriggerOnClick && propsTriggerOnClick();
    };

    return (
        <>
            <div
                ref={setReferenceElement}
                className={referenceOverlayTriggerClass}
                {...(clickable ? a11yClickableElement({ onClick: triggerOnClick }) : {})}
                {...restTriggerProps}
            >
                {children}
                <div
                    ref={setPopperElement}
                    className={referenceOverlayClass}
                    style={overlayStyle}
                    {...attributes.popper}
                    {...restOverlayProps}
                >
                    {overlayContent}
                    <div
                        ref={setArrowElement}
                        className={referenceOverlayArrowClass}
                        style={overlayArrowStyle}
                        {...restOverlayArrowProps}
                    />
                </div>
            </div>
        </>
    );
}

ReferenceOverlay.propTypes = {
    /** Content of the overlay */
    overlayContent: propTypesChildren,
    /** Trigger content */
    children: propTypesChildren,
    /** Overlay placement.
     * See [popper documentation](https://popper.js.org/docs/v2/constructors/#options). */
    placement: PropTypes.oneOf(PLACEMENTS),
    /** Which event will make the tooltip visible */
    triggerMode: PropTypes.oneOf(['hover', 'click']),
    /** If the `triggerMode` is `click`, make the tooltip persist
     * if a click is done outside of Trigger itself
     * (so the tooltip is hidden only when clicking the trigger) */
    clickPersist: PropTypes.bool,
    /** Props passed to the trigger container */
    triggerProps: PropTypes.shape({
        className: PropTypes.string,
        style: PropTypes.object,
    }),
    /** Props passed to the overlay container */
    overlayProps: PropTypes.shape({
        className: PropTypes.string,
        style: PropTypes.object,
    }),
    /** Props passed to the overlay arrow container */
    overlayArrowProps: PropTypes.shape({
        className: PropTypes.string,
        style: PropTypes.object,
    }),
    /** Props forwarded to popper hook.
     * See [documentation](https://popper.js.org/react-popper/v2/hook/). */
    popperProps: PropTypes.object,
};
