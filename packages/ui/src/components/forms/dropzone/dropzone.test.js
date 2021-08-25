import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../../config';

import { Dropzone } from './Dropzone';

describe('Dropzone', () => {
    test('renders and can be changed', async () => {
        const onDrop = jest.fn();
        const onFilesChanges = jest.fn();
        const onFileRemove = jest.fn();

        render(
            <Dropzone
                onDrop={onDrop}
                onFileRemove={onFileRemove}
                onFilesChanges={onFilesChanges}
                inputProps={{ 'data-testid': 'dropzone-input' }}
            />
        );

        const file1 = new File(['the content'], 'test.txt', { type: 'text/plain' });
        const inputEl = screen.getByTestId('dropzone-input');

        Object.defineProperty(inputEl, 'files', {
            value: [file1],
            writable: true,
        });
        fireEvent.drop(inputEl);
        expect(await screen.findByText('test.txt')).toBeInTheDocument();

        // onDrop is called with right arguments
        expect(onDrop.mock.calls[0][0][0]).toBe(file1);
        const secondArg = onDrop.mock.calls[0][1];
        expect(secondArg.files.length).toBe(1);
        expect(secondArg.files[0]).toBe(file1);
        expect(secondArg.lastChangeReason).toBe('add');

        // onFilesChanges is called as well
        expect(onFilesChanges).toBeCalledTimes(1);
        expect(onFilesChanges.mock.calls[0][0].lastChangeReason).toBe('add');

        // another file, normal upload
        const file2 = new File([':)'], 'avatar.png', { type: 'image/png' });
        inputEl.files = [file2];
        //userEvent.upload(inputEl, file2);
        fireEvent.drop(inputEl);
        expect(await screen.findByText('avatar.png')).toBeInTheDocument();

        // onFilesChanged is called again
        expect(onFilesChanges).toBeCalledTimes(2);
        expect(onFilesChanges.mock.calls[1][0].lastChangeReason).toBe('add');

        // remove the first file
        const delete1 = screen.getAllByText('×')[0];
        userEvent.click(delete1);

        expect(await screen.queryByText('test.txt')).not.toBeInTheDocument();

        // onFileRemove should have been called once with right arguments
        expect(onFileRemove.mock.calls[0][0]).toBe(file1);
        expect(onFileRemove.mock.calls[0][1].files.length).toBe(1);
        expect(onFileRemove.mock.calls[0][1].files[0]).toBe(file2);
        expect(onFileRemove.mock.calls[0][1].lastChangeReason).toBe('remove');

        // onFilesChanged is called again
        await waitFor(() => expect(onFilesChanges).toBeCalledTimes(3));
        expect(onFilesChanges.mock.calls[2][0].lastChangeReason).toBe('remove');
    });
    test('renders with appropriate classes', () => {
        render(
            <Dropzone
                className="additional-class"
                data-testid="dropzone"
                dropAreaProps={{ 'data-testid': 'dropzone-drop-area' }}
                initialFiles={[{ name: 'File 1' }]}
            />
        );

        const dropzone = screen.getByTestId('dropzone');
        expect(dropzone).toHaveClass(`${UI_PREFIX}__form__dropzone`);
        expect(dropzone).toHaveClass(`additional-class`);

        const dropArea = screen.getByTestId('dropzone-drop-area');
        expect(dropArea).toHaveClass(`${UI_PREFIX}__form__dropzone__drop-area`);

        const file1 = screen.getByText('File 1');
        expect(file1).toHaveClass(`${UI_PREFIX}__form__dropzone__files__file__name`);

        const dropAreaMessage = screen.getByText(/Drop the/);
        expect(dropAreaMessage).toHaveClass(`${UI_PREFIX}__form__dropzone__message`);
        // by default, inactive
        expect(dropAreaMessage).toHaveClass(`${UI_PREFIX}__form__dropzone__message--inactive`);
    });

    test('renders a disabled message and cannot be changed if disabled', () => {
        const onDrop = jest.fn();
        const onFilesChanges = jest.fn();
        const onFileRemove = jest.fn();

        render(
            <Dropzone
                disabled={true}
                disabledMessage="No upload available"
                onDrop={onDrop}
                onFileRemove={onFileRemove}
                onFilesChanges={onFilesChanges}
                inputProps={{ 'data-testid': 'dropzone-input' }}
                initialFiles={[{ name: 'image.png' }]}
            />
        );

        expect(screen.getByText(/No upload available/)).toBeInTheDocument();
        expect(screen.queryByTestId('dropzone-input')).not.toBeInTheDocument();

        // remove the first file
        const delete1 = screen.getAllByText('×')[0];
        userEvent.click(delete1);

        // onFileRemove should not have been called
        expect(onFileRemove).toHaveBeenCalledTimes(0);
        expect(onFilesChanges).toHaveBeenCalledTimes(0);
    });

    test('cannot add more than maxFiles', async () => {
        render(
            <Dropzone
                inputProps={{ 'data-testid': 'dropzone-input' }}
                initialFiles={[{ name: 'was-here.txt' }]}
                maxFiles={2}
            />
        );

        const file1 = new File(['the content'], 'test.txt', { type: 'text/plain' });
        const inputEl = screen.getByTestId('dropzone-input');

        Object.defineProperty(inputEl, 'files', {
            value: [file1],
            writable: true,
        });
        fireEvent.drop(inputEl);
        expect(await screen.findByText('test.txt')).toBeInTheDocument();

        // no more input
        expect(screen.queryByTestId('dropzone-input')).not.toBeInTheDocument();

        // remove the first file
        const delete1 = screen.getAllByText('×')[0];
        userEvent.click(delete1);

        // input now in the DOM
        expect(screen.queryByTestId('dropzone-input')).toBeInTheDocument();
    });
});
