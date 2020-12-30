import { KEY_CODES } from './constants';

export function a11yClickableElement({ onClick, onKeyDown, role = 'button', tabIndex = 0 }) {
    return {
        role,
        onClick,
        onKeyDown: onKeyDown
            ? onKeyDown
            : (event) => {
                  if (event.keyCode === KEY_CODES.ENTER) {
                      event.preventDefault();
                      onClick(event);
                  }
              },
        tabIndex,
    };
}
