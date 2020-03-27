import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';

// import 'style/components/block/block.scss';

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

    return (
        <div className={blockClassName} ref={blockRef} {...rest}>
            {title && typeof title === 'string' && (
                <h2 className={`${titleClassName} ${BLOCK_TITLE_CLASS}`} {...restTitleProps}>
                    {title}
                </h2>
            )}
            {title && typeof title !== 'string' && { title }}
            {children}
        </div>
    );
}

Block.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    titleProps: PropTypes.object,
    className: PropTypes.string,
    separated: PropTypes.bool,
    padded: PropTypes.bool,
    rounded: PropTypes.bool,
    outstanding: PropTypes.bool,
    contentCentered: PropTypes.bool,
    blockRef: PropTypes.object,
};
