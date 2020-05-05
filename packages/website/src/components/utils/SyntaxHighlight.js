import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

import './syntax-highlight.scss';

export function SyntaxHighlight({ code, plugins = [], language = 'jsx' }) {
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef && codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    });

    return (
        <div className="borrow-ui__syntax-highlight">
            <pre className={!plugins ? '' : plugins.join(' ')}>
                <code ref={codeRef} className={`language-${language}`}>
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
};
