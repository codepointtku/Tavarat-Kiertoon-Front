import { Box, Button, Modal } from '@mui/material';
import { Form } from 'react-router-dom';

// interface for "Delete Bike" Modal
interface DeleteBikeModalInterface {
    renderModal: boolean;
    setRenderModal: React.Dispatch<React.SetStateAction<boolean>>;
    bikeId: number;
}

/**
 * Delete the selected bike from database
 *
 * @param renderModal boolean : determine if modal is on or off
 * @param setRenderModal function : setState callback to set renderModal state
 * @param bikeId number : id of the bike to be deleted
 * @returns
 */
function DeleteBikeModal({ renderModal, setRenderModal, bikeId }: DeleteBikeModalInterface) {
    return (
        <Modal open={renderModal} aria-labelledby="Delete Bike Successful">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 4,
                }}
                textAlign="center"
            >
                <h3>Oletko varma että haluat poistaa tämän pyörän?</h3>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-evenly"
                    paddingTop="2em"
                    component={Form}
                    method={'delete'}
                    action={`/pyorat/pyoravarasto/muokkaa/${bikeId}/poista/`}
                >
                    <Button onClick={() => setRenderModal(false)}>Peruuta</Button>
                    <Button color="error" type="submit">
                        Poista
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteBikeModal;
