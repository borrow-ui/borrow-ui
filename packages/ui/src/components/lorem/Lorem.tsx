import React from 'react';

import { Text } from '../text/Text';
import { LoremProps } from './Lorem.types';

export const Lorem = ({ paragraphs = 2 }: LoremProps): JSX.Element => {
    return (
        <>
            {paragraphs >= 1 && (
                <Text tag="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas semper leo
                    ac porta. Integer metus urna, lacinia vitae purus et, pharetra auctor purus.
                    Vivamus bibendum id lacus sit amet faucibus.
                </Text>
            )}
            {paragraphs >= 2 && (
                <Text tag="p">
                    Etiam tortor orci, varius at massa ut, tristique suscipit lorem. Nullam vel
                    metus ex. Morbi vitae mauris volutpat erat commodo ultricies at ac magna. Cras
                    condimentum id magna vitae blandit. Vestibulum auctor, magna porta sollicitudin
                    egestas, elit quam interdum massa, consequat sollicitudin dui felis nec massa.
                    Nullam aliquet velit eget metus placerat tempus. Duis eu dapibus elit, et luctus
                    odio. In velit lorem, sagittis eu sapien in, varius varius ipsum. Nunc tempor
                    rhoncus aliquam. Nulla facilisis lobortis vulputate. Etiam sodales enim sit amet
                    auctor suscipit. Mauris eget augue magna. Pellentesque id magna lectus.
                </Text>
            )}
            {paragraphs >= 3 && (
                <Text tag="p">
                    Sed sed odio sapien. Aliquam feugiat nisi eget enim porttitor tristique. Aliquam
                    faucibus gravida eros sit amet euismod. Etiam at dolor ac ipsum sagittis
                    venenatis et quis dui. Praesent eros diam, maximus quis tellus ut, sodales
                    vestibulum dui. Phasellus a ipsum ex. Ut sit amet aliquam ligula, et pharetra
                    diam. Nam id enim nisi. Pellentesque eget efficitur leo. Praesent vel nibh
                    augue. Vestibulum et magna quam. Fusce id auctor libero, sed cursus sem.
                    Phasellus maximus eleifend erat. Proin sollicitudin, tellus non consectetur
                    maximus, lectus est tincidunt arcu, ornare pharetra ex mauris in tortor.
                </Text>
            )}
        </>
    );
};
