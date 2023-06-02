import { GlobalState } from 'little-state-machine/dist/types';
import { CartFormData } from './ContactsAndDelivery';

function Update(state: GlobalState, actions: CartFormData) {
    return {
        ...state,
        ...actions,
    };
}

export default Update;
