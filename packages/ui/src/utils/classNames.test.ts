import { cx } from './classNames';

describe('cx', () => {
    test('generates a valid className string', () => {
        const className = cx('first', { second: true }, 'third', null, undefined, '', 'fourth');
        expect(className).toBe('first second third fourth');
    });

    test('generates a valid className from sub arrays list', () => {
        const className = cx('first', [{ second: true }, 'third', null], '', 'fourth');
        expect(className).toBe('first second third fourth');
    });

    test('generates a valid className empty/falsy list', () => {
        const className = cx('', [{ second: false }, null], undefined);
        expect(className).toBe('');
    });
});
