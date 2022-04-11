type ReactSelectOptionType = {
    value: any;
    label: string;
    [key: string]: any;
};
type ReactSelectValueType = string | number;

export type MappedOptionsType = {
    [key: string | number]: any;
};

export interface ReactSelectProps extends React.ComponentPropsWithRef<React.ElementType> {
    options: Array<ReactSelectOptionType>;
    /** Current Selected value. Specify the `key` value to select an element from the options. */
    value?: ReactSelectValueType | Array<ReactSelectValueType> | null;
    /** Customize which is the key to be used to determine the value */
    key?: string;
    /** Specifies if the selection is invalid */
    invalid?: boolean;
    /** Allow multiple options to be selected */
    isMulti?: boolean;
    /** Allows to add an option to the list directly from the input */
    creatable?: boolean;
    disabled?: boolean;
    className?: boolean;
}
