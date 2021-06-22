import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export function GroupLines({ n = 1, lines = 2 }) {
    const extraLines = [];
    for (let line = 2; line <= lines; line++)
        extraLines.push(
            <Fragment key={line}>
                <br />
                Line {line + 2}
            </Fragment>
        );

    return (
        <>
            Group {n}
            {extraLines}
        </>
    );
}

GroupLines.propTypes = {
    n: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lines: PropTypes.number,
};
