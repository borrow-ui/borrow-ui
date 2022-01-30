import { useState, useEffect, useRef } from 'react';

import { UseHoverType } from './useHover.types';

export function useHover(): UseHoverType {
    const [value, setValue] = useState(false);

    const ref: React.RefObject<HTMLElement> | null = useRef<HTMLElement>(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);

                return () => {
                    node.removeEventListener('mouseover', handleMouseOver);
                    node.removeEventListener('mouseout', handleMouseOut);
                };
            }
        },
        [] // Recall only if ref changes
    );

    return [ref, value];
}
