import * as React from 'react';

import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';

function withRouterLinkComponent<T extends React.ComponentType>(Component: T) {
    // props as React.ComponentProps<IconButtonLinkAND>;

    type IconButtonLinkAND = typeof Component & typeof Link;
    // type IconButtonLinkOR = typeof Component | typeof Link;

    return function ListItemButtonLink(props: React.ComponentProps<IconButtonLinkAND>) {
        return <Component {...(props as any)} component={Link} />;
    };
}

export const IconButtonLink = withRouterLinkComponent(IconButton);
