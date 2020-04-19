import React, { useRef, useEffect } from 'react';
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
            <pre>
                <code ref={codeRef} className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        </div>
    );
}
