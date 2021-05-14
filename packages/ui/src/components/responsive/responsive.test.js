import React from 'react';
import { render, screen } from '@testing-library/react';

import { Responsive, DEFAULT_QUERIES } from './Responsive';

describe('Responsive', () => {
    test('renders with default queries', () => {
        const originalMatchMedia = global.matchMedia;

        global.matchMedia = (media) => {
            return {
                addListener: () => {},
                removeListener: () => {},
                matches: media === DEFAULT_QUERIES.small,
            };
        };

        render(
            <Responsive>
                {(matches) => (
                    <div className={matches.small ? 'small' : matches.medium ? 'medium' : 'big'}>
                        Test content small
                    </div>
                )}
            </Responsive>
        );
        expect(screen.getByText('Test content small')).toHaveClass('small');

        global.matchMedia = (media) => {
            return {
                addListener: () => {},
                removeListener: () => {},
                matches: media === DEFAULT_QUERIES.medium,
            };
        };

        render(
            <Responsive>
                {(matches) => (
                    <div className={matches.small ? 'small' : matches.medium ? 'medium' : 'big'}>
                        Test content medium
                    </div>
                )}
            </Responsive>
        );

        expect(screen.getByText('Test content medium')).toHaveClass('medium');

        global.matchMedia = (media) => {
            return {
                addListener: () => {},
                removeListener: () => {},
                matches: media === DEFAULT_QUERIES.large,
            };
        };

        render(
            <Responsive>
                {(matches) => (
                    <div className={matches.small ? 'small' : matches.medium ? 'medium' : 'big'}>
                        Test content big
                    </div>
                )}
            </Responsive>
        );

        expect(screen.getByText('Test content big')).toHaveClass('big');

        global.matchMedia = originalMatchMedia;
    });

    test('renders with a custom query', () => {
        const originalMatchMedia = global.matchMedia;

        global.matchMedia = (media) => {
            return {
                addListener: () => {},
                removeListener: () => {},
                matches: media === '(min-width: 300px)',
            };
        };

        render(
            <Responsive query="(min-width: 300px)">
                {() => <div className={'visible'}>I am visible</div>}
            </Responsive>
        );
        expect(screen.getByText('I am visible')).toHaveClass('visible');

        global.matchMedia = (media) => {
            return {
                addListener: () => {},
                removeListener: () => {},
                matches: media === '(min-width: 500px)',
            };
        };

        render(
            <Responsive query="(min-width: 300px)">
                {(match) => {
                    return match && <div className={'invisible'}>I am invisible</div>;
                }}
            </Responsive>
        );
        expect(screen.queryByText('I am invisible')).not.toBeInTheDocument();

        global.matchMedia = originalMatchMedia;
    });
});
