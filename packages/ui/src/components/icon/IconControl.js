import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { KEY_CODES } from '../../utils/constants';

import { Icon } from './Icon';

const ICON_CONTROL_CLASS = `${UI_PREFIX}__icon-control`;

export function IconControl({ className = '', ...rest }) {
    const iconControlClassName = `${className} ${ICON_CONTROL_CLASS}`;

    const onKeyDown = rest.onKeyDown
        ? rest.onKeyDown
        : rest.onClick
        ? (e) => {
              if (e.keyCode === KEY_CODES.SPACEBAR) {
                  e.preventDefault();
                  e.stopPropagation();
                  rest.onClick();
              }
          }
        : undefined;

    return <Icon size="smaller" className={iconControlClassName} onKeyDown={onKeyDown} {...rest} />;
}

IconControl.propTypes = {
    className: PropTypes.string,
};
