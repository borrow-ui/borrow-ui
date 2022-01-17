import { TagType } from '../../../utils/sharedTypes';
import {
    FieldLabelAlignmentType,
    FieldLayoutType,
    FieldVerticalAlignmentType,
} from '../constants.types';

export interface LabelProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    label: React.ReactNode;
    required?: boolean;
    layout?: FieldLayoutType;
    width?: string | number;
    tag?: TagType;
    htmlFor?: string;
    alignment?: FieldLabelAlignmentType;
    vAlignment?: FieldVerticalAlignmentType;
    className?: string;
    style?: React.CSSProperties;
}
