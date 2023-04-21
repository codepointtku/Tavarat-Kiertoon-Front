import { useRouteLoaderData } from 'react-router-dom';
import { Avatar } from '@mui/material';

function UserAvatar() {
    const user: any = useRouteLoaderData('shoppingCart');
    console.log(user);
    return (
        <Avatar sx={{ bgcolor: 'primary.light' }} alt="User avatar">
            {/* {user.name} */}
        </Avatar>
    );
}

export default UserAvatar;
