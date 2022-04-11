import {
    FieldLabelAlignmentType,
    FieldLayoutType,
    FieldVerticalAlignmentType,
} from '../constants.types';

interface FieldPropsInterface extends React.ComponentPropsWithoutRef<React.ElementType> {
    className?: string;
    label?: React.ReactNode;
    /** Show a description of field value */
    description?: React.ReactNode;
    children?: React.ReactNode;
    required?: boolean;
    /** ID of input element */
    htmlFor?: string;
    /** Label and Field vertical alignment. Default vertical alignment is `'middle'` */
    vAlignment?: FieldVerticalAlignmentType;
    labelWidth?: string | number;
    /** Label alignment (horizontal). Default alignment is `'left'` */
    labelAlignment?: FieldLabelAlignmentType;
    /** Additional props passed to label container */
    labelProps?: React.HTMLAttributes<HTMLLabelElement>;
    /** Additional props passed to controller container */
    controllerProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Additional props passed to description container */
    descriptionProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Do not render the controller if children is falsy */
    compact?: boolean;
}

export interface FieldProps extends FieldPropsInterface {
    /** Layout can be `vertical` or `horizontal`. You can change the constants,
     * as well as `DEFAULT`, to create other types of layout.
     */
    layout?: FieldLayoutType;
}

export interface HFieldProps extends FieldPropsInterface {}

export interface VFieldProps extends FieldPropsInterface {}
