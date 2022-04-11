import React, { Fragment } from 'react';

interface GroupLinesProps {
    n?: number;
    lines?: number;
}

export const GroupLines = ({ n = 1, lines = 2 }: GroupLinesProps): JSX.Element => {
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
};
