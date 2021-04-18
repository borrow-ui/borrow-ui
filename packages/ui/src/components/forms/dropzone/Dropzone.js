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
    maxFiles,
    disabled,
    disabledMessage = 'File upload is disabled',
    FileComponent,
    ...rest
}) {
    const [dropzoneState, setDropzoneState] = useState({
        files: initialFiles,
        lastChangeReason: null,
    });

    const onDropCallback = useCallback(
        (acceptedFiles) => {
            const newState = {
                ...dropzoneState,
                files: [...dropzoneState.files, ...acceptedFiles],
            };
            setDropzoneState(newState);
            onDrop && onDrop(acceptedFiles, newState, setDropzoneState);
        },
        [onDrop, dropzoneState]
    );

    const onRemoveCallback = useCallback(
        (removeIndex) => {
            const removedFile = dropzoneState.files[removeIndex];
            const newState = {
                ...dropzoneState,
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
                {disabled && disabledMessage}
                {(!maxFiles || dropzoneState.files.length < maxFiles) && !disabled && (
                    <>
                        <input {...inputProps} />
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
}

Dropzone.propTypes = {
    className: PropTypes.string,
    /** Message displayed in the Drop area */
    dragMessage: propTypesChildren,
    /** Message displayed in the Drop area when a file is dragged into it (before dropping) */
    dragActiveMessage: propTypesChildren,
    /** Message displayed int he Drop area when dragging in not active */
    dragInactiveMessage: propTypesChildren,
    /** Initial list of files, where each object requires the following keys:
     *
     * - `name`: the name of the file
     */
    initialFiles: PropTypes.arrayOf(
        PropTypes.shape({
            name: propTypesChildren,
        })
    ),
    /** Maximum number of files */
    maxFiles: PropTypes.number,
    disabled: PropTypes.bool,
    /** Message shown when the field is disabled */
    disabledMessage: propTypesChildren,
    /** Function called when a file is dropped in the drop area */
    onDrop: PropTypes.func,
    /** Callback called when a file is removed */
    onFileRemove: PropTypes.func,
    /** Callback called when the list of file is changed (either for files added or removed) */
    onFilesChanges: PropTypes.func,
    /** Component used to replace the default File representation in the list of files (see `DropzoneFile` props) */
    FileComponent: propTypesChildren,
};
