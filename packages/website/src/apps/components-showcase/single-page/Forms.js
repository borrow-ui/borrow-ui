import React, { useState } from 'react';

import { Col, Row, Forms } from '@borrow-ui/ui/lib';

const { Checkbox, DatePicker, Field, HField, Input, Textarea, Toggle, ReactSelect } = Forms;

const AGE_RANGES = [
    { value: 1, label: '1-10' },
    { value: 2, label: '11-17' },
    { value: 3, label: '18-25' },
    { value: 4, label: '26-35' },
    { value: 5, label: '36-50' },
    { value: 6, label: '50+' },
];

export function FormsComponent() {
    const [toggle, setToggle] = useState(true);
    const [checkbox, setCheckbox] = useState(true);

    return (
        <div className="m-b-20">
            <h1>Forms</h1>
            <h3>Vertical positioning</h3>
            <div className="m-b-20">
                <Row>
                    <Col size={5}>
                        <Field label="Name" required={true} labelWidth={120}>
                            <Input placeholder="Input your name" />
                        </Field>
                    </Col>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <Field label="Last Name" labelWidth={120}>
                            <Input placeholder="This is disabled" disabled={true} />
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col size={5}>
                        <Field label="Age" required={true} labelWidth={120}>
                            <Input placeholder="#" className="w-75" />
                        </Field>
                    </Col>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <Field label="Address" labelWidth={120}>
                            <Input placeholder="Invalid" invalid={true} />
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col size={5}>
                        <Field label="Self description" labelWidth={120}>
                            <Textarea placeholder="Describe yourself" />
                        </Field>
                    </Col>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <Field label="Age range" labelWidth={120}>
                            <ReactSelect options={AGE_RANGES} />
                        </Field>
                        <Field label="Accept" labelWidth={120}>
                            <Toggle checked={toggle} onClick={() => setToggle(!toggle)} />
                        </Field>
                        <Field label="Optional" labelWidth={120}>
                            <Checkbox checked={checkbox} onClick={() => setCheckbox(!checkbox)} />
                        </Field>
                        <Field label="Some Date" labelWidth={120}>
                            <DatePicker value="2020-04-25" />
                        </Field>
                    </Col>
                </Row>
            </div>
            <h3>Horizontal positioning</h3>
            <div className="m-b-20">
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
                        <HField label="Self description" required={true} labelWidth={120}>
                            <Textarea placeholder="Describe yourself" />
                        </HField>
                    </Col>
                    <Col size={1}></Col>
                    <Col size={5}>
                        <HField label="Age range" labelWidth={120}>
                            <ReactSelect options={AGE_RANGES} />
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
            <div className="m-b-20">
                <h2>External libraries</h2>
                <ul>
                    <li>
                        <a href="https://react-select.com/home">react-select</a>
                    </li>
                    <li>
                        <a href="https://react-day-picker.js.org/">react-day-picker</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
