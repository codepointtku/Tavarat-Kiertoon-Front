import TypographyHeading from '../TypographyHeading';

function ProfileInfo({ data }) {
    console.log('ollaan historia tilaukset', data);
    return (
        <>
            <TypographyHeading text="Profiilin hiztorie de la öörders" />
            <p>{data.username}</p>
        </>
    );
}

export default ProfileInfo;
