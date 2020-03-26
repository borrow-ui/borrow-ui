import React from 'react';

import { Breadcrumbs, PageHeader } from '@borrow-ui/ui/lib';

import './breadcrumbs.scss';

export function BreadcrumbsComponent() {
    const ACCOUNTS_BREADCRUMBS = [
        { link: '/', label: 'Home' },
        { link: '/', label: 'Settings' },
        { link: '/', label: 'Accounts' },
    ];
    return (
        <div className="m-b-20">
            <h1>Breadcrumbs</h1>
            <div className="singlepage__breadcrumbs">
                <PageHeader>
                    <Breadcrumbs breadcrumbs={ACCOUNTS_BREADCRUMBS} />
                    Add Account
                </PageHeader>
            </div>
        </div>
    );
}
