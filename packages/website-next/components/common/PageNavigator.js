import React from 'react';
import PropTypes from 'prop-types';

import { Link, Button } from '@borrow-ui/ui';

function LinkButton({ href, icon, label, mean = 'accent' }) {
    return (
        <Link href={href}>
            <a className="link__no-style">
                <Button mean={mean} size="huge" icon={icon} iconProps={{ size: 'normal' }}>
                    {label}
                </Button>
            </a>
        </Link>
    );
}

LinkButton.propTypes = {
    href: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    mean: PropTypes.string,
};

export function PageNavigator({ back = [], next = [] }) {
    return (
        <div className="common__page-navigator">
            <div className="website__text__columns">
                <div className="flex-center-center flex--wrap">
                    {back.map((backLink) => (
                        <LinkButton
                            key={backLink.href}
                            icon="arrow_back_ios"
                            mean="regular"
                            {...backLink}
                        />
                    ))}
                    {next.map((backLink) => (
                        <LinkButton key={backLink.href} icon="arrow_forward_ios" {...backLink} />
                    ))}
                </div>
            </div>
        </div>
    );
}

PageNavigator.propTypes = {
    back: PropTypes.array,
    next: PropTypes.array,
};
