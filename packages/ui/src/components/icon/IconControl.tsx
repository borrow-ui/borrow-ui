import React, { ChangeEvent, KeyboardEvent, MouseEvent, MouseEventHandler } from 'react';

import { UI_PREFIX } from '../../config';
import { KEY_CODES } from '../../utils/constants';
import { cx } from '../../utils/classNames';
import { Icon } from './Icon';
import { IconControlProps } from './IconControl.types';

const ICON_CONTROL_CLASS = `${UI_PREFIX}__icon-control`;

export function IconControl({
    className = '',
    onKeyDown,
    onClick,
    ...rest
}: IconControlProps): JSX.Element {
    const iconControlClassName = cx(ICON_CONTROL_CLASS, className);

    const propOnKeyDown = onKeyDown
        ? onKeyDown
        : onClick
        ? (
              e: ChangeEvent<HTMLInputElement> & KeyboardEvent & MouseEvent<MouseEventHandler>
          ): void => {
              if (e.key === KEY_CODES.SPACEBAR || e.key === KEY_CODES.SPACEBAR_LEGACY) {
                  e.preventDefault();
                  e.stopPropagation();
                  onClick(e);
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
