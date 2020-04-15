import { useEffect, useState } from 'react';

export function useRefHash() {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const [refHash, setRefHash] = useState(hash.split('?')[0].substr(1));

    useEffect(() => {
        setRefHash(hash.split('?')[0].substr(1));
    }, [hash]);

    return refHash;
}

export function useAnchor() {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';

    useEffect(() => {
        if (!hash) return;
        const refHash = hash.split('?')[0].substr(1);
        const element = document.querySelector(`[name='${refHash}']`);
        if (element) element.scrollIntoView();
    }, [hash]);
}
