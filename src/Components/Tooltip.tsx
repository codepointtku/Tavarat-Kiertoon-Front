import { Tooltip as MuiTooltip, Zoom } from '@mui/material';

interface Props {
    title: string;
    children: React.ReactElement;
}

function Tooltip({ title, children }: Props) {
    return (
        <MuiTooltip title={title} arrow TransitionComponent={Zoom}>
            {children}
        </MuiTooltip>
    );
}

export default Tooltip;
