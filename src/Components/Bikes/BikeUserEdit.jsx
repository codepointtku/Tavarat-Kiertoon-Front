import { useLoaderData, useActionData } from 'react-router';

export default function () {
    const user = useLoaderData();
    console.log(user);
    return <h1>:)</h1>;
}
