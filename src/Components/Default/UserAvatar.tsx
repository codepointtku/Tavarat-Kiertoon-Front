import { useRouteLoaderData } from 'react-router-dom';
import { Avatar } from '@mui/material';

function UserAvatar() {
    const { user }: any = useRouteLoaderData('frontPage');
    const userName: string[] = user?.name?.split(' ');
    const userInitials = userName?.map(([i]) => i);
    console.log(userInitials);

    function randomBgColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        const bgColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        return bgColor;
    }

    return (
        <Avatar sx={{ bgcolor: randomBgColor() }} alt="User avatar">
            {userInitials}
        </Avatar>
    );
}

export default UserAvatar;
