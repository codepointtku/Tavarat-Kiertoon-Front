import { useRouteError } from 'react-router';

function ErrorElement() {
    const error = useRouteError();
    console.error(error);
    return (
        <div>
            <h4>Onko serveri päällä?</h4>
            <h4>Onko tonipal kahvilla??</h4>
        </div>
    );
}

export default ErrorElement;
