import { TagType } from '../../utils/sharedTypes';

export interface TileProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    /** Tile's content */
    children?: React.ReactNode;
    className?: string;
    /** Customize the tag of Tile */
    tag?: TagType;
    /** Description which will appear on the bottom part of the tile */
    description?: React.ReactNode;
    withBackground?: boolean;
}
