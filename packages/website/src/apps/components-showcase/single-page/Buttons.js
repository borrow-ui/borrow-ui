import React from 'react';

import { Button } from '@borrow-ui/ui/lib';

export function Buttons() {
    return (
        <div>
            <h2>Buttons</h2>
            <div style={{ display: 'flex' }} className="m-b-20">
                <Button onClick={() => window.alert('test')} className="m-r-20">
                    Regular
                </Button>
                <Button disabled={true} onClick={() => window.alert('test')} className="m-r-20">
                    Disabled
                </Button>
                <Button mean="primary" onClick={() => window.alert('primary')} className="m-r-20">
                    Primary
                </Button>
                <Button
                    mean="primary"
                    disabled={true}
                    onClick={() => window.alert('primary disabled')}
                    className="m-r-20"
                >
                    Disabled
                </Button>
                <Button mean="accent" onClick={() => window.alert('accent')} className="m-r-20">
                    Accent
                </Button>
                <Button
                    mean="accent"
                    disabled={true}
                    onClick={() => window.alert('accent disabled')}
                    className="m-r-20"
                >
                    Disabled
                </Button>
            </div>
            <div style={{ display: 'flex' }} className="m-b-20">
                <Button
                    mean="positive"
                    onClick={() => window.alert('positive clicked')}
                    className="m-r-20"
                >
                    Positive
                </Button>
                <Button
                    mean="positive"
                    disabled={true}
                    onClick={() => window.alert('positive')}
                    className="m-r-20"
                >
                    Disabled
                </Button>
                <Button mean="warning" onClick={() => window.alert('warning')} className="m-r-20">
                    Warning
                </Button>
                <Button
                    mean="warning"
                    disabled={true}
                    onClick={() => window.alert('warning disabled')}
                    className="m-r-20"
                >
                    Disabled
                </Button>
                <Button mean="negative" onClick={() => window.alert('negative')} className="m-r-20">
                    Negative
                </Button>
                <Button
                    mean="negative"
                    disabled={true}
                    onClick={() => window.alert('negative disabled')}
                    className="m-r-20"
                >
                    Disabled
                </Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }} className="m-b-20">
                <Button mean="primary" className="m-r-20" flat={true}>
                    Flat
                </Button>
                <Button mean="accent" className="m-r-20" icon="dashboard">
                    Icon
                </Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }} className="m-b-20">
                <Button mean="primary" className="m-r-20" size="huge">
                    Huge
                </Button>
                <Button mean="primary" className="m-r-20" size="bigger">
                    Bigger
                </Button>
                <Button mean="primary" className="m-r-20" size="big">
                    Big
                </Button>
                <Button mean="primary" className="m-r-20" size="normal">
                    Normal
                </Button>
                <Button mean="primary" className="m-r-20" size="small">
                    Small
                </Button>
                <Button mean="primary" className="m-r-20" size="smaller">
                    Smaller
                </Button>
            </div>
        </div>
    );
}
