import type { GlobalState } from 'little-state-machine/dist/types';
import type { CartFormData } from './ContactsAndDelivery';

function Update(state: GlobalState, actions: CartFormData) {
    return {
        ...state,
        ...actions,
    };
}

export default Update;
