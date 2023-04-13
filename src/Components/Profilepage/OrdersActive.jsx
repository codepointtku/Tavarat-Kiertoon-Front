import TypographyHeading from '../TypographyHeading';

function ProfileInfo({ userOrders }) {
    // console.log('ollaan aktiiviset tilaukset', userOrders);
    return (
        <>
            <TypographyHeading text="Aktiiviset tilaukset" />
            <p>hello tässä on aktiiviset tilaukset komponentti</p>
        </>
    );
}

export default ProfileInfo;
