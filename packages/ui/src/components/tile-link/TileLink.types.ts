import { IconProps, IconFamilyType } from '../icon/Icon.types';

export interface TileLinkProps {
    className?: string;
    /** Used to populate `to` prop of Link component. */
    to?: string;
    /** Used to populate `href` prop of Link component. */
    href?: string;
    /** Icon name. */
    icon: string;
    /** Overrides default icon family. */
    iconFamily?: IconFamilyType;
    /** Name of the Tile. */
    name?: React.ReactNode;
    /** Description of the Tile. */
    description?: React.ReactNode;
    /** Defines how big the Tile is. */
    size?: 'small' | 'big';
    /** Overrides Icon props. */
    iconProps: IconProps;
}
