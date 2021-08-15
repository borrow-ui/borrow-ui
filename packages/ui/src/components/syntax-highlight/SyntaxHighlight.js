import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

import { UI_PREFIX } from '../../config';

const SYNTAX_HIGHLIGHT_CLASS = `${UI_PREFIX}__syntax-highlight`;

export function SyntaxHighlight({
    code,
    plugins = [],
    language = 'jsx',
    className = '',
    preProps = {},
    codeProps = {},
    ...rest
}) {
    const codeRef = useRef(null);
    const [codeClass, setCodeClass] = useState('');

    useEffect(() => {
        setCodeClass(`language-${language}`.trim());
    }, [language]);

    useEffect(() => {
        if (!codeRef || !codeRef.current || !codeClass) return;
        Prism.highlightElement(codeRef.current);
    }, [codeClass, code]);

    const syntaxHighlightClass = `${SYNTAX_HIGHLIGHT_CLASS} ${className}`.trim();

    return (
        <div className={syntaxHighlightClass} {...rest}>
            <pre className={!plugins ? '' : plugins.join(' ')} {...preProps}>
                <code className={codeClass || undefined} ref={codeRef} {...codeProps}>
                    {code}
                </code>
            </pre>
        </div>
    );
}

SyntaxHighlight.propTypes = {
    /** Code to highlight */
    code: PropTypes.string,
    /** List of plugins to load (depends on what has been imported) */
    plugins: PropTypes.array,
    /** Language (depends on what has been imported) */
    language: PropTypes.string,
    /** Properties passed to `pre` element */
    preProps: PropTypes.object,
    /** Properties passed to `code` element */
    codeProps: PropTypes.object,
    className: PropTypes.string,
};
