import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListItemButton } from '@mui/material/';

function withMUILinkComponent<T extends React.ComponentType>(Component: T) {
    // type ListItemButtonLinkAND = typeof Component & typeof Link;
    // props as React.ComponentProps<ListItemButtonLinkAND>;
    type ListItemButtonLinkOR = typeof Component | typeof Link;

    return function ListItemButtonLink(props: React.ComponentProps<ListItemButtonLinkOR>) {
        return <Component {...(props as any)} component={Link} />;
    };
}

export const ListItemButtonLink = withMUILinkComponent(ListItemButton);
