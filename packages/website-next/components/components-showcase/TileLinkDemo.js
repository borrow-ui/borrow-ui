import React from 'react';

import { Title, TileLink } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function TileLinkDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="tilelinks" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Tile Links
                </Title>
            </a>
            <ImportStatement
                importStatement="import { TileLink } from '@borrow-ui/ui';"
                docs="?path=/docs/components-tilelink--default-story"
            />
            <div style={{ fontSize: 14 }}>
                <div>
                    <TileLink
                        icon="computer"
                        name="Local"
                        description="Files on this device"
                        size="big"
                        href=""
                    />
                    <TileLink
                        icon="cloud"
                        name="Cloud"
                        description="Your shared data"
                        size="big"
                        href=""
                    />
                </div>
                <div>
                    <TileLink icon="event" name="Today" description="What happens today" href="" />
                    <TileLink
                        icon="group"
                        name="Groups"
                        description="Manage available user groups"
                        href=""
                    />
                    <TileLink
                        icon="person"
                        name="Your Profile"
                        description="Change your profile data"
                        href=""
                    />
                </div>
            </div>
        </div>
    );
}
