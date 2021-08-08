import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

import { UI_PREFIX } from '../../config';

const SYNTAX_HIGHLIGHT_CLASS = `${UI_PREFIX}__syntax-highlight`;

export function SyntaxHighlight({ code, plugins = [], language = 'jsx', className = '', ...rest }) {
    const codeRef = useRef(null);
    const [highlighted, setHighlighted] = useState(false);
    const [codeClass, setCodeClass] = useState('');

    useEffect(() => {
        setCodeClass(`language-${language}`.trim());
    }, [language]);

    useEffect(() => {
        if (!codeRef || !codeRef.current || !codeClass || highlighted) return;
        Prism.highlightElement(codeRef.current);
        setHighlighted(true);
    }, [highlighted, codeClass]);

    const syntaxHighlightClass = `${SYNTAX_HIGHLIGHT_CLASS} ${className}`.trim();

    return (
        <div className={syntaxHighlightClass} {...rest}>
            <pre className={!plugins ? '' : plugins.join(' ')}>
                <code className={codeClass || undefined} ref={codeRef}>
                    {code}
                </code>
            </pre>
        </div>
    );
}

SyntaxHighlight.propTypes = {
    code: PropTypes.string,
    plugins: PropTypes.array,
    language: PropTypes.string,
    className: PropTypes.string,
};
