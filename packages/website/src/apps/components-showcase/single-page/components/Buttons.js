import React from 'react';

import { Block, Button } from '@borrow-ui/ui/lib';

export function Buttons() {
    return (
        <Block>
            <div className="flex-start-center flex--wrap m-b-20">
                <Button onClick={() => window.alert('test')} className="m-r-20 m-b-10">
                    Regular
                </Button>
                <Button
                    disabled={true}
                    onClick={() => window.alert('test')}
                    className="m-r-20 m-b-10"
                >
                    Disabled
                </Button>
                <Button
                    mean="primary"
                    onClick={() => window.alert('primary')}
                    className="m-r-20 m-b-10"
                >
                    Primary
                </Button>
                <Button
                    mean="primary"
                    disabled={true}
                    onClick={() => window.alert('primary disabled')}
                    className="m-r-20 m-b-10"
                >
                    Disabled
                </Button>
                <Button
                    mean="accent"
                    onClick={() => window.alert('accent')}
                    className="m-r-20 m-b-10"
                >
                    Accent
                </Button>
                <Button
                    mean="accent"
                    disabled={true}
                    onClick={() => window.alert('accent disabled')}
                    className="m-r-20 m-b-10"
                >
                    Disabled
                </Button>
            </div>
            <div className="flex-start-center flex--wrap m-b-20">
                <Button
                    mean="positive"
                    onClick={() => window.alert('positive clicked')}
                    className="m-r-20 m-b-10"
                >
                    Positive
                </Button>
                <Button
                    mean="positive"
                    disabled={true}
                    onClick={() => window.alert('positive')}
                    className="m-r-20 m-b-10"
                >
                    Disabled
                </Button>
                <Button
                    mean="warning"
                    onClick={() => window.alert('warning')}
                    className="m-r-20 m-b-10"
                >
                    Warning
                </Button>
                <Button
                    mean="warning"
                    disabled={true}
                    onClick={() => window.alert('warning disabled')}
                    className="m-r-20 m-b-10"
                >
                    Disabled
                </Button>
                <Button
                    mean="negative"
                    onClick={() => window.alert('negative')}
                    className="m-r-20 m-b-10"
                >
                    Negative
                </Button>
                <Button
                    mean="negative"
                    disabled={true}
                    onClick={() => window.alert('negative disabled')}
                    className="m-r-20 m-b-10"
                >
                    Disabled
                </Button>
            </div>
            <div className="flex-start-center flex--wrap m-b-20">
                <Button mean="primary" className="m-r-20 m-b-10" flat={true}>
                    Flat
                </Button>
                <Button mean="accent" className="m-r-20 m-b-10" icon="dashboard">
                    Icon
                </Button>
            </div>
            <div className="flex-start-center flex--wrap m-b-20">
                <Button mean="primary" className="m-r-20 m-b-10" size="huge">
                    Huge
                </Button>
                <Button mean="primary" className="m-r-20 m-b-10" size="bigger">
                    Bigger
                </Button>
                <Button mean="primary" className="m-r-20 m-b-10" size="big">
                    Big
                </Button>
                <Button mean="primary" className="m-r-20 m-b-10" size="normal">
                    Normal
                </Button>
                <Button mean="primary" className="m-r-20 m-b-10" size="small">
                    Small
                </Button>
                <Button mean="primary" className="m-r-20 m-b-10" size="smaller">
                    Smaller
                </Button>
            </div>
        </Block>
    );
}
