import React from 'react';

import { Title, Panel, Monospace, Button, Subtitle } from '@borrow-ui/ui';

import styles from './styles-styles.module.scss';

const COLORS = [
    ['primary', 'secondary', 'accent'],
    ['positive', 'warning', 'negative'],
];

const NEUTRAL = [
    ['neutral-dark', 'neutral', 'neutral-light'],
    ['grey-light', 'neutral-white-dark', 'neutral-white'],
];

const PALETTE = ['purple', 'pink', 'red', 'yellow', 'green', 'teal', 'cyan', 'blue', 'gray'];

const PALETTE_VARIANTS = ['-d2', '-d1', '', '-l1', '-l2'];

export function ColorsDemo() {
    const colorContainerClass = styles['styles-showcase__color__container'];
    const colorUsageClass = styles['styles-showcase__color__usage'];

    const colorDescriptionClass = styles['styles-showcase__main-color__description'];
    const paletteColorVariantsContainerClass =
        styles['styles-showcase__palette-color__variants__container'];
    const variantColorClass = styles['styles-showcase__palette-color__variant'];

    return (
        <div className={styles['styles-showcase__component']}>
            <a name="colors" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Colors
                </Title>
            </a>
            <p>
                Library colors can be divided in two main categories: main colors (and neutral) and
                the generic palette.
                <br />
                Main colors also have two variants: <i>over</i> and <i>disabled</i>.
            </p>
            <p>Click on a color to see how it can be used and which are the available styles.</p>

            <CuratedColorSet title="Main" set={COLORS} />
            <CuratedColorSet title="Neutral" set={NEUTRAL} />

            <Title tag="h3" className="color-neutral">
                Palette
            </Title>
            <div className={styles['styles-showcase__palette']}>
                {PALETTE.map((color, i) => {
                    return (
                        <div key={color} className={paletteColorVariantsContainerClass}>
                            <div className={colorContainerClass}>
                                {PALETTE_VARIANTS.map((variant) => {
                                    return (
                                        <div
                                            className={`${variantColorClass} color-${color}${variant}-bg`}
                                            key={`${color}-${variant}`}
                                        >
                                            <div
                                                className={`${colorUsageClass} color-on-${color}${variant}`}
                                            >
                                                .color-{color}
                                                {variant}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className={colorDescriptionClass}>{color}</div>
                            </div>
                            <div className={colorContainerClass}>
                                {PALETTE_VARIANTS.map((variant) => {
                                    return (
                                        <div
                                            className={`${variantColorClass} color-${color}-light${variant}-bg`}
                                            key={`${color}-light-${variant}`}
                                        >
                                            <div
                                                className={`${colorUsageClass} color-on-${color}-light${variant}`}
                                            >
                                                .color-{color}-light{variant}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className={colorDescriptionClass}>{color}-light</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function CuratedColorSet({ title, set }) {
    return (
        <>
            <Title tag="h3" className="color-neutral">
                {title}
            </Title>
            <div className={styles['styles-showcase__colors']}>
                {set.map((colorsSet, i) => {
                    return (
                        <div key={i} className={styles['styles-showcase__colors-set']}>
                            {colorsSet.map((color) => {
                                return <CuratedColor color={color} key={color} />;
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

function CuratedColor({ color }) {
    return (
        <Panel
            Trigger={({ setVisible }) => <PanelTrigger setVisible={setVisible} color={color} />}
            getPanelContentProps={() => {
                return {
                    title: color,
                    content: <CuratedColorUsage color={color} />,
                };
            }}
        />
    );
}

function PanelTrigger({ setVisible, color }) {
    const colorContainerClass = styles['styles-showcase__color__container'];
    const colorUsageClass = styles['styles-showcase__color__usage'];
    const colorDescriptionClass = styles['styles-showcase__main-color__description'];
    const mainColorClass = styles['styles-showcase__main-color'];

    return (
        <div
            className={`${colorContainerClass} cursor-pointer`}
            onClick={() => setVisible((v) => !v)}
        >
            <div className={`${mainColorClass} color-${color}-bg`}>
                <div className={`${colorUsageClass} color-on-${color}`}>.color-{color}</div>
            </div>
            <div className={colorDescriptionClass}>{color}</div>
        </div>
    );
}

function CuratedColorUsage({ color }) {
    const colorExampleClass = styles['styles-showcase__color__example'];
    const hasButtons = !['grey-light', 'neutral-white-dark', 'neutral-white'].includes(color);
    return (
        <div>
            <Title tag="h2">Usage via classes</Title>
            Depending on the property, you can use a specific class.
            <ul style={{ fontSize: 12 }}>
                <li>
                    Font color: <Monospace>.color-{color}</Monospace>
                </li>
                <li>
                    Background color: <Monospace>.color-{color}-bg</Monospace>
                </li>
                <li>
                    Font color on a colored bg: <Monospace>.color-on-{color}</Monospace>
                </li>
                <li>
                    Background color on a colored font: <Monospace>.color-on-{color}-bg</Monospace>
                </li>
            </ul>
            <Title tag="h3">Examples</Title>
            <div className={`${colorExampleClass} color-${color} color-on-${color}-bg`}>
                .color-{color} .color-on-{color}-bg
            </div>
            <div className={`${colorExampleClass} color-on-${color} color-${color}-bg`}>
                .color-on-{color} .color-{color}-bg
            </div>
            <Title tag="h3" className={`color-${color}`}>
                Title with color
            </Title>
            <Subtitle>This is the default subtitle</Subtitle>
            <p>And this is the default text.</p>
            {hasButtons && (
                <div className="m-t-20">
                    <Title tag="h3">Buttons</Title>
                    <Button mean={color}>{color}</Button>
                    <Button mean={color} disabled={true}>
                        disabled
                    </Button>
                    <Button mean={`${color}-reverse`}>reverse</Button>
                    <Button mean={`${color}-reverse`} disabled={true}>
                        disabled
                    </Button>
                </div>
            )}
        </div>
    );
}
