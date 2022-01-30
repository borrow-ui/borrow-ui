import React, { Fragment, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { UI_PREFIX } from '../../config';
import { KEY_CODES } from '../../utils/constants';
import { IconControl } from '../icon/IconControl';
import { IconControlProps } from '../icon/IconControl.types';
import { Loader } from '../loader/Loader';

import {
    IconControlCloseWindowModalProps,
    IconControlMaximizedProps,
    ModalProps,
    ModalWindowPortalInput,
    ModalWindowProps,
} from './Modal.types';

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

// these should match the CSS ones, are used to auto-calculate the
// modal height with and withouth footer.
const HEADER_HEIGHT = 55;
const FOOTER_HEIGHT = 65;

// Note: Icon wrappers are defined after ModalWindow

export const Modal = ({ Trigger, getModalWindowProps }: ModalProps): JSX.Element => {
    const [viewModalWindow, setVisible] = useState(false);

    return (
        <Fragment>
            <Trigger setVisible={setVisible} />
            {viewModalWindow && (
                <ModalWindow {...getModalWindowProps({ setVisible })} setVisible={setVisible} />
            )}
        </Fragment>
    );
};

export const ModalWindow = ({
    title,
    content,
    footer,
    maximized = false,
    closeModal,
    setVisible,
    startWidth = '70%',
    startHeight = 400,
    hooks = {},
    showCloseIcon = true,
    canMaximize = true,
    closeOnEscape = true,
    stopClickPropagation = true,
    wrapperProps = {},
    containerProps = {},
    contentProps = {},
    footerProps = {},
}: ModalWindowProps): JSX.Element | null => {
    const sizedModalContainerStyle: { width?: string | number; height?: string | number } = {};
    if (!maximized) {
        sizedModalContainerStyle.width = startWidth;
        sizedModalContainerStyle.height = startHeight;
    }

    const modalContainerState = useState(
        typeof document !== undefined ? document.createElement('div') : null
    );
    const modalContainer: HTMLElement | null = modalContainerState[0];
    const [modalState, setModalState] = useState({
        isMaximized: maximized,
        modalContainerStyle: maximized ? {} : sizedModalContainerStyle,
        isLoading: hooks.onOpen ? true : false,
    });

    const setIsMaximized = (isMax: boolean) => {
        setModalState({
            ...modalState,
            isMaximized: isMax,
            modalContainerStyle: isMax ? {} : sizedModalContainerStyle,
        });
    };

    const closeModalWindow = closeModal ? closeModal : () => setVisible(false);

    useEffect(() => {
        const modalRoot = getModalRoot();
        if (modalRoot !== undefined && modalContainer !== null)
            modalRoot.appendChild(modalContainer);

        const bodyOverflow = typeof document !== undefined && document.body.style.overflow;

        const openPromise = new Promise((resolve, reject) => {
            if (hooks.onOpen) return hooks.onOpen({ resolve, reject });
            else resolve(true);
        });
        openPromise.then(() => {
            setModalState({ ...modalState, isLoading: false });
            if (typeof document !== undefined) document.body.style.overflow = 'hidden';
        });

        let closeOnEscapeCallback: null | EventListener = null;
        if (closeOnEscape) {
            closeOnEscapeCallback = (e: any) => {
                if (e.key === KEY_CODES.ESCAPE || e.key === KEY_CODES.ESCAPE_LEGACY) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModalWindow();
                }
            };

            if (typeof window !== 'undefined') {
                window.addEventListener('keydown', closeOnEscapeCallback);
            }
        }

        return function cleanup() {
            if (modalRoot !== undefined && modalContainer !== null)
                modalRoot.removeChild(modalContainer);
            if (typeof document === undefined || typeof window === undefined) return;

            if (closeOnEscapeCallback !== null)
                closeOnEscape && window.removeEventListener('keydown', closeOnEscapeCallback);

            if (bodyOverflow) document.body.style.overflow = bodyOverflow;
        };
    }, []); // eslint-disable-line

    const modalContainerStatusClass = modalState.isMaximized
        ? MODAL_CONTAINER_MAXIMIZED_CLASS
        : MODAL_CONTAINER_DEFAULT_CLASS;

    const modalContentSizeClass = footer
        ? MODAL_CONTENT_HEADER_FOOTER_CLASS
        : MODAL_CONTENT_HEADER_CLASS;

    const modalContentStyle: { height?: string } = {};
    if (startHeight && !modalState.isMaximized) {
        const startHeightNumber =
            typeof startHeight === 'string' ? +startHeight.replace('px', '') : startHeight;
        const footerHeight = footer ? FOOTER_HEIGHT : 0;
        modalContentStyle.height = `${startHeightNumber - HEADER_HEIGHT - footerHeight}px`;
    }

    if (modalContainer === null) return null;

    return (
        <ModalWindowPortal
            title={title}
            content={content}
            footer={footer}
            classes={{ modalContainerStatusClass, modalContentSizeClass }}
            styles={{ modalContentStyle }}
            showCloseIcon={showCloseIcon}
            canMaximize={canMaximize}
            setIsMaximized={setIsMaximized}
            closeModalWindow={closeModalWindow}
            stopClickPropagation={stopClickPropagation}
            modalState={modalState}
            modalContainer={modalContainer}
            wrapperProps={wrapperProps}
            containerProps={containerProps}
            contentProps={contentProps}
            footerProps={footerProps}
        />
    );
};

