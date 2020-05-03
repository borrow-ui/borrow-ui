import React from 'react';
import PropTypes from 'prop-types';

import { propTypesChildren } from '../../../utils/types';
import { UI_PREFIX } from '../../../config';
import { LAYOUTS } from '../constants';

const LABEL_CLASS = `${UI_PREFIX}__form__label`;
const LABEL_VERTICAL_CLASS = `${UI_PREFIX}__form__label--${LAYOUTS.VERTICAL}`;
const LABEL_HORIZONTAL_CLASS = `${UI_PREFIX}__form__label--${LAYOUTS.HORIZONTAL}`;
const LABEL_REQUIRED_CLASS = `${UI_PREFIX}__form__label--required`;

export function Label({
    label,
    className = '',
    layout = LAYOUTS.DEFAULT,
    width,
    style,
    required,
    ...rest
}) {
    const layoutClass = layout === LAYOUTS.VERTICAL ? LABEL_VERTICAL_CLASS : LABEL_HORIZONTAL_CLASS;
    return (
        <div
            className={`${LABEL_CLASS} ${layoutClass} ${className}`}
            style={{ width, ...style }}
            {...rest}
        >
            {label} {required && <span className={LABEL_REQUIRED_CLASS}>*</span>}
        </div>
    );
}

Label.propTypes = {
    label: propTypesChildren.isRequired,
    className: PropTypes.string,
    layout: PropTypes.oneOf([LAYOUTS.HORIZONTAL, LAYOUTS.VERTICAL]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    required: PropTypes.bool,
};
