/**
 * NOTES: React Testing Library and jest-dom combination
 *  does not allow to test elements appearing or disappearing.
 *  https://github.com/testing-library/react-testing-library/issues/671
 */

import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Page } from './Page';
import { UI_PREFIX } from '../../config';

describe('Page', () => {
    test('renders', () => {
        render(
            <Page
                title="My Page"
                pageHeaderProps={{ className: 'header-class', 'data-testid': 'header' }}
                className="page-class"
                data-testid="page"
            >
                The Content
            </Page>
        );

        const page = screen.getByTestId('page');
        expect(page).toHaveClass(`${UI_PREFIX}__page`);
        expect(page).toHaveClass(`page-class`);
        const header = screen.getByTestId('header');
        expect(header).toHaveClass(`${UI_PREFIX}__page__header`);
        expect(header).toHaveClass(`header-class`);
        const title = screen.getByText('My Page');
        expect(title).toHaveClass(`${UI_PREFIX}__page__header__title`);
    });

    test('renders with readableContent and Header controls', () => {
        const originalMatchMedia = global.matchMedia;

        // @ts-ignore
        global.matchMedia = (media) => {
            return {
                addListener: () => {},
                removeListener: () => {},
                matches: media === '(min-width: 600px)',
            };
        };

        const followMeRef = {
            current: {
                getBoundingClientRect: () => ({
                    y: 200,
                    height: 50,
                }),
            },
        };
        render(
            <Page
                title="My Page"
                pageHeaderProps={{
                    controls: <button>Add something</button>,
                    'data-testid': 'header',
                }}
                pageBodyProps={{
                    'data-testid': 'body',
                }}
                readableContent={true}
                // @ts-ignore
                headerVisibleFollowRef={followMeRef}
                data-testid="page"
            >
                The Content
            </Page>
        );

        const page = screen.getByTestId('page');
        expect(page).toHaveClass(`${UI_PREFIX}__page`);
        const header = screen.getByTestId('header');
        expect(header).toHaveClass(`${UI_PREFIX}__page__header--readable-content`);
        expect(screen.queryByRole('button', { name: 'Add something' })).toBeInTheDocument();
        const body = screen.getByTestId('body');
        expect(body).toHaveClass(`${UI_PREFIX}__page__body--readable-content`);

        // Mock scrollTop, as jest-dom  does not update it
        body.scrollTop = 100;

        // Scroll the body
        fireEvent.scroll(body, { target: { scrollY: 100 } });

        expect(screen.getByTestId('header')).toHaveClass(`${UI_PREFIX}__page__header--with-shadow`);
        expect(screen.getByTestId('header')).toHaveClass(
            `${UI_PREFIX}__page__header--tracker-is-visible`
        );

        // scroll again
        fireEvent.scroll(body, { target: { scrollY: 200 } });
        expect(screen.getByTestId('header')).toHaveClass(`${UI_PREFIX}__page__header--with-shadow`);
        expect(screen.getByTestId('header')).toHaveClass(
            `${UI_PREFIX}__page__header--tracker-is-visible`
        );

        // scroll to top
        body.scrollTop = 0;
        followMeRef.current = {
            getBoundingClientRect: () => ({
                y: -200,
                height: 50,
            }),
        };

        fireEvent.scroll(body, { target: { scrollY: 0 } });
        expect(screen.getByTestId('header')).not.toHaveClass(
            `${UI_PREFIX}__page__header--with-shadow`
        );
        expect(screen.getByTestId('header')).toHaveClass(
            `${UI_PREFIX}__page__header--tracker-is-not-visible`
        );

        global.matchMedia = originalMatchMedia;
    });

    test('renders Header controls as overlay on small screen', async () => {
        const originalMatchMedia = global.matchMedia;

        // @ts-ignore
        global.matchMedia = (media) => {
            return {
                addListener: () => {},
                removeListener: () => {},
                matches: media === '(max-width: 599px)',
            };
        };

        const { container } = render(
            <Page
                title="My Page"
                pageHeaderProps={{
                    controls: <button>Add something</button>,
                    'data-testid': 'header',
                }}
                pageBodyProps={{
                    'data-testid': 'body',
                }}
                data-testid="page"
            >
                The Content
            </Page>
        );

        expect(container.querySelector(`.${UI_PREFIX}__reference-overlay`)).not.toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );

        // Click on the icon to show the controls
        await act(async () => {
            await userEvent.click(screen.queryAllByRole('button')[0]);
        });

        expect(container.querySelector(`.${UI_PREFIX}__reference-overlay`)).toHaveClass(
            `${UI_PREFIX}__reference-overlay--visible`
        );

        global.matchMedia = originalMatchMedia;
    });

    test('renders title and children without page body and continuousScroll ', () => {
        render(
            <Page title="My Page" usePageBody={false} continuousScroll={true} data-testid="page">
                <div data-testid="content">The Content</div>
            </Page>
        );

        const page = screen.getByTestId('page');
        expect(page).toHaveClass(`${UI_PREFIX}__page`);
        expect(page).toHaveClass(`${UI_PREFIX}__page--continuous-scroll`);
        expect(screen.queryByTestId('content')).toBeInTheDocument();
    });
});
