import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { UI_PREFIX } from '../../../config';
import { propTypesChildren } from '../../../utils/types';

import { DropzoneFiles } from './DropzoneFiles';

const FORM_DROPZONE_CLASS = `${UI_PREFIX}__form__dropzone`;
const FORM_DROPZONE_DROP_AREA_CLASS = `${UI_PREFIX}__form__dropzone__drop-area`;
const FORM_DROPZONE_MESSAGE_CLASS = `${UI_PREFIX}__form__dropzone__message`;
const FORM_DROPZONE_MESSAGE_ACTIVE_CLASS = `${UI_PREFIX}__form__dropzone__message--active`;
const FORM_DROPZONE_MESSAGE_INACTIVE_CLASS = `${UI_PREFIX}__form__dropzone__message--inactive`;

export function Dropzone({
    className = '',
    dragActiveMessage,
    dragInactiveMessage,
    dragMessage = 'Drop the files here...',
    onDrop,
    onFileRemove,
    onFilesChanges,
    initialFiles = [],
    FileComponent,
    ...rest
}) {
    const [dropzoneState, setDropzoneState] = useState({
        files: initialFiles,
        lastChangeReason: null,
    });

    const onDropCallback = useCallback(
        acceptedFiles => {
            console.log('onDropCallback', acceptedFiles);
            setDropzoneState({
                ...dropzoneState,
                files: [...dropzoneState.files, ...acceptedFiles],
            });
            onDrop && onDrop(acceptedFiles, dropzoneState, setDropzoneState);
        },
        [onDrop, dropzoneState]
    );

    const onRemoveCallback = useCallback(
        removeIndex => {
            console.log('onRemoveCallback', removeIndex);
            const removedFile = dropzoneState.files[removeIndex];
            setDropzoneState({
                ...dropzoneState,
                files: dropzoneState.files.filter((f, i) => i !== removeIndex),
            });
            onFileRemove && onFileRemove(removedFile, dropzoneState, setDropzoneState);
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
        <div className={`${FORM_DROPZONE_MESSAGE_CLASS} ${FORM_DROPZONE_MESSAGE_ACTIVE_CLASS}`}>
            {dragActiveMessage ? dragActiveMessage : dragMessage}
        </div>
    );
    const dragInactive = (
        <div className={`${FORM_DROPZONE_MESSAGE_CLASS} ${FORM_DROPZONE_MESSAGE_INACTIVE_CLASS}`}>
            {dragInactiveMessage ? dragInactiveMessage : dragMessage}
        </div>
    );
    const { rootPropsClassName = '', ...rootProps } = getRootProps();

    const rootClassName = `${FORM_DROPZONE_DROP_AREA_CLASS} ${className} ${rootPropsClassName}`;

    const inputProps = getInputProps();

    return (
        <div className={FORM_DROPZONE_CLASS}>
            <div {...rootProps} className={rootClassName} {...rest}>
                <input {...inputProps} />
                {isDragActive ? dragActive : dragInactive}
            </div>
            <DropzoneFiles
                dropzoneState={dropzoneState}
                onRemove={onRemoveCallback}
                FileComponent={FileComponent}
            />
        </div>
    );
}

Dropzone.propTypes = {
    className: PropTypes.string,
    dragActiveMessage: propTypesChildren,
    dragInactiveMessage: propTypesChildren,
    dragMessage: propTypesChildren,
    initialFiles: PropTypes.array,
    onDrop: PropTypes.func,
    onFileRemove: PropTypes.func,
    onFilesChanges: PropTypes.func,
    FileComponent: propTypesChildren,
};
