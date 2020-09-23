import { filterEntries } from './filters';

describe('filterEntries tests', () => {
    it('filter elements based on a partial value', () => {
        const entries = [
            { id: 1, name: 'prop1 test' },
            { id: 2, name: 'prop2 match' },
        ];
        expect(filterEntries(entries, ['match']).length).toEqual(1);
    });
    it('filter elements based on a full string value', () => {
        const entries = [
            { id: 1, name: 'prop1 test' },
            { id: 2, name: 'prop2 match' },
        ];
        expect(filterEntries(entries, ['match'], { stringIncludes: false }).length).toEqual(0);
    });
});
