import TypographyHeading from '../TypographyHeading';

function ProfileInfo({ data }) {
    // console.log('ollaan ProfileInfolla', data);
    return (
        <>
            <TypographyHeading text="Profiilin informacíúñes" />
            <p>{data.creation_date}</p>
            <p>{data.email}</p>
        </>
    );
}

export default ProfileInfo;
