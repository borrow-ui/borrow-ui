import NextLink from 'next/link';

import { Title, SyntaxHighlight, Monospace, Link } from '@borrow-ui/ui';

let languageRe = /(?<=language-).*$/gm;

const titles = {
    h1: function H1(props) {
        return <Title tag="h1" className="color-primary" {...props} />;
    },
    h2: function H2(props) {
        return <Title tag="h2" {...props} />;
    },
    h3: function H3(props) {
        return <Title tag="h3" {...props} />;
    },
    h4: function H4(props) {
        return <Title tag="h4" {...props} />;
    },
    h5: function H5(props) {
        return <Title tag="h5" {...props} />;
    },
    a: function A({ href, ...props }) {
        if (href && href.substr(0, 4) !== 'http')
            return (
                <NextLink href={href}>
                    <Link tag="a" {...props} />
                </NextLink>
            );
        return <Link tag="a" href={href} {...props} />;
    },
};

function Code(props) {
    const languageMatches = props.className && props.className.match(languageRe);
    const language = (languageMatches || []).length > 0 ? languageMatches[0] : undefined;
    return <SyntaxHighlight language={language} code={props.children} />;
}

export const providerComponents = {
    code: Code,
    inlineCode: Monospace,
    ...titles,
};
