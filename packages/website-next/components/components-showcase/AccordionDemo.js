import React from 'react';

import { Title, Accordion, Lorem, AccordionGroup } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function AccordionDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="accordions" className="component-anchor">
                <Title tag="h2" className="color-secondary m-t-0">
                    Accordions
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Accordion, AccordionGroup } from '@borrow-ui/ui';"
                docs="?path=/docs/components-accordion--default-story"
            />

            <Accordion title="I am an accordion">
                <div className="p-20">
                    <Lorem />
                </div>
            </Accordion>
            <Accordion title="I am initially open" initialOpen={true}>
                <div className="p-20">
                    <Lorem />
                </div>
            </Accordion>
            <Title tag="h4" className="color-accent">
                Accordion Group
            </Title>
            <div>Accordion Group limits the number of open accordions to one.</div>
            <AccordionGroup>
                <Accordion title="Accordion 1">
                    <Lorem />
                </Accordion>
                <Accordion title="Accordion 2">
                    <Lorem />
                </Accordion>
                <Accordion title="Accordion 3">
                    <Lorem />
                </Accordion>
            </AccordionGroup>
        </div>
    );
}
