import React from 'react';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { MonospaceProps } from './Monospace.types';

const TEXT_MONOSPACE_CLASS = `${UI_PREFIX}__text__monospace`;

export const Monospace = ({ children, className = '', ...rest }: MonospaceProps): JSX.Element => {
    const monospaceClassName = cx(TEXT_MONOSPACE_CLASS, className);

    return (
        <span className={monospaceClassName} {...rest}>
            {children}
        </span>
    );
};
