import React, { forwardRef } from 'react';

import { UI_PREFIX } from '../../config';
import { BlockProps } from './Block.types';

const BLOCK_CLASS = `${UI_PREFIX}__block`;
const BLOCK_SEPARATED_CLASS = `${UI_PREFIX}__block--separated`;
const BLOCK_PADDED_CLASS = `${UI_PREFIX}__block--padded`;
const BLOCK_ROUNDED_CLASS = `${UI_PREFIX}__block--rounded`;
const BLOCK_OUTSTANDING_CLASS = `${UI_PREFIX}__block--outstanding`;
const BLOCK_OUTSTANDING_HOVER_CLASS = `${UI_PREFIX}__block--outstanding-hover`;
const BLOCK_CONTENT_CENTERED_CLASS = `${UI_PREFIX}__block--content-centered`;
const BLOCK_TITLE_CLASS = `${UI_PREFIX}__block__title`;

export const Block = forwardRef<HTMLDivElement, BlockProps>(
    (
        {
            children,
            title = '',
            titleProps = {},
            className = '',
            separated = true,
            padded = true,
            rounded = true,
            outstanding = false,
            outstandingHover = false,
            contentCentered = false,
            ...rest
        },
        ref
    ): JSX.Element => {
        const separatedClass = separated ? BLOCK_SEPARATED_CLASS : '';
        const paddedClass = padded ? BLOCK_PADDED_CLASS : '';
        const roundedClass = rounded ? BLOCK_ROUNDED_CLASS : '';
        const outstandingClass = outstanding ? BLOCK_OUTSTANDING_CLASS : '';
        const outstandingHoverClass = outstandingHover ? BLOCK_OUTSTANDING_HOVER_CLASS : '';
        const contentCenteredClass = contentCentered ? BLOCK_CONTENT_CENTERED_CLASS : '';
        const propertiesClass =
            `${separatedClass} ${paddedClass} ${roundedClass} ${outstandingClass} ${outstandingHoverClass} ${contentCenteredClass}`.trim();
        const blockClassName = `${BLOCK_CLASS} ${className} ${propertiesClass}`.trim();

        const { className: titleClassName = '', ...restTitleProps } = titleProps;
        const titleClass = `${BLOCK_TITLE_CLASS} ${titleClassName}`.trim();
        return (
            <div className={blockClassName} ref={ref} {...rest}>
                {title && typeof title === 'string' && (
                    <h2 className={titleClass} {...restTitleProps}>
                        {title}
                    </h2>
                )}
                {title && typeof title !== 'string' && title}
                {children}
            </div>
        );
    }
);
