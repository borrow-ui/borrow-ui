import React, { Fragment, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { IconControl } from '../icon/IconControl';
import { Loader } from '../loader/Loader';
import { UI_PREFIX } from '../../config';

const MODAL_WRAPPER_CLASS = `${UI_PREFIX}__modal__wrapper`;
const MODAL_CONTAINER_CLASS = `${UI_PREFIX}__modal__container`;
const MODAL_CONTAINER_MAXIMIZED_CLASS = `${UI_PREFIX}__modal__container--maximized`;
const MODAL_CONTAINER_DEFAULT_CLASS = `${UI_PREFIX}__modal__container--default`;
const MODAL_HEADER_CLASS = `${UI_PREFIX}__modal__header`;
const MODAL_CONTROLS_CLASS = `${UI_PREFIX}__modal__controls`;
const MODAL_CONTENT_CLASS = `${UI_PREFIX}__modal__content`;
const MODAL_CONTENT_HEADER_CLASS = `${UI_PREFIX}__modal__content--header`;
const MODAL_CONTENT_HEADER_FOOTER_CLASS = `${UI_PREFIX}__modal__content--header--footer`;
const MODAL_TITLE_CLASS = `${UI_PREFIX}__modal__title`;
const MODAL_FOOTER_CLASS = `${UI_PREFIX}__modal__footer`;

const MODAL_ROOT_ID = 'modal-root';

// these should match the CSS ones
const HEADER_HEIGHT = 55;
const FOOTER_HEIGHT = 65;

// Note: ModalTrigger and Icon wrappers are defined after ModalWindow

export function ModalWindow({
    title,
    content,
    footer,
    maximized = false,
    closeModal,
    setViewModalWindow,
    wrapperClass = '',
    startWidth = '70%',
    startHeight = 400,
    hooks = {},
    canMaximize = true,
}) {
    const sizedModalContainerStyle = {};
    if (!maximized) {
        sizedModalContainerStyle.width = startWidth;
        sizedModalContainerStyle.height = startHeight;
    }

    const [modalContainer] = useState(document.createElement('div'));
    const [modalState, setModalState] = useState({
        isMaximized: maximized,
        modalContainerStyle: maximized ? {} : sizedModalContainerStyle,
        isLoading: hooks.onOpen ? true : false,
    });

    const setIsMaximized = isMax => {
        setModalState({
            ...modalState,
            isMaximized: isMax,
            modalContainerStyle: isMax ? {} : sizedModalContainerStyle,
        });
    };

    const closeModalWindow = closeModal ? closeModal : () => setViewModalWindow(false);

    useEffect(() => {
        let modalRoot = document.getElementById(MODAL_ROOT_ID);
        if (modalRoot === null) {
            modalRoot = document.createElement('div');
            modalRoot.setAttribute('id', MODAL_ROOT_ID);
            document.body.appendChild(modalRoot);
        }
        modalRoot.appendChild(modalContainer);

        const openPromise = new Promise((resolve, reject) => {
            if (hooks.onOpen) return hooks.onOpen({ resolve, reject });
            else resolve();
        });
        openPromise.then(() => {
            setModalState({ ...modalState, isLoading: false });
        });

        return function cleanup() {
            modalRoot.removeChild(modalContainer);
        };
    }, []); // eslint-disable-line

    const modalContainerStatusClass = modalState.isMaximized
        ? MODAL_CONTAINER_MAXIMIZED_CLASS
        : MODAL_CONTAINER_DEFAULT_CLASS;

    const modalContentSizeClass = footer
        ? MODAL_CONTENT_HEADER_FOOTER_CLASS
        : MODAL_CONTENT_HEADER_CLASS;

    const modalContentStyle = {};
    if (startHeight && !modalState.isMaximized) {
        const startHeightNumber =
            typeof startHeight === 'string' ? +startHeight.replace('px', '') : startHeight;
        modalContentStyle.height = `${startHeightNumber - HEADER_HEIGHT - FOOTER_HEIGHT}px`;
    }

    return createPortal(
        <Fragment>
            <div className={`${MODAL_WRAPPER_CLASS} ${wrapperClass}`}>
                <div
                    className={`${MODAL_CONTAINER_CLASS} ${modalContainerStatusClass}`}
                    style={modalState.modalContainerStyle}
                >
                    <div className={MODAL_HEADER_CLASS}>
                        <div className={MODAL_TITLE_CLASS}>{title}</div>
                        <div className={MODAL_CONTROLS_CLASS}>
                            {!modalState.isLoading && (
                                <Fragment>
                                    {!modalState.isMaximized && canMaximize && (
                                        <IconMaximize setIsMaximized={setIsMaximized} />
                                    )}
                                    {modalState.isMaximized && canMaximize && (
                                        <IconMinimize setIsMaximized={setIsMaximized} />
                                    )}
                                    <IconClose closeModalWindow={closeModalWindow} />
                                </Fragment>
                            )}
                        </div>
                    </div>
                    <div
                        className={`${MODAL_CONTENT_CLASS} ${modalContentSizeClass}`}
                        style={modalContentStyle}
                    >
                        {modalState.isLoading && <Loader />}
                        {!modalState.isLoading && content}
                    </div>
                    {footer && (
                        <div className={MODAL_FOOTER_CLASS}>{!modalState.isLoading && footer}</div>
                    )}
                </div>
            </div>
        </Fragment>,
        modalContainer
    );
}

ModalWindow.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    closeModal: PropTypes.func,
    maximized: PropTypes.bool,
    canMaximize: PropTypes.bool,
    wrapperClass: PropTypes.string,
    startHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    startWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hooks: PropTypes.shape({
        onOpen: PropTypes.func,
    }),
};

export function Modal({ Trigger, getModalWindowProps }) {
    const [viewModalWindow, setViewModalWindow] = useState(false);

    return (
        <Fragment>
            <Trigger setViewModalWindow={setViewModalWindow} />
            {viewModalWindow && (
                <ModalWindow
                    {...getModalWindowProps({ setViewModalWindow })}
                    setViewModalWindow={setViewModalWindow}
                />
            )}
        </Fragment>
    );
}

Modal.propTypes = {
    Trigger: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func,
    ]).isRequired,
    getModalWindowProps: PropTypes.func.isRequired,
};

function ModalIcon(props) {
    return <IconControl size="small" {...props} />;
}

function IconMaximize({ setIsMaximized }) {
    return <ModalIcon name="fullscreen" onClick={() => setIsMaximized(true)} />;
}
function IconMinimize({ setIsMaximized }) {
    return <ModalIcon name="fullscreen_exit" onClick={() => setIsMaximized(false)} />;
}
function IconClose({ closeModalWindow }) {
    return <ModalIcon name="close" onClick={() => closeModalWindow({ source: 'closeIcon' })} />;
}
