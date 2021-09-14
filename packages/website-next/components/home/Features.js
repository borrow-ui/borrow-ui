import { Icon } from '@borrow-ui/ui';

import styles from './home.module.scss';

export function Features() {
    return (
        <div className={styles['home__features']}>
            <Entry
                icon="settings"
                title="Configured to work out of the box"
                description="Start to code immediately your Next.js app using your components library."
            />
            <Entry
                icon="format_align_left"
                title="Ready for MDX"
                description="Pages can be written in MDX and content can be loaded form mdx files."
            />
            <Entry
                icon="palette"
                title="SCSS styles"
                description="Styles are managed with SCSS, and @borrow-ui is ready to be customized."
            />
            <Entry
                icon="extension"
                title="Create new components"
                description="Extend your UI library with custom components and use them in pages and MDX."
            />
            <Entry
                icon="auto_stories"
                title="Commented code"
                description="Project's code is easy to understand and well commented."
            />
            <Entry
                icon="account_tree"
                title="Easy to maintain"
                description="Pages and components are structured in an easy and scalable way."
            />
        </div>
    );
}

function Entry({ icon, title, description }) {
    return (
        <div className={styles['home__features__entry']}>
            <div className={styles['home__features__entry__title']}>
                <Icon name={icon} />
                <span>{title}</span>
            </div>
            <div className={styles['home__features__entry__description']}>{description}</div>
        </div>
    );
}
