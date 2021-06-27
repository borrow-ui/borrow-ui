import { useEffect, useState } from 'react';

export function useLocationHash() {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const [locationHash, setLocationHash] = useState(hash.split('?')[0].substr(1));

    useEffect(() => {
        setLocationHash(hash.split('?')[0].substr(1));
    }, [hash]);

    return locationHash;
}
