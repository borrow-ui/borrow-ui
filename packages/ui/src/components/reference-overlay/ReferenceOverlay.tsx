import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import {
    ReferenceOverlayContentProps,
    ReferenceOverlayProps,
    ReferenceOverlayTriggerModeType,
} from './ReferenceOverlay.types';

const REFERENCE_OVERLAY_CLASS = `${UI_PREFIX}__reference-overlay`;
const REFERENCE_OVERLAY_VISIBLE_CLASS = `${UI_PREFIX}__reference-overlay--visible`;
const REFERENCE_OVERLAY_TRIGGER_CLASS = `${UI_PREFIX}__reference-overlay__trigger`;
const REFERENCE_OVERLAY_ARROW_CLASS = `${UI_PREFIX}__reference-overlay__arrow`;
const REFERENCE_OVERLAY_ARROW_VISIBLE_CLASS = `${UI_PREFIX}__reference-overlay__arrow--visible`;

export const ReferenceOverlay = ({
    overlayContent,
    children,
    className = '',
    placement = 'top',
    triggerMode = 'hover',
    triggerProps = {},
    triggerTag: TriggerTag = 'div',
    overlayProps = {},
    overlayArrowProps = {},
    popperProps = {},
    portalRef,
}: ReferenceOverlayProps): JSX.Element => {
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const { popperModifiers = [], ...restPopperProps } = popperProps;
    const arrowOverrideModifier = popperModifiers.filter((mod: any) => mod.name === 'arrow');
    const arrowOverrideModifierOptions =
        arrowOverrideModifier.length === 1 && arrowOverrideModifier[0].options
            ? arrowOverrideModifier[0].options
            : {};
    const arrowModifier = {
        name: 'arrow',
        options: { element: arrowElement, ...arrowOverrideModifierOptions },
    };

    const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [arrowModifier, ...popperModifiers.filter((mod: any) => mod.name !== 'arrow')],
        ...restPopperProps,
    });

    useTriggerHover(referenceElement, update, setIsVisible, triggerMode);

    const { onClick: propsTriggerOnClick, ...restTriggerProps } = triggerProps;

    const referenceOverlayTriggerClass = cx(REFERENCE_OVERLAY_TRIGGER_CLASS, className);

    const triggerOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        update && update();
        triggerMode === 'click' && setIsVisible((v) => !v);
        propsTriggerOnClick && propsTriggerOnClick(e);
    };

    return (
        <TriggerTag
            ref={setReferenceElement}
            className={referenceOverlayTriggerClass}
            onClick={triggerOnClick}
            {...restTriggerProps}
        >
            {children}
            <ReferenceOverlayContent
                portalRef={portalRef}
                setPopperElement={setPopperElement}
                attributes={attributes}
                overlayContent={overlayContent}
                overlayProps={overlayProps}
                overlayArrowProps={overlayArrowProps}
                setArrowElement={setArrowElement}
                triggerMode={triggerMode}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                styles={styles}
                update={update}
            />
        </TriggerTag>
    );
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
}: ReferenceOverlayContentProps): null | JSX.Element {
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

    const referenceOverlayClass = cx(REFERENCE_OVERLAY_CLASS, propsOverlayClass, {
        [REFERENCE_OVERLAY_VISIBLE_CLASS]: isVisible,
    });
    const referenceOverlayArrowClass = cx(REFERENCE_OVERLAY_ARROW_CLASS, propsOverlayArrowClass, {
        [REFERENCE_OVERLAY_ARROW_VISIBLE_CLASS]: isVisible,
    });

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

function useTriggerHover(
    referenceElement: HTMLElement | null,
    update: (() => Promise<Partial<any>>) | null,
    setIsVisible: (isVisible: boolean) => void,
    triggerMode: ReferenceOverlayTriggerModeType
) {
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
