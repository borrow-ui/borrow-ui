import React from 'react';

import { Block, Breadcrumbs, PageHeader } from '@borrow-ui/ui/lib';

import './breadcrumbs.scss';

export function BreadcrumbsComponent() {
    const ACCOUNTS_BREADCRUMBS = [
        { link: '/', label: 'Home' },
        { link: '/', label: 'Settings' },
        { link: '/', label: 'Accounts' },
    ];
    return (
        <Block>
            <div className="singlepage__breadcrumbs">
                <PageHeader>
                    <Breadcrumbs breadcrumbs={ACCOUNTS_BREADCRUMBS} />
                    Add Account
                </PageHeader>
            </div>
        </Block>
    );
}
