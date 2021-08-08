import React, { Fragment, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { SidebarMenu, Forms } from '@borrow-ui/ui';

import styles from './itemsNavigator.module.scss';

const { Select } = Forms;

function ItemEntry({ href, label, active }) {
    return (
        <SidebarMenu.Entry tag="a" href={href} isActive={href === active}>
            {label}
        </SidebarMenu.Entry>
    );
}

export function ItemsNavigator({ itemsGroups, active }) {
    return (
        <div className={styles['items-navigator']}>
            <SidebarMenu padded={true}>
                {itemsGroups.map(({ items, label }) => {
                    return (
                        <Fragment key={label}>
                            <SidebarMenu.Title>{label}</SidebarMenu.Title>
                            {items.map((item) => {
                                return (
                                    <ItemEntry
                                        href={item.href}
                                        label={item.label}
                                        active={active}
                                        key={item.href}
                                    />
                                );
                            })}
                        </Fragment>
                    );
                })}
            </SidebarMenu>
        </div>
    );
}

ItemsNavigator.propTypes = {
    itemsGroups: PropTypes.array.isRequired,
    // TODO: implement active
    active: PropTypes.string,
};

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = (data) => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

function goToAnchor(href) {
    window.location = ('' + window.location).replace(/#[A-Za-z0-9_]*$/, '') + href;
}

export function ItemsNavigatorSelect({ itemsGroups, active }) {
    const [selected, setSelected] = useState();

    const itemsList = useMemo(() => {
        return itemsGroups.map((itemGroup) => {
            return {
                label: itemGroup.label,
                options: itemGroup.items.map((i) => ({ value: i.href, label: i.label })),
            };
        });
    }, [itemsGroups]);

    return (
        <div className={styles['items-navigator-select']}>
            <Select
                id="items-navigator"
                inputId="items-navigator-input"
                options={itemsList}
                formatGroupLabel={formatGroupLabel}
                value={selected}
                onChange={(e) => {
                    setSelected(e.value);
                    goToAnchor(e.value);
                }}
                placeholder="Select Item..."
            />
        </div>
    );
}

ItemsNavigator.propTypes = {
    itemsGroups: PropTypes.array.isRequired,
    // TODO: implement active
    active: PropTypes.string,
};
