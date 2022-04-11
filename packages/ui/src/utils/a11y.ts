import { MouseEventHandler, KeyboardEventHandler } from 'react';

import { KEY_CODES } from './constants';

interface IA11yClickableElement {
    onClick: MouseEventHandler<HTMLElement>;
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
    role?: string;
    tabIndex?: number;
}

export function a11yClickableElement({
    onClick,
    onKeyDown,
    role = 'button',
    tabIndex = 0,
}: IA11yClickableElement) {
    return {
        role,
        onClick,
        onKeyDown: onKeyDown
            ? onKeyDown
            : (event: any) => {
                  // TODO: determine correct type
                  if (event.key === KEY_CODES.ENTER) {
                      event.preventDefault();
                      onClick(event);
                  }
              },
        tabIndex,
    };
}
