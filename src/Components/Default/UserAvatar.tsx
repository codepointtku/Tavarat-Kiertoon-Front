import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Avatar } from '@mui/material';

interface Loader {
    user: User;
}

interface User {
    name: string;
}

function UserAvatar() {
    const [bgColor, setBgColor] = useState('');
    const { user } = useRouteLoaderData('frontPage') as Loader;
    const userName = user?.name?.split(' ');
    const userInitials = userName?.map(([i]) => i);

    useEffect(() => {
        randomBgColor();
    }, []);

    function randomBgColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        setBgColor('rgb(' + r + ',' + g + ',' + b + ')');
    }

    return (
        <Avatar sx={{ bgcolor: bgColor }} alt="User avatar">
            {userInitials}
        </Avatar>
    );
}

export default UserAvatar;
