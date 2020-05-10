import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import { Block, Link, Monospace } from '@borrow-ui/ui';

export function Links() {
    const location = useLocation();

    return (
        <Block>
            <div className="singlepage__links">
                <Link className="m-10">A link without href</Link>
                <Link className="m-10" href={location.pathname}>
                    a link with href
                </Link>
                <Link className="m-10" tag={RouterLink} to={location.pathname} underline={false}>
                    a link with no underline and <Monospace>react-router-dom</Monospace> Link
                </Link>
                .
            </div>
        </Block>
    );
}
