import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from 'config';
import { propTypesChildren } from 'utils/types';

// import 'style/components/page/page_body.scss';

const PAGE_BODY_CLASS = `${UI_PREFIX}__page__body`;
const PAGE_BODY_WITH_HEADER_CLASS = `${UI_PREFIX}__page__body--with-page-header`;

export function PageBody({ children, withPageHeader, className = '', pageBodyRef, ...rest }) {
    const bodyClass = `${PAGE_BODY_CLASS} ${withPageHeader ? PAGE_BODY_WITH_HEADER_CLASS : ''} ${className}`;

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
    children: propTypesChildren,
};
