import React, { useState } from 'react';

interface FormsStoryWrapperProps {
    initialState?: any;
    children: (props: any) => JSX.Element;
}

export const FormsStoryWrapper = ({
    initialState = {},
    children,
}: FormsStoryWrapperProps): JSX.Element => {
    const [state, setState] = useState(initialState);

    return (
        <div className="borrow-ui">
            <form onSubmit={(e) => e.preventDefault()}>{children({ state, setState })}</form>
        </div>
    );
};
