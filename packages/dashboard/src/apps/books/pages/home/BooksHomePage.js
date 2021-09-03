import { useContext } from 'react';

import { Breadcrumbs, Page } from '@borrow-ui/ui';

import { storeContext } from 'store';

export function BooksHomePage() {
    const { store } = useContext(storeContext);

    return (
        <Page
            title={
                <>
                    <Breadcrumbs breadcrumbs={[{ link: '/', label: 'Home' }]} />
                    Books Home
                </>
            }
        >
            Books home will be here, with all your {Object.keys(store).length} books!
        </Page>
    );
}
