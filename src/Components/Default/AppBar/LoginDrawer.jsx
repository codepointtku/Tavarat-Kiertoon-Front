import LoginForm from '../../LoginForm';

function LoginDrawer({ setCurrentOpenDrawer }) {
    return (
        <>
            <LoginForm
                setCurrentOpenDrawer={setCurrentOpenDrawer}
                // redirectUrl={'/'}
            />
        </>
    );
}

export default LoginDrawer;
