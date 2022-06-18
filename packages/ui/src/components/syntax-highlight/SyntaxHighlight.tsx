import React, { useRef, useEffect, useState } from 'react';
import Prism from 'prismjs';

import { UI_PREFIX } from '../../config';
import { cx } from '../../utils/classNames';
import { SyntaxHighlightProps } from './SyntaxHighlight.types';

const SYNTAX_HIGHLIGHT_CLASS = `${UI_PREFIX}__syntax-highlight`;

export const SyntaxHighlight = ({
    code,
    plugins = [],
    language = 'jsx',
    className = '',
    preProps = {},
    codeProps = {},
    ...rest
}: SyntaxHighlightProps): JSX.Element => {
    const codeRef = useRef(null);
    const [codeClass, setCodeClass] = useState('');

    useEffect(() => {
        setCodeClass(`language-${language}`.trim());
    }, [language]);

    useEffect(() => {
        if (!codeRef || !codeRef.current || !codeClass) return;
        Prism.highlightElement(codeRef.current);
    }, [codeClass, code]);

    const syntaxHighlightClass = cx(SYNTAX_HIGHLIGHT_CLASS, className);

    return (
        <div className={syntaxHighlightClass} {...rest}>
            <pre className={plugins.join(' ')} {...preProps}>
                <code className={codeClass || undefined} ref={codeRef} {...codeProps}>
                    {code}
                </code>
            </pre>
        </div>
    );
};
