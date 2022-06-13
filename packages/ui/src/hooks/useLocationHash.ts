import { useEffect, useState } from 'react';

export function useLocationHash(): string {
    /**
     * Returns location.hash if on client, or '' when on SSR
     */
    // Ignore the line, check done for SSR
    // istanbul ignore next
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const [locationHash, setLocationHash] = useState(hash.split('?')[0].substring(1));

    useEffect(() => {
        setLocationHash(hash.split('?')[0].substring(1));
    }, [hash]);

    return locationHash;
}
