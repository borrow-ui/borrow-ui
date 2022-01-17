import { TagType } from '../../../utils/sharedTypes';

type FileType = { name: string };
type OnRemoveType = (fileIndex: number) => void;

export interface IDropzoneState {
    files: Array<FileType>;
    lastChangeReason: null | string;
}

export interface DropzoneProps {
    className?: string;
    /** Message displayed in the Drop area */
    dragMessage?: React.ReactNode;
    /** Message displayed in the Drop area when a file is dragged into it (before dropping) */
    dragActiveMessage?: React.ReactNode;
    /** Message displayed int he Drop area when dragging in not active */
    dragInactiveMessage?: React.ReactNode;
    /** Initial list of files, where each object requires the following keys:
     *
     * - `name`: the name of the file
     */
    initialFiles?: Array<FileType>;
    /** Maximum number of files */
    maxFiles?: number;
    disabled?: boolean;
    /** Message shown when the field is disabled */
    disabledMessage?: React.ReactNode;
    /** Function called when a file is dropped in the drop area */
    onDrop?: (
        acceptedFiles: Array<FileType>,
        newState?: IDropzoneState,
        setState?: React.Dispatch<React.SetStateAction<IDropzoneState>>
    ) => void;
    /** Callback called when a file is removed */
    onFileRemove?: (
        acceptedFiles: FileType,
        newState?: IDropzoneState,
        setState?: React.Dispatch<React.SetStateAction<IDropzoneState>>
    ) => void;
    /** Callback called when the list of file is changed (either for files added or removed) */
    onFilesChanges?: (
        newState: IDropzoneState,
        setState?: React.Dispatch<React.SetStateAction<IDropzoneState>>
    ) => void;
    /** Props passed to the dropzone drop area, which contains also the input element */
    dropAreaProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Props passed to the hidden input */
    inputProps?: React.HTMLAttributes<HTMLInputElement>;
    /** Component used to replace the default File representation in the list of files (see `DropzoneFile` props) */
    FileComponent?: TagType;
}

export interface DropzoneFilesProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    dropzoneState: {
        files: Array<FileType>;
    };
    onRemove?: OnRemoveType;
    FileComponent?: TagType;
    disabled?: boolean;
    className?: string;
}

export interface DropzoneFileProps {
    file: FileType;
    fileIndex: number;
    onRemove?: OnRemoveType;
    disabled?: boolean;
}
