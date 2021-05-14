import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';

import { UI_PREFIX } from '../../config';
import { propTypesChildren, propTypesRef } from '../../utils/types';

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
    className = '',
    placement = 'top',
    triggerMode = 'hover',
    clickPersist = false,
    triggerProps = {},
    triggerTag: TriggerTag = 'div',
    overlayProps = {},
    overlayArrowProps = {},
    popperProps = {},
    portalRef,
}) {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const { popperModifiers = [], ...restPopperProps } = popperProps;
    const arrowOverrideModifier = popperModifiers.filter((mod) => mod.name === 'arrow');
    const arrowOverrideModifierOptions =
        arrowOverrideModifier.length === 1 && arrowOverrideModifier[0].options
            ? arrowOverrideModifier[0].options
            : {};
    const arrowModifier = {
        name: 'arrow',
        options: { element: arrowElement, ...arrowOverrideModifierOptions },
    };

    useEffect(() => {
        if (!referenceElement || triggerMode !== 'click') return;

        const closeOverlay = (e) => {
            isVisible && !clickPersist && setIsVisible(false);
        };
        document.addEventListener('click', closeOverlay);

        return () => {
            document.removeEventListener('click', closeOverlay);
        };
    });

    const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [arrowModifier, ...popperModifiers.filter((mod) => mod.name !== 'arrow')],
        ...restPopperProps,
    });

    useTriggerHover(referenceElement, update, setIsVisible, triggerMode);

    const { onClick: propsTriggerOnClick, ...restTriggerProps } = triggerProps;

    const referenceOverlayTriggerClass = `${REFERENCE_OVERLAY_TRIGGER_CLASS} ${className}`.trim();

    const triggerOnClick = () => {
        update();
        triggerMode === 'click' && setIsVisible((v) => !v);
        propsTriggerOnClick && propsTriggerOnClick();
    };

    const overlayContentAllProps = {
        portalRef,
        setPopperElement,
        attributes,
        overlayContent,
        overlayProps,
        overlayArrowProps,
        setArrowElement,
        triggerMode,
        isVisible,
        setIsVisible,
        styles,
        update,
    };

    return (
        <TriggerTag
            ref={setReferenceElement}
            className={referenceOverlayTriggerClass}
            onClick={triggerOnClick}
            {...restTriggerProps}
        >
            {children}
            <ReferenceOverlayContent {...overlayContentAllProps} />
        </TriggerTag>
    );
}

ReferenceOverlay.propTypes = {
    /** Content of the overlay */
    overlayContent: propTypesChildren,
    /** Trigger content */
    children: propTypesChildren,
    className: PropTypes.string,
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
    /** Tag to be used as trigger/wrapper (i.e. for thead or cells).
     * Defaults to 'div'.
     */
    triggerTag: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
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
    portalRef: propTypesRef,
};

function ReferenceOverlayContent({
    portalRef,
    setPopperElement,
    attributes,
    overlayContent,
    overlayProps,
    overlayArrowProps,
    setArrowElement,
    triggerMode,
    isVisible,
    setIsVisible,
    styles,
    update,
}) {
    const {
        className: propsOverlayClass = '',
        style: propsOverlayStyle = {},
        ...restOverlayProps
    } = overlayProps;
    const overlayStyle = { ...styles.popper, ...propsOverlayStyle };
    const {
        className: propsOverlayArrowClass = '',
        style: propsOverlayArrowStyle = {},
        ...restOverlayArrowProps
    } = overlayArrowProps;

    const referenceOverlayVisibleClass = isVisible ? REFERENCE_OVERLAY_VISIBLE_CLASS : '';
    const referenceOverlayClass = `${REFERENCE_OVERLAY_CLASS} ${referenceOverlayVisibleClass} ${propsOverlayClass}`.trim();

    const referenceOverlayArrowVisibleClass = isVisible
        ? REFERENCE_OVERLAY_ARROW_VISIBLE_CLASS
        : '';
    const referenceOverlayArrowClass = `${REFERENCE_OVERLAY_ARROW_CLASS} ${referenceOverlayArrowVisibleClass} ${propsOverlayArrowClass}`.trim();

    const overlayArrowStyle = { ...styles.arrow, ...propsOverlayArrowStyle };

    const overlay = (
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
    );

    useTriggerHover(portalRef ? portalRef.current : null, update, setIsVisible, triggerMode);

    if (portalRef) {
        if (portalRef.current) {
            return ReactDOM.createPortal(overlay, portalRef.current);
        }
    } else {
        return overlay;
    }

    return null;
}

ReferenceOverlayContent.propTypes = {
    portalRef: propTypesRef,
    setPopperElement: PropTypes.func.isRequired,
    attributes: PropTypes.object.isRequired,
    overlayContent: propTypesChildren,
    overlayProps: PropTypes.shape({
        className: PropTypes.string,
        style: PropTypes.object,
    }),
    overlayArrowProps: PropTypes.shape({
        className: PropTypes.string,
        style: PropTypes.object,
    }),
    setArrowElement: PropTypes.func.isRequired,
    triggerMode: PropTypes.oneOf(['hover', 'click']),
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func.isRequired,
    styles: PropTypes.object,
    update: PropTypes.func,
};

function useTriggerHover(referenceElement, update, setIsVisible, triggerMode) {
    useEffect(() => {
        if (!referenceElement || triggerMode !== 'hover' || !update) return;

        const handleMouseOver = () => {
            update();
            setIsVisible(true);
        };
        const handleMouseOut = function () {
            setIsVisible(false);
        };
        referenceElement.addEventListener('mouseover', handleMouseOver);
        referenceElement.addEventListener('mouseout', handleMouseOut);

        return () => {
            referenceElement.removeEventListener('mouseover', handleMouseOver);
            referenceElement.removeEventListener('mouseout', handleMouseOut);
        };
    }, [referenceElement, setIsVisible, triggerMode, update]);
}
