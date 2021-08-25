import React from 'react';
import PropTypes from 'prop-types';

import styles from './terminal.module.scss';
import { SyntaxHighlight } from '@borrow-ui/ui';

export function Terminal({ title = '', className = '', containerProps = {}, ...rest }) {
    return (
        <div className={`${styles['terminal']} ${className}`.trim()} {...containerProps}>
            <div className={styles['terminal__head']}>
                <div className={styles['terminal__head__buttons']}>
                    <div className={styles['terminal__head__close']} />
                    <div className={styles['terminal__head__maximize']} />
                    <div className={styles['terminal__head__minimize']} />
                </div>
                <div className={styles['terminal__head__title']}>{title}</div>
            </div>
            <div className={styles['terminal__body']}>
                <SyntaxHighlight {...rest} />
            </div>
        </div>
    );
}

Terminal.propTypes = {
    className: PropTypes.string,
    containerProps: PropTypes.object,
};
