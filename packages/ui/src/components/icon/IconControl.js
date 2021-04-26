import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { KEY_CODES } from '../../utils/constants';

import { Icon } from './Icon';

const ICON_CONTROL_CLASS = `${UI_PREFIX}__icon-control`;

export function IconControl({ className = '', onKeyDown, onClick, ...rest }) {
    const iconControlClassName = `${ICON_CONTROL_CLASS} ${className}`.trim();

    const propOnKeyDown = onKeyDown
        ? onKeyDown
        : onClick
        ? (e) => {
              if (e.keyCode === KEY_CODES.SPACEBAR) {
                  e.preventDefault();
                  e.stopPropagation();
                  onClick();
              }
          }
        : undefined;

    return (
        <Icon
            size="smaller"
            className={iconControlClassName}
            onKeyDown={propOnKeyDown}
            onClick={onClick}
            {...rest}
        />
    );
}

IconControl.propTypes = {
    className: PropTypes.string,
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
};
