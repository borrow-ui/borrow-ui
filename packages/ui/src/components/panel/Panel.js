import React, { useState, Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

import { IconControl } from '../icon/IconControl';
import { Loader } from '../loader/Loader';

const PANEL_CLASS = `${UI_PREFIX}__panel`;
const PANEL_VISIBLE_CLASS = `${UI_PREFIX}__panel--visible`;
const PANEL_CONTAINER_CLASS = `${UI_PREFIX}__panel__container`;
const PANEL_HEADER_CLASS = `${UI_PREFIX}__panel__header`;
const PANEL_HEADER_TITLE_CLASS = `${UI_PREFIX}__panel__header__title`;
const PANEL_HEADER_CONTROLS_CLASS = `${UI_PREFIX}__panel__header__controls`;
const PANEL_CONTENT_CLASS = `${UI_PREFIX}__panel__content`;
const PANEL_FOOTER_CLASS = `${UI_PREFIX}__panel__footer`;

const ICON_CLOSE = 'close';

const PANEL_ROOT_ID = 'panel-root';

export const DEFAULT_PANEL_WIDTH = 500;

let lastSetVisible = null;

export function Panel({ Trigger, getPanelContentProps }) {
    const [visible, setVisible] = useState(false);
    getPanelRoot(); // use here to prepare the panel

    const uniqueSetVisible = state => {
        if (state) {
            if (lastSetVisible) lastSetVisible(false);
            lastSetVisible = null;
        }
        setVisible(state);
    };

    return (
        <Fragment>
            <Trigger setVisible={uniqueSetVisible} visible={visible} />
            {visible && (
                <PanelContent
                    {...getPanelContentProps({ setVisible })}
                    visible={visible}
                    setVisible={setVisible}
                />
            )}
        </Fragment>
    );
}

Panel.propTypes = {
    Trigger: propTypesChildren.isRequired,
    getPanelContentProps: PropTypes.func.isRequired,
};

function PanelContent({
    content,
    title = null,
    controls = null,
    footer = null,
    visible = false,
    hooks = {},
    setVisible,
    width = DEFAULT_PANEL_WIDTH,
    innerContainerWidth,
}) {
    const [panelState, setPanelState] = useState({
        isLoading: hooks.onOpen ? true : false,
    });
    const panelRoot = getPanelRoot();

    lastSetVisible = setVisible;
    const styleWidth = typeof width === 'number' ? `${width}px` : width;
    const innerContainerStyleWidth = innerContainerWidth || styleWidth;

    useEffect(() => {
        const openPromise = new Promise((resolve, reject) => {
            if (hooks.onOpen) return hooks.onOpen({ resolve, reject });
            else resolve();
        });
        openPromise.then(() => {
            setPanelState({ ...panelState, isLoading: false });
        });

        return function cleanup() {
            panelRoot.classList.remove(PANEL_VISIBLE_CLASS);
            panelRoot.style.width = 0;
        };
    }, []); // eslint-disable-line

    useEffect(() => {
        if (visible) {
            panelRoot.classList.add(PANEL_VISIBLE_CLASS);
            panelRoot.style.width = styleWidth;
        }
    }, [visible, panelRoot, styleWidth]);

    return createPortal(
        <div className={PANEL_CONTAINER_CLASS} style={{ width: innerContainerStyleWidth }}>
            <div className={PANEL_HEADER_CLASS}>
                <div className={PANEL_HEADER_TITLE_CLASS}>{title}</div>
                <div className={PANEL_HEADER_CONTROLS_CLASS}>
                    {controls}
                    <IconControl name={ICON_CLOSE} onClick={() => setVisible(false)} />
                </div>
            </div>
            <div className={PANEL_CONTENT_CLASS}>
                {panelState.isLoading && <Loader />}
                {!panelState.isLoading && content}
            </div>
            {footer && <div className={PANEL_FOOTER_CLASS}>{footer}</div>}
        </div>,
        panelRoot
    );
}

PanelContent.propTypes = {
    content: propTypesChildren,
    title: propTypesChildren,
    controls: propTypesChildren,
    footer: propTypesChildren,
    visible: PropTypes.bool,
    hooks: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    contentWidth: PropTypes.number,
    setVisible: PropTypes.func.isRequired,
};

function getPanelRoot() {
    let panelRoot = document.getElementById(PANEL_ROOT_ID);
    if (panelRoot === null) {
        panelRoot = document.createElement('div');
        panelRoot.setAttribute('id', PANEL_ROOT_ID);
        panelRoot.classList.add(PANEL_CLASS);
        panelRoot.style.width = 0;
        document.body.appendChild(panelRoot);
    }
    return panelRoot;
}
