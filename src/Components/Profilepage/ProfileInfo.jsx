import TypographyHeading from '../TypographyHeading';

function ProfileInfo({ userInfo }) {
    // console.log('ollaan ProfileInfolla', userInfo);

    const address = userInfo.address_list.map((item) => item.address);

    return (
        <>
            <TypographyHeading text="Käyttäjäprofiilin tiedot" />
            <p>id: {userInfo.id}</p>
            <p>last_login: {userInfo.last_login}</p>
            <p>name: {userInfo.name}</p>
            <p>email: {userInfo.email}</p>
            <p>creation_date: {userInfo.creation_date}</p>
            <p>phone_number: {userInfo.phone_number}</p>
            <p>username: {userInfo.username}</p>
            <p>osoite: {address}</p>
        </>
    );
}

export default ProfileInfo;
