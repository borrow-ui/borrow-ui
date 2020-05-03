import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../../config';
import { propTypesChildren } from '../../../utils/types';

const DROPZONE_FILES_CLASS = `${UI_PREFIX}__form__dropzone__files`;
const DROPZONE_FILES_FILE_CLASS = `${UI_PREFIX}__form__dropzone__files__file`;
const DROPZONE_FILES_FILE_NAME_CLASS = `${UI_PREFIX}__form__dropzone__files__file__name`;
const DROPZONE_FILES_FILE_REMOVE_CLASS = `${UI_PREFIX}__form__dropzone__files__file__remove`;

export function DropzoneFiles({ dropzoneState, onRemove, FileComponent }) {
    const DropzoneFileComponent = FileComponent ? FileComponent : DropzoneFile;

    return (
        <div className={DROPZONE_FILES_CLASS}>
            {dropzoneState.files.map((file, index) => {
                return (
                    <DropzoneFileComponent
                        key={`file-${index}`}
                        file={file}
                        fileIndex={index}
                        onRemove={onRemove}
                    />
                );
            })}
        </div>
    );
}

DropzoneFiles.propTypes = {
    dropzoneState: PropTypes.object.isRequired,
    onRemove: PropTypes.func,
    FileComponent: propTypesChildren,
};

export function DropzoneFile({ file, fileIndex, onRemove }) {
    return (
        <div className={DROPZONE_FILES_FILE_CLASS}>
            <span className={DROPZONE_FILES_FILE_NAME_CLASS}>{file.name}</span>
            <span
                className={DROPZONE_FILES_FILE_REMOVE_CLASS}
                onClick={() => onRemove && onRemove(fileIndex)}
            >
                &times;
            </span>
        </div>
    );
}

DropzoneFile.propTypes = {
    file: PropTypes.object.isRequired,
    fileIndex: PropTypes.number.isRequired,
    onRemove: PropTypes.func,
};
