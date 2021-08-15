import React from 'react';

import { Title, Card, Icon, Button } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function CardsDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="cards" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Cards
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Card } from '@borrow-ui/ui';"
                docs="?path=/docs/components-card--default-story"
            />
            <div>
                <div className="flex-spacebetween-start flex--wrap">
                    <Card
                        standingHover={true}
                        icon={<Icon name="home" size="big" className="color-primary" />}
                        title="Card sample"
                        subtitle="Subtitle goes here"
                        description="Card can have content, called description, as well as title and subtitle. Check the hover!"
                        className="m-b-20"
                        style={{ maxWidth: 500 }}
                        sideProps={{ className: 'color-primary-bg' }}
                        controls={
                            <>
                                <div>Controls Content</div>
                                <div className="flex-end-center flex--wrap">
                                    <Button size="small" mean="neutral-reverse" className="m-r-5">
                                        Secondary
                                    </Button>
                                    <Button
                                        size="small"
                                        mean="positive"
                                        onClick={() => window.alert('Clicked')}
                                    >
                                        Click me
                                    </Button>
                                </div>
                            </>
                        }
                    />

                    <Card
                        shadowed={false}
                        icon={<Icon name="check" size="big" className="color-positive" />}
                        title="Success!"
                        subtitle="The operation was successfull."
                        description="Your pipeline run successfully. A message that you can later remove or keep visible. Flat without hover and shadow."
                        className="m-b-20"
                        style={{ maxWidth: 500 }}
                        sideProps={{ className: 'color-positive-bg' }}
                        controls={
                            <>
                                <span />
                                <Button size="small">Dismiss</Button>
                            </>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
