import { useEffect } from 'react';
import { redirect } from 'react-router-dom';

function StorageView() {
    // replace this with authcontext later
    const auth = { admin: false, storage: false };

    useEffect(() => {
        if (!auth.storage) {
            return redirect('/tavaratkiertoon');
        }
        return null;
    }, [auth]);

    return <div>ToniPal Kahville!</div>;
}

export default StorageView;
