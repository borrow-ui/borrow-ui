import DayPickerInput from 'react-day-picker/types/DayPickerInput';
import { DayModifiers } from 'react-day-picker/types/Modifiers';

export type DatePickerModifiersType = DayModifiers;
export type DatePickerDayPickerInputType = DayPickerInput;

export interface IDatePickerState {
    date?: Date;
    string?: string;
}

export interface DatePickerProps {
    /** Handler called when date is changed. Three args are passed: date, modifiers and dayPickerInput.
     * The date is a string or object, depending on `onDayChangeFormat` prop.
     * For modifiers and dayPickerInput, see
     * [`react-day-picker` documentation](https://react-day-picker.js.org/api/DayPickerInput#onDayChange).
     */
    onDayChange?: (
        date: Date | string | null,
        modifiers?: DatePickerModifiersType,
        dayPickerInput?: DatePickerDayPickerInputType
    ) => void;
    /** Format of the date passed to `onDayChange` handler */
    onDayChangeFormat?: 'date' | 'string';
    /** Date format. For all formats, see
     * [`dayjs` documentation](https://day.js.org/docs/en/parse/string-format).
     */
    format?: string;
    placeholder?: string;
    initialValue?: string;
    /** Return partial strings, i.e. `2020-04-` */
    returnPartial?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    /** Props passed to input field */
    inputProps?: React.HTMLAttributes<HTMLInputElement> & {
        inputStyle?: React.CSSProperties;
    };
    /** Props passed to the overlay wrapper see
     * [documentation](https://react-day-picker.js.org/api/DayPickerInput#overlayComponent)
     */
    overlayWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Props passed to the overlay */
    overlayProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Align the overlay on the right side of the input */
    overlayRightAlign?: boolean;
}

export interface DatePickerOverlayProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children: React.ReactNode;
    classNames: {
        overlayWrapper?: string;
        overlay?: string;
    };
    selectedDay?: Date;
    overlayProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Show the input overlay aligned on the right side of input */
    rightAlign?: boolean;
    className?: string;
}
