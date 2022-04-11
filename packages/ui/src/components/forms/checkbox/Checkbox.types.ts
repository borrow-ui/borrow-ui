import { LabelProps } from '../label/Label.types';

export interface CheckboxProps extends React.ComponentPropsWithRef<React.ElementType> {
    className?: string;
    /** Handler executed when the checkbox container is clicked. Normally, it toggles the value */
    onClick?: (newCheckedStatus: boolean) => void;
    /** Alternative to onClick, to have the same prop of ther form fields */
    onChange?: (newCheckedStatus: boolean) => void;
    checked?: boolean;
    disabled?: boolean;
    /** Checkbox own label */
    label?: React.ReactNode;
    labelProps?: LabelProps;
}
