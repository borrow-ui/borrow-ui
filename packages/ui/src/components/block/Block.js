import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';

const BLOCK_CLASS = `${UI_PREFIX}__block`;
const BLOCK_SEPARATED_CLASS = `${UI_PREFIX}__block--separated`;
const BLOCK_PADDED_CLASS = `${UI_PREFIX}__block--padded`;
const BLOCK_ROUNDED_CLASS = `${UI_PREFIX}__block--rounded`;
const BLOCK_OUTSTANDING_CLASS = `${UI_PREFIX}__block--outstanding`;
const BLOCK_CONTENT_CENTERED_CLASS = `${UI_PREFIX}__block--content-centered`;
const BLOCK_TITLE_CLASS = `${UI_PREFIX}__block__title`;

export function Block({
    children,
    title = '',
    titleProps = {},
    className = '',
    separated = true,
    padded = true,
    rounded = true,
    outstanding = false,
    contentCentered = false,
    blockRef,
    ...rest
}) {
    const separatedClass = separated ? BLOCK_SEPARATED_CLASS : '';
    const paddedClass = padded ? BLOCK_PADDED_CLASS : '';
    const roundedClass = rounded ? BLOCK_ROUNDED_CLASS : '';
    const outstandingClass = outstanding ? BLOCK_OUTSTANDING_CLASS : '';
    const contentCenteredClass = contentCentered ? BLOCK_CONTENT_CENTERED_CLASS : '';
    const propertiesClass = `${separatedClass} ${paddedClass} ${roundedClass} ${outstandingClass} ${contentCenteredClass}`;
    const blockClassName = `${BLOCK_CLASS} ${className} ${propertiesClass}`;

    const { className: titleClassName = '', ...restTitleProps } = titleProps;
    const titleClass = `${BLOCK_TITLE_CLASS} ${titleClassName}`.trim();
    return (
        <div className={blockClassName} ref={blockRef} {...rest}>
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

Block.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /** Set a title for the block with h2 tag */
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /** Set props that will be added to the title */
    titleProps: PropTypes.object,
    className: PropTypes.string,
    /** Adds a margin to the block */
    separated: PropTypes.bool,
    /** Adds padding to the block */
    padded: PropTypes.bool,
    /** Makes the border rounded */
    rounded: PropTypes.bool,
    /** Adds a shadow to make block outstanding */
    outstanding: PropTypes.bool,
    /** Centers the content */
    contentCentered: PropTypes.bool,
    /** Set the `ref` prop of the container */
    blockRef: PropTypes.object,
};
