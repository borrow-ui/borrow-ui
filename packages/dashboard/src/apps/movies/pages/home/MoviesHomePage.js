import { Page, Breadcrumbs, Monospace } from '@borrow-ui/ui';

export function MoviesHomePage() {
    return (
        <Page
            title={
                <>
                    <Breadcrumbs breadcrumbs={[{ link: '/', label: 'Home' }]} />
                    Movies Home
                </>
            }
        >
            This section is a demostration of how to reach a second <Monospace>app</Monospace>.
            <br />
            <br />
            For components demo, see the <Monospace>Books</Monospace> app.
        </Page>
    );
}
