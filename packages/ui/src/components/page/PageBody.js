import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

// import 'style/components/page/page_body.scss';

const PAGE_BODY_CLASS = `${UI_PREFIX}__page__body`;
const PAGE_BODY_WITH_HEADER_CLASS = `${UI_PREFIX}__page__body--with-page-header`;
const PAGE_BODY_READABLE_CONTENT_CLASS = `${UI_PREFIX}__page__body__readable-content`;

export function PageBody({
    children,
    withPageHeader,
    className = '',
    readableContent = false,
    pageBodyRef,
    ...rest
}) {
    const bodyClass = `${PAGE_BODY_CLASS} ${withPageHeader ? PAGE_BODY_WITH_HEADER_CLASS : ''} ${
        readableContent ? PAGE_BODY_READABLE_CONTENT_CLASS : ''
    }  ${className}`;

    return (
        <div className={bodyClass} ref={pageBodyRef} {...rest}>
            {children}
        </div>
    );
}

PageBody.propTypes = {
    withPageHeader: PropTypes.bool,
    className: PropTypes.string,
    pageBodyRef: PropTypes.object,
    readableContent: PropTypes.bool,
    children: propTypesChildren,
};
