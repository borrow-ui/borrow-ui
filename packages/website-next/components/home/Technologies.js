import { Tile, Icon } from '@borrow-ui/ui';

import styles from './home.module.scss';

export function Technologies() {
    return (
        <div className={styles['home__technologies']}>
            <Entry
                icon="compress"
                title="Small reusable components"
                description="Short code easy to understand, or clearly divided into readable sub-components."
            />
            <Entry
                icon="format_align_left"
                title="Documented and tested"
                description="Each component is fully tested with react-testing-library and documented."
            />
            <Entry
                icon="extension"
                title="Easy to extend"
                description="Adding or removing components is simple, just follow the tutorial and you are ready to go!."
            />
            <Entry
                icon="view_in_ar"
                title="Bundled with Rollup"
                description="The main library is configured to optimize peer dependencies and be lightweight."
            />
            <Entry
                icon="grid_view"
                title="Storybook"
                description="Storybook support out of the box, directly connected to the components library."
            />
            <Entry
                icon="palette"
                title="BEM SCSS"
                description="Styles are easy to read and override in more complex scenarios."
            />
        </div>
    );
}

function Entry({ icon, title, description }) {
    return (
        <div className={styles['home__technologies__entry']}>
            <div className={styles['home__technologies__entry__title']}>
                <Icon name={icon} />
                <span>{title}</span>
            </div>
            <div className={styles['home__technologies__entry__description']}>{description}</div>
        </div>
    );
}
