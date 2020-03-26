import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './colors.scss';

export function Colors() {
    return (
        <div className="m-b-20">
            <h1>Colors</h1>
            <div className="singlepage__colors">
                <div className="singlepage__colors__row">
                    <Color color="primary" />
                    <Color color="accent" />
                    <Color color="neutral" />
                    <Color color="positive" />
                    <Color color="warning" />
                    <Color color="negative" />
                </div>
            </div>
        </div>
    );
}

function Color({ color }) {
    const ref = useRef(null);
    const [colorCode, setColorCode] = useState();

    useEffect(() => {
        if (ref && ref.current) {
            setColorCode(window.getComputedStyle(ref.current).getPropertyValue('background-color'));
        }
    }, []);

    const className = `singlepage__colors__color color-${color}-bg color-on-${color}`;
    return (
        <div ref={ref} className={className}>
            <div>{color}</div>
            <div className="singlepage__colors__color__code">{colorCode && rgb2hex(colorCode)}</div>
            <div className="singlepage__colors__color__code">{colorCode && colorCode}</div>
        </div>
    );
}

Color.propTypes = {
    color: PropTypes.string,
};

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    const hexDigits = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
    ];
    return isNaN(x) ? '00' : hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16];
}
