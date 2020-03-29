import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

const POPOVER_CLASS = `${UI_PREFIX}__popover`;
const POPOVER_VISIBLE_CLASS = `${UI_PREFIX}__popover--visible`;
const POPOVER_OUTER_CONTAINER_CLASS = `${UI_PREFIX}__popover__outer-container`;
const POPOVER_TRIGGER_CLASS = `${UI_PREFIX}__popover__trigger`;
const POPOVER_ENTRY_CLASS = `${UI_PREFIX}__popover__entry`;
const POPOVER_ENTRY_VISIBLE_CLASS = `${UI_PREFIX}__popover__entry--visible`;
const POPOVER_DIVIDER_CLASS = `${UI_PREFIX}__popover__divider`;

export const POPOVER_POSITIONS = {
    AUTO: 'auto',
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right',
};

export function Popover({
    children,
    trigger,
    triggerOn = 'click',
    position = 'auto',
    persist = false,
}) {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);

    const initialState = {
        visible: false,
        top: 0,
        left: undefined,
        controllerWidth: 0,
        triggerRef,
        persist,
    };
    const [state, setState] = useState(initialState);

    useAmendedPosition(state, setState, containerRef, position);

    const containerClass = `${POPOVER_CLASS} ${state.visible ? POPOVER_VISIBLE_CLASS : ''}`;
    const containerStyle = { top: state.top + 'px', left: state.left + 'px' };

    const triggerProps = {};
    if (triggerOn === 'click') triggerProps.onClick = e => toggleMenuVisibility(e, state, setState);
    if (triggerOn === 'hover') {
        triggerProps.onMouseEnter = e => toggleMenuVisibility(e, state, setState);
        if (!persist) {
            triggerProps.onMouseLeave = e => setState(st => ({ ...st, visible: false }));
        } else {
            triggerProps.onClick = e => toggleMenuVisibility(e, state, setState);
        }
    }

    return (
        <div className={POPOVER_OUTER_CONTAINER_CLASS}>
            <div className={POPOVER_TRIGGER_CLASS} {...triggerProps} ref={triggerRef}>
                {trigger}
                <div ref={containerRef} className={containerClass} style={containerStyle}>
                    {children}
                </div>
            </div>
        </div>
    );
}

Popover.propTypes = {
    trigger: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    triggerOn: PropTypes.oneOf(['click', 'hover']),
    position: PropTypes.oneOf([
        POPOVER_POSITIONS.AUTO,
        POPOVER_POSITIONS.TOP_LEFT,
        POPOVER_POSITIONS.TOP_RIGHT,
        POPOVER_POSITIONS.BOTTOM_LEFT,
        POPOVER_POSITIONS.BOTTOM_RIGHT,
    ]),
    persist: PropTypes.bool,
};

function useAmendedPosition(state, setState, containerRef, position) {
    useEffect(() => {
        const node = containerRef.current;
        if (node && state.visible) {
            const leftBound = window.innerWidth;
            const dropDownRect = node.getBoundingClientRect();
            const lastCoord = state.left + dropDownRect.width;

            const amendedState = {};

            const mustBePlacedLeft =
                (lastCoord > leftBound && position === POPOVER_POSITIONS.AUTO) ||
                [POPOVER_POSITIONS.TOP_LEFT, POPOVER_POSITIONS.BOTTOM_LEFT].includes(position);
            if (mustBePlacedLeft) {
                const leftPos = state.targetLeft - dropDownRect.width + state.controllerWidth;
                if (state.left !== leftPos) amendedState.left = leftPos;
            }

            const mustBePlacedTop = [
                POPOVER_POSITIONS.TOP_LEFT,
                POPOVER_POSITIONS.TOP_RIGHT,
            ].includes(position);
            if (mustBePlacedTop) {
                const topPos = state.targetTop - dropDownRect.height;
                if (state.top !== topPos) amendedState.top = topPos;
            }

            if (Object.keys(amendedState).length > 0) {
                setState({ ...state, ...amendedState });
            }

            const closeMenu = e => {
                if (!state.persist || e.target === state.triggerRef)
                    setState({ ...state, visible: false });
            };
            document.addEventListener('click', closeMenu);

            return () => {
                document.removeEventListener('click', closeMenu);
            };
        }
    }, [state, setState, containerRef, position]);
}

function toggleMenuVisibility(e, state, setState) {
    if (state.visible) {
        setState({ ...state, visible: false });
    } else {
        const targetRect = e.target.getBoundingClientRect();

        const newState = {
            visible: true,
            top: targetRect.top + targetRect.height,
            left: targetRect.left,
            targetTop: targetRect.top,
            targetLeft: targetRect.left,
            controllerWidth: targetRect.width,
            controllerHeight: targetRect.height,
        };
        setState(newState);
    }
}
