import { Title, SyntaxHighlight, Monospace } from '@borrow-ui/ui';

let languageRe = /(?<=language-).*$/gm;

const titles = {
    h1: function H1(props) {
        return <Title tag="h1" className="color-primary" {...props} />;
    },
    h2: function H2(props) {
        return <Title tag="h2" className="color-primary" {...props} />;
    },
    h3: function H3(props) {
        return <Title tag="h3" className="color-primary" {...props} />;
    },
    h4: function H4(props) {
        return <Title tag="h4" className="color-primary" {...props} />;
    },
    h5: function H5(props) {
        return <Title tag="h5" className="color-primary" {...props} />;
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
