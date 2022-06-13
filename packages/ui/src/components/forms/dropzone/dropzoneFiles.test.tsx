import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../../config';

import { DropzoneFiles } from './DropzoneFiles';
import { DropzoneFileProps } from './Dropzone.types';

describe('DropzoneFiles', () => {
    test('renders', async () => {
        const onRemove = jest.fn();

        const { container } = render(
            <DropzoneFiles
                data-testid="dropzone-files"
                dropzoneState={{ files: [{ name: 'first.txt' }, { name: 'second.txt' }] }}
                onRemove={onRemove}
            />
        );

        expect(screen.getByTestId('dropzone-files')).toHaveClass(
            `${UI_PREFIX}__form__dropzone__files`
        );
        expect(
            container.querySelectorAll(`.${UI_PREFIX}__form__dropzone__files__file`).length
        ).toBe(2);

        // remove the first file
        const delete1 = screen.getAllByText('×')[0];
        await userEvent.click(delete1);

        // onFileRemove should have been called once with right arguments
        expect(onRemove).toHaveBeenCalledWith(0);
    });

    test('renders with a custom FileComponent', async () => {
        const FileComponentCustom = (props: DropzoneFileProps) => {
            return (
                <div>
                    <span>Custom one</span>
                    <span>{props.file.name}</span>
                </div>
            );
        };

        render(
            <DropzoneFiles
                data-testid="dropzone-files"
                dropzoneState={{ files: [{ name: 'first.txt' }, { name: 'second.txt' }] }}
                FileComponent={FileComponentCustom}
            />
        );

        expect(screen.getAllByText('Custom one').length).toBe(2);
        expect(screen.getByText('first.txt')).toBeInTheDocument();
        expect(screen.getByText('second.txt')).toBeInTheDocument();
    });
});
