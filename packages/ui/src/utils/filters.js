function filterPropertyValue(propValue, value, { stringIncludes = true }) {
    /** This function will determine if a property value from
     * one entry should be kept in the list by checking the search value.
     *
     * Options:
     * - `stringIncludes` (boolean): check if the value to search is included in the
     *  property value.
     */
    if (typeof propValue === 'string' && stringIncludes) {
        return propValue.indexOf(value) >= 0;
    }
    return propValue === value;
}

export function filterEntries(entries, values, { stringIncludes = true } = {}) {
    /**
     * Loop over every entry on the list to see if any value to search
     * matches one of the entry values.
     */
    return entries.filter((entry) => {
        const filteredEntryValues = values.filter((value) => {
            const entryValues = Object.values(entry);
            const filteredValues = entryValues.filter((propValue) =>
                filterPropertyValue(propValue, value, { stringIncludes })
            );
            return filteredValues.length > 0;
        });
        return filteredEntryValues.length > 0;
    });
}
