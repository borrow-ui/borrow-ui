import React from 'react';

import { UI_PREFIX } from '../../../config';
import { a11yClickableElement } from '../../../utils/a11y';
import { cx } from '../../../utils/classNames';
import { DropzoneFileProps, DropzoneFilesProps } from './Dropzone.types';

const DROPZONE_FILES_CLASS = `${UI_PREFIX}__form__dropzone__files`;
const DROPZONE_FILES_FILE_CLASS = `${UI_PREFIX}__form__dropzone__files__file`;
const DROPZONE_FILES_FILE_NAME_CLASS = `${UI_PREFIX}__form__dropzone__files__file__name`;
const DROPZONE_FILES_FILE_REMOVE_CLASS = `${UI_PREFIX}__form__dropzone__files__file__remove`;
const DROPZONE_FILES_FILE_REMOVE_DISABLED_CLASS = `${UI_PREFIX}__form__dropzone__files__file__remove--disabled`;

export const DropzoneFiles = ({
    dropzoneState,
    onRemove,
    FileComponent,
    disabled,
    className = '',
    ...rest
}: DropzoneFilesProps): JSX.Element => {
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
};

export const DropzoneFile = ({
    file,
    fileIndex,
    onRemove,
    disabled,
}: DropzoneFileProps): JSX.Element => {
    const filesFileRemoveClassName = cx(DROPZONE_FILES_FILE_REMOVE_CLASS, {
        [DROPZONE_FILES_FILE_REMOVE_DISABLED_CLASS]: disabled,
    });

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
};
