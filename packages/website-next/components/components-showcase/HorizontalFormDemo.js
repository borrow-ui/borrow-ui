import React, { useState } from 'react';

import { Title, Icon, Forms, Row, Col } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

const { Checkbox, DatePicker, Dropzone, HField, Input, Textarea, Toggle, ReactSelect } = Forms;

const AGE_RANGES = [
    { value: 1, label: '1-10' },
    { value: 2, label: '11-17' },
    { value: 3, label: '18-25' },
    { value: 4, label: '26-35' },
    { value: 5, label: '36-50' },
    { value: 6, label: '50+' },
];

export function HorizontalFormDemo() {
    const [toggle, setToggle] = useState(true);
    const [checkbox, setCheckbox] = useState(true);

    const dropzoneArea = (
        <>
            <Icon name="save_alt" size="small" className="m-r-5" /> Drop files here or click to
            select
        </>
    );
    const dropzoneProps = {
        dragMessage: dropzoneArea,
        onFilesChanges: (newState) => {
            console.log('new dropzone state', newState);
        },
        initialFiles: [{ name: 'First file.pdf' }, { name: 'My profile picture.jpg' }],
    };

    return (
        <div className={styles['components-showcase__component']}>
            <a name="horizontalform" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Horizontal Layout Form
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Forms } from '@borrow-ui/ui';"
                docs="?path=/docs/forms-introduction--page"
            />
            <div style={{ fontSize: 14 }}>
                <Row>
                    <Col size={5}>
                        <HField label="Name" required={true} labelWidth={120}>
                            <Input placeholder="Input your name" />
                        </HField>
                    </Col>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <HField label="Last Name" labelWidth={120}>
                            <Input placeholder="This is disabled" disabled={true} />
                        </HField>
                    </Col>
                </Row>
                <Row>
                    <Col size={5}>
                        <HField label="Age" required={true} labelWidth={120}>
                            <Input placeholder="#" className="w-75" />
                        </HField>
                    </Col>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <HField label="Address" labelWidth={120}>
                            <Input placeholder="Invalid" invalid={true} />
                        </HField>
                    </Col>
                </Row>
                <Row>
                    <Col size={5}>
                        <HField
                            label="Self description"
                            vAlignment="top"
                            required={true}
                            labelWidth={120}
                        >
                            <Textarea placeholder="Describe yourself" />
                        </HField>
                        <HField
                            label="Upload resume"
                            vAlignment="top"
                            required={true}
                            labelWidth={120}
                        >
                            <Dropzone {...dropzoneProps} />
                        </HField>
                    </Col>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <HField label="Age range" labelWidth={120}>
                            <ReactSelect
                                options={AGE_RANGES}
                                id="horizontal-demo-select"
                                instanceId="horizontal-demo-select"
                            />
                        </HField>
                        <HField label="Accept" labelWidth={120}>
                            <Toggle checked={toggle} onClick={() => setToggle(!toggle)} />
                        </HField>
                        <HField label="Optional" labelWidth={120}>
                            <Checkbox checked={checkbox} onClick={() => setCheckbox(!checkbox)} />
                        </HField>
                        <HField label="Some Date" labelWidth={120}>
                            <DatePicker value="2020-04-25" />
                        </HField>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
