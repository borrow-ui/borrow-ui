import React, { Fragment } from 'react';

import { Block, Card, Button, Icon } from '@borrow-ui/ui';

export function Cards() {
    return (
        <Block>
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
                    <Fragment>
                        <div>Controls Content</div>
                        <div>
                            <Button size="smaller" mean="regular-reverse" className="m-r-5">
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
                icon={<Icon name="check" size="big" className="color-positive" />}
                title="Success!"
                subtitle="The operation was successfull."
                description="Your pipeline run successfully. A message that you can later remove or keep visible. Flat without hover and shadow."
                className="m-b-20"
                style={{ maxWidth: 500 }}
                sideProps={{ className: 'color-positive-bg' }}
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
