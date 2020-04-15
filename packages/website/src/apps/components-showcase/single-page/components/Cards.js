import React, { Fragment } from 'react';

import { Block, Card, Button, Icon } from '@borrow-ui/ui/lib';

export function Cards() {
    return (
        <Block>
            <Card
                standingHover={true}
                icon={<Icon name="home" className="color-accent" />}
                elementsProps={{ sideProps: { className: 'color-accent-bg' }}}
                title="Card sample"
                subtitle="Example of a card"
                description="Card can have content, called description, as well as title and subtitle. Check the hover!"
                controls={
                    <Fragment>
                        <div>Tertiary action</div>
                        <div>
                            <Button size="smaller" className="m-r-5">
                                Secondary
                            </Button>
                            <Button
                                size="smaller"
                                mean="positive"
                                onClick={() => window.alert('Clicked')}
                            >
                                Click me
                            </Button>
                        </div>
                    </Fragment>
                }
            />

            <Card
                shadowed={false}
                icon={<Icon name="check" className="color-positive" />}
                elementsProps={{ sideProps: { className: 'color-positive-bg' }}}
                title="Success!"
                subtitle="The operation was successfull."
                description="Your pipeline run successfully. A message that you can later remove or keep visible. Flat without hover and shadow."
                controls={
                    <Fragment>
                        <span />
                        <Button size="smaller">Dismiss</Button>
                    </Fragment>
                }
            />
        </Block>
    );
}
