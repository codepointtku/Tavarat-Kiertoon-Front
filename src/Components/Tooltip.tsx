import { Tooltip as MuiTooltip, Zoom } from '@mui/material';

interface Props {
    title: string;
    position?:
        | 'bottom-end'
        | 'bottom-start'
        | 'bottom'
        | 'left-end'
        | 'left-start'
        | 'left'
        | 'right-end'
        | 'right-start'
        | 'right'
        | 'top-end'
        | 'top-start'
        | 'top';
    children: React.ReactElement;
}

function Tooltip({ title, position, children }: Props) {
    return (
        <MuiTooltip title={title} placement={position} arrow TransitionComponent={Zoom}>
            {children}
        </MuiTooltip>
    );
}

export default Tooltip;
