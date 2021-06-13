import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../../config';
import { a11yClickableElement } from '../../../utils/a11y';
import { propTypesChildren } from '../../../utils/types';

const DROPZONE_FILES_CLASS = `${UI_PREFIX}__form__dropzone__files`;
const DROPZONE_FILES_FILE_CLASS = `${UI_PREFIX}__form__dropzone__files__file`;
const DROPZONE_FILES_FILE_NAME_CLASS = `${UI_PREFIX}__form__dropzone__files__file__name`;
const DROPZONE_FILES_FILE_REMOVE_CLASS = `${UI_PREFIX}__form__dropzone__files__file__remove`;
const DROPZONE_FILES_FILE_REMOVE_DISABLED_CLASS = `${UI_PREFIX}__form__dropzone__files__file__remove--disabled`;

export function DropzoneFiles({
    dropzoneState,
    onRemove,
    FileComponent,
    disabled,
    className = '',
    ...rest
}) {
    const DropzoneFileComponent = FileComponent ? FileComponent : DropzoneFile;

    const dropzoneClassName = `${DROPZONE_FILES_CLASS} ${className}`.trim();

    return (
        <div className={dropzoneClassName} {...rest}>
            {dropzoneState.files.map((file, index) => {
                return (
                    <DropzoneFileComponent
                        key={`file-${index}`}
                        file={file}
                        fileIndex={index}
                        onRemove={onRemove}
                        disabled={disabled}
                    />
                );
            })}
        </div>
    );
}

DropzoneFiles.propTypes = {
    dropzoneState: PropTypes.shape({
        files: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })).isRequired,
    }).isRequired,
    onRemove: PropTypes.func,
    FileComponent: propTypesChildren,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export function DropzoneFile({ file, fileIndex, onRemove, disabled }) {
    const disabledClass = disabled ? DROPZONE_FILES_FILE_REMOVE_DISABLED_CLASS : '';
    const filesFileRemoveClassName = `${DROPZONE_FILES_FILE_REMOVE_CLASS} ${disabledClass}`;

    return (
        <div className={DROPZONE_FILES_FILE_CLASS}>
            <span className={DROPZONE_FILES_FILE_NAME_CLASS}>{file.name}</span>
            <span
                className={filesFileRemoveClassName}
                {...a11yClickableElement({
                    onClick: () => !disabled && onRemove && onRemove(fileIndex),
                })}
            >
                &times;
            </span>
        </div>
    );
}

DropzoneFile.propTypes = {
    file: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
    fileIndex: PropTypes.number.isRequired,
    onRemove: PropTypes.func,
    disabled: PropTypes.bool,
};
