import { Fragment } from 'react';
import PropTypes from 'prop-types';

const newlineRegex = /(\r\n|\r|\n)/g;

export function MultiLineText({ text }) {
    if (!text) return '';

    return (
        <>
            {text.split(newlineRegex).map((line, key) => {
                if (line.match(newlineRegex)) return null;
                return (
                    <Fragment key={key}>
                        {line}
                        <br />
                    </Fragment>
                );
            })}
        </>
    );
}

MultiLineText.propTypes = {
    text: PropTypes.string,
};
