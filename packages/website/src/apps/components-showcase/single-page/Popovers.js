import React from 'react';

import { Button, Popover, Menu, MenuEntry, MenuDivider } from '@borrow-ui/ui/lib';

export function Popovers() {
    return (
        <div className="m-b-20">
            <h1>Popovers</h1>
            <div>
                <Popover trigger={<Button className="m-r-15">Just content (click)</Button>}>
                    Simple content
                </Popover>
                <Popover
                    triggerOn="hover"
                    trigger={
                        <Button mean="primary" className="m-r-15">
                            Content (hover)
                        </Button>
                    }
                    persist={true}
                >
                    <div className="color-white-bg p-10 border-radius-5 w-300">
                        <h3>Free JSX Content</h3>
                        <div>
                            Click on the buttons:
                            <Button
                                className="m-l-5 m-r-5"
                                onClick={() => window.alert('action 1')}
                                size="smaller"
                            >
                                Action 1
                            </Button>
                            <Button
                                className="m-l-5 m-r-5"
                                onClick={() => window.alert('action 2')}
                                size="smaller"
                                mean="negative"
                            >
                                Action 2
                            </Button>
                        </div>
                        <p>Clicking the buttons will trigger their actions.</p>
                        <p>
                            Moving the mouse out will not cause the content to disappear: you need
                            to click outside.
                        </p>
                    </div>
                </Popover>
                <Popover
                    triggerOn="hover"
                    trigger={
                        <Button mean="accent" className="m-r-15">
                            Menu (hover)
                        </Button>
                    }
                >
                    <Menu>
                        <MenuEntry onClick={() => window.alert('Entry 1')}>Entry 1</MenuEntry>
                        <MenuEntry onClick={() => window.alert('Entry 2')}>Entry 2</MenuEntry>
                        <MenuDivider />
                        <MenuEntry onClick={() => window.alert('Entry 3')}>Entry 3</MenuEntry>
                        <MenuEntry disabled={true}>Disabled Entry</MenuEntry>
                    </Menu>
                </Popover>
            </div>
        </div>
    );
}
