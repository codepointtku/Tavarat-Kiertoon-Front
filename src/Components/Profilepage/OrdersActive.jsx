import TypographyHeading from '../TypographyHeading';

function ProfileInfo({ data }) {
    console.log('ollaan aktiiviset tilaukset', data);
    return (
        <>
            <TypographyHeading text="Profiilin activio ordersson" />
            <p>{data.username}</p>
        </>
    );
}

export default ProfileInfo;
