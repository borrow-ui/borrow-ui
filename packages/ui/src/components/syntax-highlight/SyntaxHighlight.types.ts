export interface SyntaxHighlightProps {
    /** Code to highlight */
    code?: string;
    /** List of plugins to load (depends on what has been imported) */
    plugins?: Array<string>;
    /** Language (depends on what has been imported) */
    language?: string;
    /** Properties passed to `pre` element */
    preProps?: React.HTMLAttributes<HTMLPreElement>;
    /** Properties passed to `code` element */
    codeProps?: React.HTMLAttributes<any>;
    className?: string;
}
