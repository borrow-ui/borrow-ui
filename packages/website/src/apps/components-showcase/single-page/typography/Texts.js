import React from 'react';

import { Block, Text, Monospace } from '@borrow-ui/ui';

export function Texts() {
    return (
        <Block>
            <Text>
                Normal text with <Monospace>Text</Monospace> component.
            </Text>
            <Text size="big">
                Big text by using <Monospace>{'size="big"'}</Monospace>
            </Text>
            <Text size="small">
                Small text by using <Monospace>{'size="small"'}</Monospace>
            </Text>
            <Monospace>Monospace text with Monospace component.</Monospace>
        </Block>
    );
}
