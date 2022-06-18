import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { UI_PREFIX } from '../../../config';
import { cx } from '../../../utils/classNames';
import { DropzoneFiles } from './DropzoneFiles';
import { DropzoneProps, IDropzoneState, FileType } from './Dropzone.types';

const FORM_DROPZONE_CLASS = `${UI_PREFIX}__form__dropzone`;
const FORM_DROPZONE_DROP_AREA_CLASS = `${UI_PREFIX}__form__dropzone__drop-area`;
const FORM_DROPZONE_MESSAGE_CLASS = `${UI_PREFIX}__form__dropzone__message`;
const FORM_DROPZONE_MESSAGE_ACTIVE_CLASS = `${UI_PREFIX}__form__dropzone__message--active`;
const FORM_DROPZONE_MESSAGE_INACTIVE_CLASS = `${UI_PREFIX}__form__dropzone__message--inactive`;

export const Dropzone = ({
    className = '',
    dragActiveMessage,
    dragInactiveMessage,
    dragMessage = 'Drop the files here...',
    onDrop,
    onFileRemove,
    onFilesChanges,
    initialFiles = [],
    maxFiles,
    disabled,
    disabledMessage = 'File upload is disabled',
    FileComponent,
    dropAreaProps = {},
    inputProps = {},
    ...rest
}: DropzoneProps): JSX.Element => {
    const [dropzoneState, setDropzoneState] = useState<IDropzoneState>({
        files: initialFiles,
        lastChangeReason: null,
    });

    const onDropCallback = useCallback(
        (acceptedFiles: Array<FileType>) => {
            const newState = {
                ...dropzoneState,
                lastChangeReason: 'add',
                files: [...dropzoneState.files, ...acceptedFiles],
            };
            setDropzoneState(newState);
            onDrop && onDrop(acceptedFiles, newState, setDropzoneState);
        },
        [onDrop, dropzoneState]
    );

    const onRemoveCallback = useCallback(
        (removeIndex: number) => {
            const removedFile = dropzoneState.files[removeIndex];
            const newState = {
                ...dropzoneState,
                lastChangeReason: 'remove',
                files: dropzoneState.files.filter((f, i) => i !== removeIndex),
            };
            setDropzoneState(newState);
            onFileRemove && onFileRemove(removedFile, newState, setDropzoneState);
        },
        [onFileRemove, dropzoneState]
    );

    useEffect(() => {
        if (dropzoneState.lastChangeReason) {
            onFilesChanges && onFilesChanges(dropzoneState, setDropzoneState);
            setDropzoneState({ ...dropzoneState, lastChangeReason: null });
        }
    }, [dropzoneState, onFilesChanges]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

    const dragActive = (
        <div className={cx(FORM_DROPZONE_MESSAGE_CLASS, FORM_DROPZONE_MESSAGE_ACTIVE_CLASS)}>
            {dragActiveMessage ? dragActiveMessage : dragMessage}
        </div>
    );
    const dragInactive = (
        <div className={cx(FORM_DROPZONE_MESSAGE_CLASS, FORM_DROPZONE_MESSAGE_INACTIVE_CLASS)}>
            {dragInactiveMessage ? dragInactiveMessage : dragMessage}
        </div>
    );

    const dropzoneClassName = cx(FORM_DROPZONE_CLASS, className);

    const { className: rootPropsClassName = '', ...rootProps } = getRootProps();
    const { className: dropAreaPropsClassName = '', ...restDropAreaProps } = dropAreaProps;
    const dropAreaClassName = cx(
        FORM_DROPZONE_DROP_AREA_CLASS,
        dropAreaPropsClassName,
        rootPropsClassName
    );

    const dropzoneInputProps = getInputProps();

    return (
        <div className={dropzoneClassName} {...rest}>
            <div {...rootProps} className={dropAreaClassName} {...restDropAreaProps}>
                {disabled && disabledMessage}
                {(!maxFiles || dropzoneState.files.length < maxFiles) && !disabled && (
                    <>
                        <input {...dropzoneInputProps} {...inputProps} />
                        {isDragActive ? dragActive : dragInactive}
                    </>
                )}
            </div>
            <DropzoneFiles
                dropzoneState={dropzoneState}
                onRemove={onRemoveCallback}
                FileComponent={FileComponent}
                disabled={disabled}
            />
        </div>
    );
};