function ModalWindowPortal({
    title,
    content,
    footer,
    classes,
    styles,
    showCloseIcon,
    canMaximize,
    setIsMaximized,
    closeModalWindow,
    stopClickPropagation,
    modalState,
    modalContainer,
    wrapperProps,
    containerProps,
    contentProps,
    footerProps,
}: ModalWindowPortalInput) {
    const { modalContainerStatusClass, modalContentSizeClass } = classes;
    const { modalContentStyle } = styles;

    const {
        className: wrapperClass = '',
        onClick: onWrapperClick,
        ...restWrapperProps
    } = wrapperProps || {};
    const wrapperClassName = `${MODAL_WRAPPER_CLASS} ${wrapperClass}`.trim();

    const {
        className: containerClass = '',
        style: containerStyleProp,
        ...restContainerProps
    } = containerProps;
    const containerClassName =
        `${MODAL_CONTAINER_CLASS} ${modalContainerStatusClass} ${containerClass}`.trim();
    const containerStyle = { ...modalState.modalContainerStyle, ...containerStyleProp };

    const { className: contentClass = '', ...restContentProps } = contentProps;
    const contentClassName =
        `${MODAL_CONTENT_CLASS} ${modalContentSizeClass} ${contentClass}`.trim();

    const { className: footerClass = '', ...restFooterProps } = footerProps;
    const footerClassName = `${MODAL_FOOTER_CLASS} ${footerClass}`.trim();

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // This cannot be tested with react-testing-library,
        // see https://github.com/testing-library/react-testing-library/issues/487
        stopClickPropagation && e.stopPropagation();
        onWrapperClick && onWrapperClick(e);
    };

    return createPortal(
        <div className={wrapperClassName} onClick={onClick} {...restWrapperProps}>
            <div className={containerClassName} style={containerStyle} {...restContainerProps}>
                <div className={MODAL_HEADER_CLASS}>
                    <div className={MODAL_TITLE_CLASS}>{title}</div>
                    <div className={MODAL_CONTROLS_CLASS}>
                        {!modalState.isLoading && (
                            <Fragment>
                                {!modalState.isMaximized && canMaximize && (
                                    <IconMaximize
                                        setIsMaximized={setIsMaximized}
                                        data-testid="modal-maximize-icon"
                                    />
                                )}
                                {modalState.isMaximized && canMaximize && (
                                    <IconMinimize
                                        setIsMaximized={setIsMaximized}
                                        data-testid="modal-minimize-icon"
                                    />
                                )}
                                {showCloseIcon && (
                                    <IconClose
                                        closeModalWindow={closeModalWindow}
                                        data-testid="modal-close-icon"
                                    />
                                )}
                            </Fragment>
                        )}
                    </div>
                </div>
                <div className={contentClassName} style={modalContentStyle} {...restContentProps}>
                    {modalState.isLoading && <Loader />}
                    {!modalState.isLoading && content}
                </div>
                {footer && (
                    <div className={footerClassName} {...restFooterProps}>
                        {!modalState.isLoading && footer}
                    </div>
                )}
            </div>
        </div>,
        modalContainer
    );
}

function ModalIcon(props: IconControlProps) {
    return <IconControl size="small" {...props} />;
}

function IconMaximize({ setIsMaximized, ...rest }: IconControlMaximizedProps) {
    return <ModalIcon name="fullscreen" onClick={() => setIsMaximized(true)} {...rest} />;
}

function IconMinimize({ setIsMaximized, ...rest }: IconControlMaximizedProps) {
    return <ModalIcon name="fullscreen_exit" onClick={() => setIsMaximized(false)} {...rest} />;
}

function IconClose({ closeModalWindow, ...rest }: IconControlCloseWindowModalProps) {
    return (
        <ModalIcon
            name="close"
            onClick={() => closeModalWindow && closeModalWindow({ source: 'showCloseIcon' })}
            {...rest}
        />
    );
}

function getModalRoot(): HTMLElement | undefined {
    if (typeof document === undefined) return;

    let modalRoot = document.getElementById(MODAL_ROOT_ID);
    if (modalRoot === null) {
        modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', MODAL_ROOT_ID);
        document.body.appendChild(modalRoot);
    }
    return modalRoot;
}
