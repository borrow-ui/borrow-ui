export interface ToggleProps extends React.ComponentPropsWithRef<React.ElementType> {
    /** Function called when the toggle is clicked */
    onClick: (newToggleStatus: boolean) => void;
    /** Function called when the toggle is clicked (to keep same prop of other fields) */
    onChange: (newToggleStatus: boolean) => void;
    checked?: boolean;
    disabled?: boolean;
    className?: string;
}
