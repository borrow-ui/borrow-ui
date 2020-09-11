import { LAYOUTS } from './constants';

import { Checkbox } from './checkbox/Checkbox';
import { DatePicker } from './date-picker/DatePicker';
import { Dropzone } from './dropzone/Dropzone';
import { DropzoneFiles, DropzoneFile } from './dropzone/DropzoneFiles';
import { Field, VField, HField } from './field/Field';
import { Input } from './input/Input';
import { Label } from './label/Label';
import { ReactSelect } from './react-select/ReactSelect';
import { Textarea } from './textarea/Textarea';
import { Toggle } from './toggle/Toggle';

export const Forms = {
    Checkbox,
    DatePicker,
    Dropzone,
    DropzoneFiles,
    DropzoneFile,
    Field,
    HField,
    Input,
    Label,
    ReactSelect,
    Select: ReactSelect,
    Textarea,
    Toggle,
    VField,
    LAYOUTS,
};
